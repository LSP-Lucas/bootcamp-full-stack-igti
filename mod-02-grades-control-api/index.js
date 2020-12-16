import express from 'express';
import winston from 'winston';
import cors from 'cors';
import gradesRouter from './routes/grades.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use("/grade", gradesRouter);

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: "grades-control-api.log" })
  ],
  format: combine(
    label({ label: "grades-control-api" }),
    timestamp(),
    myFormat
  )
});




app.listen(3000, () => {
  console.log("API Started!");
});