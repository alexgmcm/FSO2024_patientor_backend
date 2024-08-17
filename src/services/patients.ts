import patientsData from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

export const getPatients = (): Patient[] => {
    return patientsData;
};

export const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patientsData.map(x => {
        const {ssn: _, ...newPatient} = x;
        return newPatient;
    });
};

export const addPatient = (newPatient: NewPatient): Patient => {
    const id: string = uuid();
    const patientToAdd: Patient = {id: id, ...newPatient};
    patientsData.push(patientToAdd);

    return patientToAdd;
};



