import patients from '../../data/patients.json';
import { safePatient } from '../types';

const getSafePatients = (): Array<safePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getSafePatients,
};
