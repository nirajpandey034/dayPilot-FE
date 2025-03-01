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
  Paper,
  InputAdornment,
} from '@mui/material';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import MailIcon from '@mui/icons-material/Mail';
import PasswordIcon from '@mui/icons-material/Password';
import PersonIcon from '@mui/icons-material/Person';

export default function RegistrationComponent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, setCookie] = useCookies(['FLOW', 'TOKEN']);
  const [isFormValid, setIsFormValid] = useState(false);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => {
    setIsFormValid(
      name.trim() !== '' && isValidEmail(email) && password.length >= 6
    );
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
      setTimeout(() => setCookie('FLOW', 'login', { path: '/' }), 3000);
    } catch (err) {
      console.log(err);
      setErrorMessage('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: { xs: '100%', sm: '28rem' },
          borderRadius: 3,
          backdropFilter: 'blur(10px)',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" textAlign="center" fontWeight="bold">
              Register Here
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={name.trim() === ''}
              helperText={name.trim() === '' ? 'Name is required' : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon />
                  </InputAdornment>
                ),
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={email !== '' && !isValidEmail(email)}
              helperText={
                email !== '' && !isValidEmail(email)
                  ? 'Enter a valid email'
                  : ''
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PasswordIcon />
                  </InputAdornment>
                ),
              }}
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
            <Grid item xs={12}>
              <Typography color="error" textAlign="center">
                {errorMessage}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              disabled={!isFormValid || loading}
              sx={{ borderRadius: 2, py: 1 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Register'
              )}
            </Button>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Link
              href="#"
              variant="body2"
              onClick={() => setCookie('FLOW', 'login', { path: '/' })}
            >
              Already have an account? Login here
            </Link>
          </Grid>
        </Grid>
      </Paper>
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
