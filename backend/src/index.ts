import express from "express";
// const jwt = require('jsonwebtoken');
import jwt from "jsonwebtoken"
import cors from "cors"

const app = express();
app.use(express.json())
app.use(cors()); 

const PORT = 5000;

const USER_NAME = "uname";
const PASSWORD = "pwd";

app.post("/api/login", (req, res) => {
  const reqBody = req.body;
  
  console.log(req.body)
  if (reqBody.username === USER_NAME && reqBody.password === PASSWORD) {
    const user = {
      id: 1,
      username: USER_NAME,
    };

    const token = jwt.sign(user, "JWT_SECRET", { expiresIn: "1h" }); // Token expires in 1 hour

    res.status(200).json({ token });

  } else {
    res.status(401).send("Invalid Username and password");
  }
});

app.get("/api/message", (_req, res) => {
  res.send("Welcome to Event Desk");
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
