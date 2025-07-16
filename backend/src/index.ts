import express from "express";
import { BudgetItem, data } from "./budgetData.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get("/api/message", (_req, res) => {
  res.send("Welcome to Event Desk");
});

app.get("/get-data", (_, res) => {
  // api to get data from a file or db...

  // console.log("enter in server for getting data ");
  const response: BudgetItem[] = data;
  // console.log("response : ", response);

  res.status(200).json(response);
});

app.post("/add-data", (req, res) => {
  const newService: BudgetItem = req.body;
  // console.log("data : ", newService);

  // add validation if needed

  data.push(newService);
  res.status(201).json({ message: "Service added ", data: newService });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
