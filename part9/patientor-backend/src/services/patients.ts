import patients from '../../data/patients';
import { SafePatient, Patient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';
import { toNewPatient } from '../utils';

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

const newPatient = (patient: NewPatient): Patient => {
  return {
    id: uuid(),
    ...patient,
  };
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};
export default {
  getSafePatients,
  newPatient,
  addPatient,
  getPatient,
};
