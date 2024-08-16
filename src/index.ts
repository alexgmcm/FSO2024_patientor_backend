import express from 'express';
import { Request } from "express";
import diagnosesRouter from './routes/diagnoses';
import patientRouter from './routes/patients';
import cors from 'cors';


const app = express();
app.use(cors<Request>());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses/', diagnosesRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});