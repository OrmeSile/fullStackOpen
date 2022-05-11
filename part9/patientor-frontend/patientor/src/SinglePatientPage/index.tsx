import { useEffect, useState } from 'react';
import axios from 'axios';
import { useStateValue, updatePatient } from '../state';
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { useParams } from 'react-router-dom';

const SinglePatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [statePatient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const getFullPatient = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `${apiBaseUrl}/patients/${id}`
        );
        if (!patient) {
          return <div>no patient found</div>;
        } else {
          setPatient(patient);
          dispatch(updatePatient(patient));
        }
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          console.error(e?.response?.data || 'unrecognized axios error');
        } else {
          console.error('Unknown error', e);
        }
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const patient: Patient | undefined = patients[id];
    if (patient && patient.ssn) {
      setPatient(patient);
    } else {
      void getFullPatient();
    }
  }, [dispatch]);

  return (
    <div>
      {statePatient && (
        <div>
          <h3>
            {statePatient.name}, {statePatient.gender}
          </h3>
          <ul>
            <li>ssn: {statePatient.ssn}</li>
            <li>occupation: {statePatient.occupation}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SinglePatientPage;
