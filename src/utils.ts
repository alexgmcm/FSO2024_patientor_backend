import  { NewPatient, Gender, Entry, EntryType, HealthCheckEntry,
     HospitalEntry, OccupationalHealthcareEntry, HealthCheckRating ,
    HospitalDischarge} from "./types";

const isObject = (obj:unknown): obj is object => {
    if (!obj || typeof obj !== 'object'){
        throw new Error('Incorrect or missing data!');
    }
     else {
        return true;
    }
};

const isString = (obj: unknown): obj is string => {
    // Type narrows obj to string via type predicate
    return typeof obj === 'string' || obj instanceof String;
};

const isDate = (text: string): boolean => {
    return Boolean(Date.parse(text));
};

const isGender = (field: string): field is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(field);
};

const parseDate = (obj: unknown): string => {
    if (!isString(obj) || !isDate(obj)){
        throw new Error("Date was not date!: " + obj);
    } else {
        return obj;
    }
};


const parseString = (obj: unknown): string => {
    if (isString(obj)){
        return obj;
    } else {
        throw new Error("string was not string!:" + obj);
    }
};

const parseGender = (obj: unknown): Gender => {
    if (!isString(obj) || !isGender(obj)){
        throw new Error("Invalid gender: " + obj);
    } else {
        return obj;
    }
};

const isEntry = (obj:unknown): obj is Entry => {
    if (isObject(obj) && ('type' in obj) && isString(obj.type) && Object.values(EntryType).map(v => v.toString()).includes(obj.type) ){
        return true;
    } else {
        return false;
    }
};

const isHealthCheckEntry = (entry: Entry): entry is HealthCheckEntry => {
if (entry.type===EntryType.HealthCheck  && 'healthCheckRating' in entry
     && Object.values(HealthCheckRating).map(v => v.toString()).includes(String(entry.healthCheckRating))){
        return true;
     } 
     throw new Error ("Missing or wrong type of fields for Health Check Entry: " + JSON.stringify(entry));
     

};

const isHospitalDischarge = (obj: unknown): obj is HospitalDischarge => {
    if (isObject(obj) 
        && "date" in obj && isString(obj.date) && isDate(obj.date)
        && "criteria" in obj && isString(obj.criteria) ){
            return true;
        }
        return false;

};

const isHospitalEntry = (entry: Entry): entry is HospitalEntry => {
    if (entry.type===EntryType.Hospital  && 'discharge' in entry && isHospitalDischarge(entry.discharge)
        ){
           return true;
        } else {
            throw new Error ("Missing or wrong type of fields for Hospital Entry: " + JSON.stringify(entry));
        }

};

const isOccupationalHealthcareEntry = (entry:Entry) : entry is OccupationalHealthcareEntry => {
    if (entry.type===EntryType.OccupationalHealthcare  
        && 'employerName' in entry && isString(entry.employerName)
    ){
       return true;
    } else {
       throw new Error ("Missing or wrong type of fields for OccupationalHealthCare Entry: " + JSON.stringify(entry));
    }

};



export const toEntryType = (entry: unknown): HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry => {
if (!isObject(entry) || !isEntry(entry)){
    throw new Error("Entry was not valid! - " + JSON.stringify(entry));
}

if (entry.type===EntryType.HealthCheck && isHealthCheckEntry(entry)){
    return entry;
}
if (entry.type===EntryType.Hospital && isHospitalEntry(entry)){
    return entry;
}
if (entry.type === EntryType.OccupationalHealthcare && isOccupationalHealthcareEntry(entry)){
    return entry;
}

throw new Error("Could not match entry to entryType! - " + JSON.stringify(entry));

};

const parseEntries = (obj:unknown): Entry[] => {
    if (!Array.isArray(obj)){
        throw new Error("Entries array was not array!" + obj);
    } 
    if (obj.length===0){
        return [];
    }
    if (obj.every(isEntry)){
        return obj;
    }
    throw new Error("Could not parse entries" + obj); 

};


export const toNewPatient = (obj: unknown): NewPatient => {
    if (isObject(obj) &&  ('name' in obj && 'dateOfBirth' in obj && 'ssn' in obj && 'gender' in obj && 'occupation' in obj && 'entries' in obj)){

            const newPatient: NewPatient = {
                name: parseString(obj.name),
                dateOfBirth: parseDate(obj.dateOfBirth),
                ssn: parseString(obj.ssn),
                gender: parseGender(obj.gender),
                occupation: parseString(obj.occupation),
                entries: parseEntries(obj.entries),
            }; 
            return newPatient;

    } else {
        throw new Error ("missing fields or data");
    }
  

};


