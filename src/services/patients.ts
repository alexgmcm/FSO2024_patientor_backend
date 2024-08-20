import patientsData from '../../data/patients-full';
import { Patient, NonSensitivePatient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

export const getPatients = (): Patient[] => {
    return patientsData;
};

const removeSsnFromPatient = (patient:Patient): NonSensitivePatient => {
    const {ssn: _,  ...newPatient} = patient;
    return newPatient;
};

export const getPatientById = (id: string): Patient=> {
   const matchedPatients = patientsData.filter(x => x.id===id);
   if (matchedPatients.length===0){
    throw new Error("No such patient found, id:" + id);
   }
   if (matchedPatients.length>1){
    throw new Error(`Patients must have unique id, found ${matchedPatients.length} patients with id ${id}`);
   }
   return matchedPatients[0];

};

export const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patientsData.map(removeSsnFromPatient);
};

export const addPatient = (newPatient: NewPatient): Patient => {
    const id: string = uuid();
    const patientToAdd: Patient = {id: id, ...newPatient};
    patientsData.push(patientToAdd);

    return patientToAdd;
};



