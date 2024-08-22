import patientsFile from '../../data/patients-full';
import { Patient, NonSensitivePatient, NewPatient, Entry} from '../types';
import { v1 as uuid } from 'uuid';
let patientsData = patientsFile;

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

export const addEntryToPatient = (id: string, entry: Entry): Patient => {
const patient = getPatientById(id);
const newEntryId = uuid();
const newEntryWithId = {...entry, id: newEntryId};
const oldEntries = patient.entries;
const newEntries = oldEntries.concat(newEntryWithId);
const otherPatients = patientsData.filter(x => x.id!=id);
patient.entries = newEntries;
patientsData = [...otherPatients, patient];
return patient;
};



