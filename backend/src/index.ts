import express from 'express';
import { loginController, protectedController } from './controllers/authController.js';
import { authMiddleware } from './middlewares/authMiddleware.js';

const app = express();
const PORT = 5000;
const USERNAME= "123456";

app.use(express.json())

app.get('/api/message', (_req, res) => {
  res.send('Welcome to Event Desk');
});

app.post('/api/login', loginController);

app.get('/api/protected', authMiddleware, protectedController)

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});

