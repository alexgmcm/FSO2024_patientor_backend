import { NewPatient, Gender } from "./types";

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


export const toNewPatient = (obj: unknown): NewPatient => {
    if (isObject(obj) &&  ('name' in obj && 'dateOfBirth' in obj && 'ssn' in obj && 'gender' in obj && 'occupation' in obj)){

            const newPatient: NewPatient = {
                name: parseString(obj.name),
                dateOfBirth: parseDate(obj.dateOfBirth),
                ssn: parseString(obj.ssn),
                gender: parseGender(obj.gender),
                occupation: parseString(obj.occupation),
                entries: [],
            }; 
            return newPatient;

    } else {
        throw new Error ("missing fields or data");
    }
  

};


