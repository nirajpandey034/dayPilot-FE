import React, { useState, useEffect } from 'react';
import {
  Grid,
  TextField,
  Button,
  Link,
  Typography,
  Container,
  CircularProgress,
} from '@mui/material';
import { useCookies } from 'react-cookie';
import axios from 'axios';

export default function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [, setCookie] = useCookies(['FLOW', 'TOKEN']);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(email.trim() !== '' && password.trim() !== '');
  }, [email, password]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BE_ENDPOINT}/user/login/`,
        { email, password }
      );

      // Save token in cookies
      setCookie('TOKEN', response.data.token, {
        path: '/',
        expires: new Date(Date.now() + 60 * 60 * 1000),
      });
      setCookie('FLOW', 'dashboard', { path: '/' });
      setCookie('USER_ID', response.data.id, { path: '/' });
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error.response?.data?.message || 'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
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
            label="Email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
            helperText={
              email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                ? 'Enter a valid email'
                : ''
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
          />
        </Grid>
        {errorMessage && (
          <Grid item xs={12}>
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
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Link
            href="#"
            variant="body2"
            onClick={() => {
              setCookie('FLOW', 'registration', { path: '/' });
            }}
          >
            New user? Register here
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}
