import { useEffect, useState } from 'react';
import axios from 'axios';
import { useStateValue, updatePatient, setDiagnoseList } from '../state';
import { Patient, Entry, Diagnose ,EntryWithoutId } from '../types';
import { apiBaseUrl } from '../constants';
import { useParams } from 'react-router-dom';
import WorkIcon from '@material-ui/icons/Work';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import HealingIcon from '@material-ui/icons/Healing';
import { assertNever } from '../utils';


const SinglePatientPage = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [statePatient, setPatient] = useState<Patient | null>(null);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
  };

  const entryBoxStyle = {
    border: 'solid black 1px',
    margin: '4px 0',
    padding: '0 4px',
    borderRadius: '3px',
  };

  const Entry = ({ entry }: { entry: Entry }) => {
    switch (entry.type) {
      case 'HealthCheck':
        return <HealthCheckEntry entry={entry} />;
      case 'Hospital':
        return <HospitalEntry entry={entry} />;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcareEntry entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  const HospitalEntry = ({ entry }: { entry: Entry }) => {
    return (
      <div style={entryBoxStyle}>
        <p>
          {entry.date} <LocalHospitalIcon />
          <br />
          <i>{entry.description}</i>
          <br />
        </p>
        {entry.diagnosisCodes && (
          <>
            <Diagnoses codes={entry.diagnosisCodes} />{' '}
          </>
        )}
        <p>diagnosed by { entry.specialist}</p>
      </div>
    );
  };

  const OccupationalHealthcareEntry = ({ entry }: { entry: Entry }) => {
    return (
      <div style={entryBoxStyle}>
        <p>
          {entry.date} <HealingIcon />
          <br />
          <i>{entry.description}</i>
        </p>
        {entry.diagnosisCodes && (
          <>
            <Diagnoses codes={entry.diagnosisCodes} />{' '}
          </>
        )}
        <p>diagnosed by { entry.specialist}</p>
      </div>
    );
  };

  const HealthCheckEntry = ({ entry }: { entry: Entry }) => {
    return (
      <div style={entryBoxStyle}>
        <p>
          {entry.date} <WorkIcon />
          <br />
          <i>{entry.description}</i>
          <br />
          {entry.healthCheckRating !=='undefined' &&
            `Health risks (0-4, 0 is lowest): ${entry.healthCheckRating}`}
        </p>
        {entry.diagnosisCodes && (
          <>
            <Diagnoses codes={entry.diagnosisCodes} />{' '}
          </>
        )}
        <p>diagnosed by { entry.specialist}</p>
      </div>
    );
  };

  const Diagnoses = ({ codes }: { codes: string[] }) => {
    return (
      <ul>
        {codes.map((code) => {
          console.log([diagnoses[code]]);
          return (
            <li key={code}>
              {code} {diagnoses[code].name}
            </li>
          );
        })}
      </ul>
    );
  };

  const Entries = ({ entries }: { entries: Entry[] }) => {
    return (
      <div>
        {entries.map((entry) => {
          return (
            <div key={entry.id}>
              <Entry entry={entry} />
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    const getDiagnoses = async () => {
      try {
        const { data: diagnoses } = await axios.get<Diagnose[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnoseList(diagnoses));
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          console.error(e?.response?.data || 'unrecognized axios error');
        } else {
          console.error('Unknown error', e);
        }
      }
    };
    void getDiagnoses();
  }, []);

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
    const patient: Patient = patients[id];
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
          <Entries entries={statePatient.entries} />
        </div>
      )}
    </div>
  );
};

export default SinglePatientPage;
