import React, { useState, useEffect } from 'react';
import {
  Grid,
  TextField,
  Button,
  Link,
  Typography,
  Container,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useCookies } from 'react-cookie';
import axios from 'axios';

export default function RegistrationComponent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, setCookie] = useCookies(['FLOW', 'TOKEN']);
  const [isFormValid, setIsFormValid] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (name.trim() !== '' && isValidEmail(email) && password.length >= 6) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [name, email, password]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_BE_ENDPOINT}/user/register/`, {
        name,
        email,
        password,
      });
      setSuccessMessage(true);
      setTimeout(() => {
        setCookie('FLOW', 'login', { path: '/' });
      }, 3000);
    } catch (error) {
      console.error(error);
      setErrorMessage('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCookie('FLOW', 'registration', { path: '/' });
  }, [setCookie]);

  return (
    <Container>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={12} sx={{ width: { xs: '100%', sm: '30rem' } }}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={name.trim() === ''}
            helperText={name.trim() === '' ? 'Name is required' : ''}
          />
        </Grid>
        <Grid item xs={12} sx={{ width: { xs: '100%', sm: '30rem' } }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={email !== '' && !isValidEmail(email)}
            helperText={
              email !== '' && !isValidEmail(email) ? 'Enter a valid email' : ''
            }
          />
        </Grid>
        <Grid item xs={12} sx={{ width: { xs: '100%', sm: '30rem' } }}>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={password !== '' && password.length < 6}
            helperText={
              password !== '' && password.length < 6
                ? 'Password must be at least 6 characters'
                : ''
            }
          />
        </Grid>
        {errorMessage && (
          <Grid item xs={12} sx={{ width: { xs: '100%', sm: '30rem' } }}>
            <Typography color="error">{errorMessage}</Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            disabled={!isFormValid || loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Register'
            )}
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ width: { xs: '100%', sm: '30rem' }, textAlign: 'center' }}
        >
          <Link
            href="#"
            variant="body2"
            onClick={() => {
              setCookie('FLOW', 'login', { path: '/' });
            }}
          >
            Already have an account? Login here
          </Link>
        </Grid>
      </Grid>
      <Snackbar
        open={successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Account creation successful! You will be redirected to the login page.
        </Alert>
      </Snackbar>
    </Container>
  );
}
