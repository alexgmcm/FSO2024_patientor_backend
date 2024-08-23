
import express from 'express';
import {getNonSensitivePatients, addPatient, getPatientById, addEntryToPatient} from '../services/patients';
import { NewPatient, Patient } from '../types';
import { toNewPatient, toEntryType } from '../utils';


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

router.post('/:id/entries', (req,res) => {
try {
   const entry = toEntryType(req.body);
   const changedPatient = addEntryToPatient(req.params.id, entry);
   res.statusCode=200;
   res.json(JSON.stringify(changedPatient));
} catch (error) {
let errorMessage = "Unknown error";
  if (error instanceof Error) {
    errorMessage = error.message;
  }
  console.log(errorMessage);
    res.statusCode = 400;
    res.send("Error: " + errorMessage);
} 

});

router.post('/', (req,res) => {
    const newPatient: NewPatient = toNewPatient(req.body);
    const addedPatient: Patient = addPatient(newPatient);
    res.json(addedPatient);

});

export default router;
