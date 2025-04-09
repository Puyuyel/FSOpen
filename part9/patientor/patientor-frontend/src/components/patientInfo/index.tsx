import { Button, Icon } from "@mui/material";
import { Diagnose, NewEntry, Patient } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import EntryDetails from "./EntryDetails";
import { useState } from "react";
import axios from "axios";
import patientService from "../../services/patients";
import AddEntryModal from "./AddEntryModal/AddEntryModal";

const PatientInfo: React.FC<{
  patient: Patient | null;
  diagnoses: Diagnose[] | null;
}> = ({ patient, diagnoses }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  if (patient === null) {
    return null;
  }

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const entry = await patientService.addEntry(patient.id, values);
      if (patient.entries) {
        patient.entries.push(entry);
      } else {
        patient.entries = [entry];
      }
      setError(undefined);
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <div>
      <h2>
        {patient.name}
        {patient.gender === "female" ? (
          <Icon component={FemaleIcon} />
        ) : patient.gender === "male" ? (
          <Icon component={MaleIcon} />
        ) : null}
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        error={error}
        onSubmit={submitNewEntry}
        diagnoses={diagnoses}
      />
      <h2>entries</h2>
      {patient.entries.map((entry) => {
        return <EntryDetails key={entry.id} entry={entry} />;
      })}
    </div>
  );
};

export default PatientInfo;
