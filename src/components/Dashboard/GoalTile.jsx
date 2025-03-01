import React from 'react';
import { Card, CardContent, Typography, Button, Stack } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';

export default function GoalTile({
  title,
  description,
  onAchieved,
  onDelete,
  onFinalAchieved,
}) {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 2,
        m: 2,
        boxShadow: 3,
        width: '100%',
        maxWidth: '500px',
      }}
    >
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>

      {/* Action Buttons */}
      <Stack
        direction="row"
        spacing={2}
        sx={{
          width: '100%',
          justifyContent: { xs: 'center', md: 'space-around' }, // Adjusts based on screen size
          flexWrap: { xs: 'wrap', md: 'nowrap' }, // Wraps on small screens
          alignItems: 'center',
          mt: 1,
        }}
      >
        {/* Left-aligned buttons */}
        <Stack
          direction="column"
          spacing={2}
          sx={{ flexWrap: 'wrap' }}
          alignItems="center"
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={onAchieved}
            startIcon={<CheckCircleOutlineIcon />}
            sx={{ width: { xs: '100%', sm: 'auto' } }} // Full width on small screens
          >
            Achieved Today
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={onDelete}
            startIcon={<DeleteOutlineIcon />}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            Delete Goal
          </Button>
        </Stack>

        {/* Right-aligned button */}
        <Button
          variant="outlined"
          color="success"
          onClick={onFinalAchieved}
          startIcon={<EmojiEventsOutlinedIcon />}
          sx={{
            width: { xs: '100%', sm: 'auto' },
            mt: { xs: '1rem !important', md: '0rem !important' },
          }}
        >
          Finally, It's Achieved
        </Button>
      </Stack>
    </Card>
  );
}
