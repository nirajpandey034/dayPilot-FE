import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  Link,
  Typography,
  Container,
  CircularProgress,
  Paper,
} from '@mui/material';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import InputAdornment from '@mui/material/InputAdornment';
import MailIcon from '@mui/icons-material/Mail';
import PasswordIcon from '@mui/icons-material/Password';

export default function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [, setCookie] = useCookies(['FLOW', 'TOKEN']);

  const isFormValid = email.trim() !== '' && password.trim() !== '';

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BE_ENDPOINT}/user/login/`,
        { email, password }
      );

      setCookie('TOKEN', response.data.token, {
        path: '/',
        expires: new Date(Date.now() + 60 * 60 * 1000),
      });
      setCookie('FLOW', 'dashboard', { path: '/' });
      setCookie('USER_ID', response.data.id, { path: '/' });
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Login failed. Please try again.'
      );
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
              Login Here
            </Typography>
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
              error={email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
              helperText={
                email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
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
                'Login'
              )}
            </Button>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Link
              href="#"
              variant="body2"
              onClick={() => setCookie('FLOW', 'registration', { path: '/' })}
            >
              New user? Register here
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
