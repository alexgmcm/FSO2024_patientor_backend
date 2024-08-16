import patientsData from '../../data/patients';
import { Patient, nonSensitivePatient } from '../types';

export const getPatients = (): Patient[] => {
    return patientsData;
};

export const getNonSensitivePatients = (): nonSensitivePatient[] => {
    return patientsData.map(x => {
        const {ssn: _, ...newPatient} = x;
        return newPatient;
    });
};



