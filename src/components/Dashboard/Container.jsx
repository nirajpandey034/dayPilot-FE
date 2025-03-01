import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Container as MuiContainer,
  Button,
  Stack,
  Box,
  IconButton,
  Tooltip,
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';
import { Info as InfoIcon, Logout as LogoutIcon } from '@mui/icons-material';
import InputForm from './InputForm';
import GoalListContainer from './GoalListContainer';

export default function Container() {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(['FLOW', 'TOKEN']);
  const navigate = useNavigate();
  const [refreshList, setRefreshList] = useState(false);
  const [activeTab, setActiveTab] = useState('add'); // 'add' or 'view'

  useEffect(() => {
    if (!cookies.TOKEN) {
      navigate('/');
    }
  }, [cookies.TOKEN, navigate]);

  const handleLogout = () => {
    removeCookie('TOKEN', { path: '/' });
    navigate('/');
  };

  return (
    <MuiContainer
      maxWidth="md"
      sx={{ py: { xs: 2, sm: 4 }, px: { xs: 2, sm: 4 }, textAlign: 'center' }}
    >
      {/* App Bar with Logout & Info Button */}
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ mb: 3 }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5" fontWeight="bold">
            Day Pilot
          </Typography>
          <Stack direction="row" spacing={1}>
            <Tooltip
              title="With this tracker, you can track your goals and schedule them at various intervals like daily, weekly, monthly, and more."
              arrow
            >
              <IconButton color="primary">
                <InfoIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout" arrow>
              <IconButton color="error" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Toggle Buttons */}
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        sx={{ mb: { xs: 2, sm: 3 } }}
      >
        <Button
          variant={activeTab === 'add' ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => setActiveTab('add')}
          sx={{ width: { xs: '50%', sm: 'auto' }, py: 1.5 }}
        >
          Add Goal
        </Button>
        <Button
          variant={activeTab === 'view' ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => setActiveTab('view')}
          sx={{ width: { xs: '50%', sm: 'auto' }, py: 1.5 }}
        >
          View Goals
        </Button>
      </Stack>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '600px',
          margin: 'auto',
          padding: { xs: 0, sm: 3 },
        }}
      >
        {activeTab === 'add' ? (
          <InputForm
            setRefreshList={setRefreshList}
            refreshList={refreshList}
          />
        ) : (
          <GoalListContainer key={refreshList} />
        )}
      </Box>
    </MuiContainer>
  );
}
