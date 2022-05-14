import {
  NewPatient,
  Gender,
  Entry,
  Discharge,
  SickLeave,
  EntryWithoutId,
  HealthCheckRating,
} from './types';

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries: Entry[];
};

export const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries,
}: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: entries,
  };
  return newPatient;
};

export const toNewEntry = (entry: EntryWithoutId): EntryWithoutId => {
  const tempEntry = {
    description: parseDescription(entry.description),
    date: parseDate(entry.date),
    specialist: parseSpecialist(entry.specialist),
  };
  switch (entry.type) {
    case 'HealthCheck':
      const healthCheckEntry = {
        ...tempEntry,
        type: entry.type,
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
      };
      if (entry.diagnosisCodes) {
        return {
          ...healthCheckEntry,
          diagnosisCodes: parsediagCodes(entry.diagnosisCodes),
        };
      } else {
        return healthCheckEntry;
      }
    case 'Hospital':
      const hospitalEntry = {
        ...tempEntry,
        type: entry.type,
        discharge: parseDischarge(entry.discharge),
      };
      if (entry.diagnosisCodes) {
        return {
          ...hospitalEntry,
          diagnosisCodes: parsediagCodes(entry.diagnosisCodes),
        };
      } else {
        return hospitalEntry;
      }
    case 'OccupationalHealthcare':
      const occupationalHealthcareEntry = {
        ...tempEntry,
        type: entry.type,
        employerName: parseEmployer(entry.employerName),
      };
      if (entry.sickLeave && entry.diagnosisCodes) {
        return {
          ...occupationalHealthcareEntry,
          sickLeave: parseSickLeave(entry.sickLeave),
          diagnosisCodes: parsediagCodes(entry.diagnosisCodes),
        };
      }
      if (entry.diagnosisCodes) {
        return {
          ...occupationalHealthcareEntry,
          diagnosisCodes: parsediagCodes(entry.diagnosisCodes),
        };
      }
      if (entry.sickLeave) {
        return {
          ...occupationalHealthcareEntry,
          sickLeave: parseSickLeave(entry.sickLeave),
        };
      }
      return occupationalHealthcareEntry;
    default: return assertNever(entry);
  }
};

const parseEmployer = (employer: unknown): string => {
  if (!employer || !isString(employer)) {
    throw new Error('employer missing or incorrect');
  }
  return employer;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating)) {
    throw new Error('healthcheck rating missing or incorrect');
  }
  return rating;
};

const parsediagCodes = (diagcodes: unknown[]): string[] => {
  if (!isArrayOfStrings(diagcodes)) {
    throw new Error('Missing diagCodes');
  }
  return diagcodes;
};

const parseDescription = (description: unknown) => {
  if (!description || !isString(description)) {
    throw new Error('missing or incorrect description');
  }
  return description;
};

const parseSpecialist = (specialist: unknown) => {
  if (!specialist || !isString(specialist)) {
    throw new Error('missing or incorrect specialist');
  }
  return specialist;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`incorrect or missing occupation: ${occupation}`);
  }
  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('incorrect or missing SSN');
  }
  return ssn;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('incorrect or missing name');
  }
  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (
    !discharge ||
    !isObject(discharge) ||
    !isDischarge(discharge) ||
    !isString(discharge.date) ||
    !isString(discharge.criteria) ||
    !isDate(discharge.date)
  ) {
    throw new Error('discharge is not in the correct form or missing');
  }
  return discharge;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (
    !sickLeave ||
    !isObject(sickLeave) ||
    !isSickLeave(sickLeave) ||
    !isString(sickLeave.startDate) ||
    !isString(sickLeave.endDate) ||
    !isDate(sickLeave.startDate) ||
    !isDate(sickLeave.endDate)
  ) {
    throw new Error('sick leave is not in the correct form or missing');
  }
  return sickLeave;
};

const isDischarge = (object: unknown): object is Discharge => {
  return (
    Object.prototype.hasOwnProperty.call(object, 'date') &&
    Object.prototype.hasOwnProperty.call(object, 'criteria')
  );
};

const isSickLeave = (object: unknown): object is SickLeave => {
  return (
    Object.prototype.hasOwnProperty.call(object, 'startDate') &&
    Object.prototype.hasOwnProperty.call(object, 'endDate')
  );
};

const isObject = (object: unknown): object is object => {
  return typeof object === 'object';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isArrayOfStrings = (array: unknown): array is string[] => {
  if (Array.isArray(array)) {
    return array.length > 0 && array.every((value) => isString(value));
  }
  return false;
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
