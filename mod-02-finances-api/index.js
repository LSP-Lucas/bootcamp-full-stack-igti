import express from 'express';
import { promises } from 'fs';
import lancamentosRouter from './routes/lancamentos.js';

const { writeFile } = promises;

const app = express();
app.use(express.json());

app.use("/lancamentos", lancamentosRouter);

app.listen(3000, () => {
  try {
    const initialJson = {
      nextId: 1,
      lancamentos: []
    }
    writeFile("lancamentos.json", JSON.stringify(initialJson), { flag: "wx" });
    console.log("Server is running.");
  } catch (error) {
  }
});