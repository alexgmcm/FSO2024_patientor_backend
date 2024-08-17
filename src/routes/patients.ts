
import express from 'express';
import {getNonSensitivePatients, addPatient} from '../services/patients';
import { NewPatient, Patient } from '../types';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
res.send(JSON.stringify(getNonSensitivePatients()));
});

router.post('/', (req,res) => {
    const newPatient: NewPatient = toNewPatient(req.body);
    const addedPatient: Patient = addPatient(newPatient);
    res.json(addedPatient);

});

export default router;
