import {
  Grid,
  Button,
  TextField,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from "@mui/material";

import { Diagnose, NewEntry } from "../../../types";
import { useState } from "react";

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewEntry) => void;
  diagnoses: Diagnose[] | null;
}

interface TypeOption {
  value: string;
  label: string;
}

const typeOptions: TypeOption[] = [
  { value: "HealthCheck", label: "Health Check" },
  { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
  { value: "Hospital", label: "Hospital" },
];

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [type, setType] = useState<string>("");
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>("");
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    setType(event.target.value as string);
  };

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();

    let newEntry: NewEntry;

    if (type === "HealthCheck") {
      newEntry = {
        description,
        date,
        specialist,
        diagnosisCodes,
        type: "HealthCheck",
        healthCheckRating,
      };
    } else if (type === "Hospital") {
      newEntry = {
        description,
        date,
        specialist,
        diagnosisCodes,
        type: "Hospital",
        discharge: {
          date: dischargeDate,
          criteria: dischargeCriteria,
        },
      };
    } else if (type === "OccupationalHealthcare") {
      newEntry = {
        description,
        date,
        specialist,
        diagnosisCodes,
        type: "OccupationalHealthcare",
        employerName,
        sickLeave:
          sickLeaveStartDate && sickLeaveEndDate
            ? {
                startDate: sickLeaveStartDate,
                endDate: sickLeaveEndDate,
              }
            : undefined,
      };
    } else {
      throw new Error("Invalid entry type");
    }

    onSubmit(newEntry);
    setDescription("");
    setDate("");
    setSpecialist("");
    setDiagnosisCodes([]);
    setType("");
    setHealthCheckRating(0);
    setEmployerName("");
    setSickLeaveStartDate("");
    setSickLeaveEndDate("");
    setDischargeDate("");
    setDischargeCriteria("");
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          margin="dense"
        />

        <TextField
          label="Date"
          type="date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
          margin="dense"
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          margin="dense"
        />

        <FormControl fullWidth margin="dense">
          <InputLabel id="diagnosis-codes-label">Diagnosis Codes</InputLabel>
          <Select
            labelId="diagnosis-codes-label"
            label="Diagnosis Codes"
            fullWidth
            multiple
            value={diagnosisCodes}
            onChange={({ target }) => {
              typeof target.value === "string"
                ? setDiagnosisCodes(target.value.split(","))
                : setDiagnosisCodes(target.value);
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200,
                  width: 250,
                },
              },
            }}
          >
            {diagnoses?.map((diagnosis) => (
              <MenuItem key={diagnosis.code} value={diagnosis.code}>
                {diagnosis.code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel id="entry-type-label">Entry Type</InputLabel>
          <Select
            labelId="entry-type-label"
            label="Entry Type"
            fullWidth
            value={type}
            onChange={onTypeChange}
          >
            {typeOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {type === "HealthCheck" && (
          <TextField
            type="number"
            label="Health Check Rating"
            fullWidth
            value={healthCheckRating}
            onChange={({ target }) =>
              setHealthCheckRating(Number(target.value))
            }
            margin="dense"
          />
        )}

        {type === "Hospital" && (
          <div>
            <TextField
              label="Discharge Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
              margin="dense"
            />

            <TextField
              label="Discharge Criteria"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
              margin="dense"
            />
          </div>
        )}

        {type === "OccupationalHealthcare" && (
          <div>
            <TextField
              label="Employer Name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
              margin="dense"
            />

            <TextField
              label="Sick Leave Start Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
              margin="dense"
            />

            <TextField
              label="Sick Leave End Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
              margin="dense"
            />
          </div>
        )}

        <Grid
          container
          spacing={1}
          style={{ marginTop: "5px", justifyContent: "end" }}
        >
          <Grid item>
            <Button
              color="error"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
