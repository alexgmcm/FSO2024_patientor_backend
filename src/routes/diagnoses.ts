
import express from 'express';
import {getDiagnoses} from '../services/diagnoses';

const router = express.Router();

router.get('/', (_req, res) => {
res.send(JSON.stringify(getDiagnoses()));
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;
