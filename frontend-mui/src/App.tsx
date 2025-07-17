import { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';

function App() {
  const [message, setMessage] = useState('');

  const fetchMessage = async () => {
    const res = await fetch('/api/message');
    const text = await res.text();
    setMessage(text);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 2,
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={fetchMessage}
        size="large"
      >
        Get Welcome Message
      </Button>
      {message && (
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: 'bold', textAlign: 'center' }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
}

export default App;
