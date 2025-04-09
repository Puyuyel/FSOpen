import { Diagnose, Gender, NewEntry, NewPatient } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(gender);
};

const parseName = (name: unknown): string => {
  if (!isString(name) || !name) {
    throw new Error("Incorrect or missing name: " + name);
  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !dateOfBirth || !isDate(dateOfBirth)) {
    throw new Error("Incorrect or missing date of birth: " + dateOfBirth);
  }
  return dateOfBirth;
};

const parseSSN = (ssn: unknown): string => {
  if (!isString(ssn) || !ssn) {
    throw new Error("Incorrect or missing ssn: " + ssn);
  }
  return ssn;
};

const parseGender = (gender: unknown): string => {
  if (!isString(gender) || !gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender ' + gender");
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation) || !occupation) {
    throw new Error("Incorrect or missing occupation: " + occupation);
  }
  return occupation;
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing daata");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };
    return newPatient;
  }

  throw new Error("Incorrect data: field(s) missing");
};

const parseDescription = (description: unknown): string => {
  if (!isString(description) || !description) {
    throw new Error("Incorrect or missing description: " + description);
  }
  return description;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !date || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist) || !specialist) {
    throw new Error("Incorrect or missing specialist: " + specialist);
  }
  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnose["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return [] as Array<Diagnose["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnose["code"]>;
};

const parseHealthRating = (healthCheckRating: unknown): number => {
  if (
    healthCheckRating === undefined ||
    healthCheckRating === null ||
    typeof healthCheckRating !== "number"
  ) {
    throw new Error(
      "Incorrect or missing healthCheckRating: " + healthCheckRating
    );
  }
  if (healthCheckRating < 0 || healthCheckRating > 3) {
    throw new Error("Incorrect healthCheckRating: " + healthCheckRating);
  }
  return healthCheckRating;
};

const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "type" in object
  ) {
    const baseEntry = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object),
    };

    switch (object.type) {
      case "HealthCheck":
        if (!("healthCheckRating" in object)) {
          throw new Error("Missing or incorrect data for HealthCheck entry");
        }
        return {
          ...baseEntry,
          type: "HealthCheck",
          healthCheckRating: parseHealthRating(object.healthCheckRating),
        };

      case "Hospital":
        if (
          !(
            "discharge" in object &&
            typeof object.discharge === "object" &&
            object.discharge !== null &&
            "date" in object.discharge &&
            "criteria" in object.discharge
          )
        ) {
          throw new Error("Missing or incorrect data for Hospital entry");
        }
        return {
          ...baseEntry,
          type: "Hospital",
          discharge: {
            date: parseDate(object.discharge.date),
            criteria: parseDescription(object.discharge.criteria),
          },
        };

      case "OccupationalHealthcare":
        if (
          !(
            "employerName" in object &&
            typeof object.employerName === "string" &&
            "sickLeave" in object &&
            object.sickLeave !== null &&
            typeof object.sickLeave === "object" &&
            "startDate" in object.sickLeave &&
            "endDate" in object.sickLeave
          )
        ) {
          throw new Error(
            "Missing or incorrect data for OccupationalHealthcare entry"
          );
        }
        return {
          ...baseEntry,
          type: "OccupationalHealthcare",
          employerName: parseDescription(object.employerName),
          sickLeave: {
            startDate: parseDate(object.sickLeave.startDate),
            endDate: parseDate(object.sickLeave.endDate),
          },
        };

      default:
        throw new Error(`Unhandled or missing entry type: ${object.type}`);
    }
  }
  throw new Error("Incorrect data: field(s) missing");
};

export { toNewPatient, toNewEntry };
