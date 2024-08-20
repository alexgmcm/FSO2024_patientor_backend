export type Diagnosis = {
code: string;
name: string;
latin?: string;
};

export enum Gender {
    Male =  "male",
    Female = "female",
    Other = "other"
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?:  Array<Diagnosis['code']>;
};

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  };

export enum EntryType {
    HealthCheck = "HealthCheck",
    OccupationalHealthcare = "OccupationalHealthcare",
    Hospital = "Hospital",
}
  
interface HealthCheckEntry extends BaseEntry {
    type: EntryType.HealthCheck;
    healthCheckRating: HealthCheckRating;
  };

  interface SickLeave {
    startDate: string;
    endDate: string;
  }

interface OccupationalHealthcareEntry extends BaseEntry {
    type: EntryType.OccupationalHealthcare;
    employerName: string;
    sickLeave?: SickLeave;
  };

  interface HospitalDischarge {
    date: string;
    criteria: string;
  }

  interface HospitalEntry extends BaseEntry {
    type: EntryType.Hospital;
    discharge: HospitalDischarge;
  };

  export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;



export type Patient = {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation:string;
    entries: Entry[]
};

export type NewPatient = Omit<Patient, 'id'>;

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

