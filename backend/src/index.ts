import express from 'express';
import JWT from 'jsonwebtoken';

const app = express();
const PORT = 5001;

app.use(express.json());

app.get('/api/message', (_req, res) => {
  res.send('Welcome to Event Desk');
});

app.get('/api/protected', (req, res) => {
  try {
    const token = req.headers['authorization'];
    if (token) {
      const decoded = JWT.verify(token, 'eventDesk');

      return res.json({
        message: 'token verified',
        decoded,
      });
    } else {
      return res.status(400).json({
        message: 'Bad request',
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: 'server error',
    });
  }
});

app.post('/api/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === 'admin@gmail.com' && password === 'admin') {
      const token = JWT.sign({ email }, 'eventDesk', { expiresIn: '1h' });
      res.status(200).json({ message: 'Login Success', token });
    } else {
      res.status(401).json({ message: 'Login Failed' });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
