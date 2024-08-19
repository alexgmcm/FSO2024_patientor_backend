
import express from 'express';
import {getNonSensitivePatients, addPatient, getPatientById} from '../services/patients';
import { NewPatient, Patient } from '../types';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
res.send(JSON.stringify(getNonSensitivePatients()));
});

router.get('/:id', (req, res) => {
    try{
        const patient = getPatientById(req.params.id);
        res.send(JSON.stringify(patient));
    } catch {
        res.statusCode=404;
        res.send(`Patient not found with id ${req.params.id}`);
    }



});

router.post('/', (req,res) => {
    const newPatient: NewPatient = toNewPatient(req.body);
    const addedPatient: Patient = addPatient(newPatient);
    res.json(addedPatient);

});

export default router;
