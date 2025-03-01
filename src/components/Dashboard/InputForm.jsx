import React, { useState } from 'react';
import {
  TextField,
  MenuItem,
  Button,
  Container,
  Grid,
  Box,
  Typography,
} from '@mui/material';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import formatDate from '../../utils/DateFormat';

export default function InputForm({ setRefreshList, refreshList }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie] = useCookies(['FLOW', 'TOKEN', 'USER_ID']);
  const navigate = useNavigate();

  const frequencies = [
    'DAILY',
    'WEEKLY',
    'MONTHLY',
    'QUARTERLY',
    'HALF-YEARLY',
    'ANNUALLY',
  ];

  const validate = () => {
    const newErrors = {};
    if (title.trim().length < 3)
      newErrors.title = 'Title must be at least 3 characters long';
    if (!frequency) newErrors.frequency = 'Please select a frequency';
    if (!targetDate) {
      newErrors.targetDate = 'Target date is required';
    } else if (new Date(targetDate) < new Date().setHours(0, 0, 0, 0)) {
      newErrors.targetDate = 'Target date cannot be in the past';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitGoal = async (goalData) => {
    try {
      setLoading(true);
      const token = cookies.TOKEN;
      if (!token) throw new Error('No authentication token found');

      const response = await fetch(
        `${import.meta.env.VITE_BE_ENDPOINT}/goal/create/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...goalData,
            startDate: formatDate(new Date()),
            completionStatus: false,
            ownerId: cookies.USER_ID,
          }),
        }
      );

      if (!response.ok) throw new Error('Failed to submit goal');
      if (response.status === 401) {
        setCookie('TOKEN', '', { path: '/', expires: new Date(0) });
        navigate('/');
      }

      setRefreshList(!refreshList);
      alert('Goal submitted successfully!');
      setTitle('');
      setDescription('');
      setFrequency('');
      setTargetDate('');
      setErrors({});
    } catch (error) {
      console.error('Error submitting goal:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (validate()) {
      const goalData = {
        title,
        description: description.trim() ? description : '',
        frequency,
        targetDate,
      };
      submitGoal(goalData);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: { xs: 2, sm: 4 },
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '500px',
          p: { xs: 3, sm: 4 },
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: 'white',
          mx: 'auto', // ✅ Ensures equal margin on left & right
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" fontWeight="bold" textAlign="center">
              Create Goal
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={!!errors.title}
              helperText={errors.title}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description (Optional)"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              select
              label="Frequency"
              variant="outlined"
              fullWidth
              required
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              error={!!errors.frequency}
              helperText={errors.frequency}
            >
              {frequencies.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Target Date"
              type="date"
              variant="outlined"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              value={targetDate}
              onChange={(e) => setTargetDate(formatDate(e.target.value))}
              error={!!errors.targetDate}
              helperText={errors.targetDate}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              disabled={
                !title ||
                !frequency ||
                !targetDate ||
                Object.keys(errors).length > 0 ||
                loading
              }
            >
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
