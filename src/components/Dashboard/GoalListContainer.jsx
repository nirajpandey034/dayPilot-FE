import React, { useEffect, useState } from 'react';
import {
  Container,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
  IconButton,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GoalTile from './GoalTile';

const ITEMS_PER_PAGE = 3; // Number of goals per page

export default function GoalListContainer() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [cookies, setCookie] = useCookies(['FLOW', 'TOKEN', 'USER_ID']);
  const navigate = useNavigate();

  const fetchGoals = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BE_ENDPOINT}/goal/goals/${cookies.USER_ID}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.TOKEN}`, // Passing JWT Token as Bearer
          },
        }
      );
      if (response.status === 401) {
        setCookie('TOKEN', '', { path: '/', expires: new Date(0) });
        navigate('/');
      }
      setGoals(response.data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cookies.USER_ID && cookies.TOKEN) fetchGoals();
  }, [cookies]);

  // Pagination logic (slice array to show only the current page items)
  const totalPages = Math.ceil(goals.length / ITEMS_PER_PAGE);
  const displayedGoals = goals.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Header with Refresh Button */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        mb={2}
      >
        <Typography variant="h5" fontWeight="bold">
          Your Goals for today
        </Typography>

        {/* Refresh Icon Button */}
        <IconButton onClick={fetchGoals} color="primary">
          <RefreshIcon />
        </IconButton>
      </Stack>

      {loading ? (
        <Stack justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Stack>
      ) : displayedGoals.length > 0 ? (
        <Stack spacing={2} width="auto">
          {displayedGoals.map((goal) => (
            <GoalTile
              key={goal.id}
              title={goal.title}
              description={goal.description}
              onAchieved={() => console.log(`Achieved: ${goal.id}`)}
              onDelete={() => console.log(`Delete: ${goal.id}`)}
              onFinalAchieved={() => console.log(`Final Achieved: ${goal.id}`)}
            />
          ))}
        </Stack>
      ) : (
        <Typography textAlign="center" mt={5}>
          No goals found.
        </Typography>
      )}

      {/* Pagination (only show if there are multiple pages) */}
      {totalPages > 1 && (
        <Stack direction="row" justifyContent="center" mt={3}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </Stack>
      )}
    </Container>
  );
}
