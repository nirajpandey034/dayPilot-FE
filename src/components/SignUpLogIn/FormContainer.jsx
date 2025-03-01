import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { Grid2 as Grid } from '@mui/material';
import LoginComponent from './LoginComponent';
import RegistrationComponent from './RegistrationComponent';

export default function FormContainer() {
  const [cookies] = useCookies(['FLOW', 'TOKEN']);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.TOKEN) {
      navigate('/dashboard');
    }
  }, [cookies.TOKEN, navigate]);

  return (
    <Grid container>
      <>
        {cookies.FLOW !== 'registration' ? (
          <LoginComponent />
        ) : (
          <RegistrationComponent />
        )}
      </>
    </Grid>
  );
}
