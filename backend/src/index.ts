import express from 'express';
import { authMiddleware, loginController } from './controllers/authController.js';

const app = express();
const PORT = 5000;
const USERNAME= "123456";

app.use(express.json())

app.get('/api/message', (_req, res) => {
  res.send('Welcome to Event Desk');
});

app.post('/api/login', loginController);


app.get('/api/protected', authMiddleware, (req, res)=>{
  const username = req.body.username;

  if(username !== USERNAME) return res.status(401).json({message: "User not authorized"});

  return res.status(200).json({message:"User is authorized and this is a protected route"})
})

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});

