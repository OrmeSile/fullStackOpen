import patients from '../../data/patients';
import {
  SafePatient,
  Patient,
  NewPatient,
  EntryWithoutId,
  Entry,
} from '../types';
import { v1 as uuid } from 'uuid';
import { toNewPatient, toNewEntry } from '../utils';

const newEntry = (entry: EntryWithoutId): Entry => {
  return {
    id: uuid(),
    ...entry,
  };
};

const newPatient = (patient: NewPatient): Patient => {
  return {
    id: uuid(),
    ...patient,
  };
};

const getSafePatients = (): Array<SafePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const fullPatient = newPatient(toNewPatient(patient));
  patients.push(fullPatient);
  return fullPatient;
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addEntryToPatient = (id: string, entry: EntryWithoutId): Entry | null => {
  const patient = patients.find((patient) => patient.id === id);
  if (!patient) {
    return null;
  }
  const fullEntry = newEntry(toNewEntry(entry));
  const patientIndex = patients.findIndex((patient) => patient.id === id);
  patients[patientIndex].entries.push(fullEntry);
  return fullEntry;
};

export default {
  getSafePatients,
  newPatient,
  addPatient,
  getPatient,
  addEntryToPatient,
};
