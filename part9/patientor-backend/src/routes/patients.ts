/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patients';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getSafePatients());
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation, entries } = req.body;
  const newPatient = patientService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
    entries,
  });
  res.json(newPatient);
});

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  const patient = patientService.getPatient(userId);
  res.json(patient);
});

export default router;
