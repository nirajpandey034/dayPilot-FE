import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Grid, Container as MuiContainer } from '@mui/material';
import InputForm from './InputForm';
import GoalListContainer from './GoalListContainer';

export default function Container() {
  const [cookies] = useCookies(['FLOW', 'TOKEN']);
  const navigate = useNavigate();
  const [refreshList, setRefreshList] = useState(false);

  useEffect(() => {
    if (!cookies.TOKEN) {
      navigate('/');
    }
  }, [cookies.TOKEN, navigate]);

  return (
    <MuiContainer maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={6}>
          <InputForm
            setRefreshList={setRefreshList}
            refreshList={refreshList}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <GoalListContainer key={refreshList} />
        </Grid>
      </Grid>
    </MuiContainer>
  );
}
