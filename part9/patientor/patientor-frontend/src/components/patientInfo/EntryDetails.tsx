import React from "react";
import { Entry } from "../../types";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthEntry from "./OccupationalHealthEntry";
import HealthCheckEntry from "./HealthCheckEntry";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthEntry entry={entry} />;
    default:
      return null;
  }
};

export default EntryDetails;
