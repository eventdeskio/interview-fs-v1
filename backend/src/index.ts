import express from 'express';

const app = express();
const PORT = 5000;

// Middleware to parse JSON bodies
app.use(express.json());

const rsvp = {
  yes: 0,
  no: 0,
  maybe: 0,
};

app.get('/api/message', (_req, res) => {
  res.send('Welcome to Event Desk');
});

app.post('/api/rsvp', (req, res) => {
  const response = req.body.response;

  if (response === 'yes') {
    rsvp.yes++;
  } else if (response === 'no') {
    rsvp.no++;
  } else {
    rsvp.maybe++;
  }

  res.json({ message: 'Success' });
});

app.get('/api/rsvp', (_req, res) => {
  res.json(rsvp);
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
