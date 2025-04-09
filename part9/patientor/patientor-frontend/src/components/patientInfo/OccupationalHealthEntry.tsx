import { Container, Icon } from "@mui/material";
import { OccupationalHealthCareEntry } from "../../types";
import WorkIcon from "@mui/icons-material/Work";

const OccupationalHealthEntry: React.FC<{
  entry: OccupationalHealthCareEntry;
}> = ({ entry }) => {
  return (
    <Container
      style={{ border: "1px solid", borderRadius: "5px", padding: "5px" }}
    >
      <p>
        {entry.date} <Icon component={WorkIcon} />
        <i> {entry.employerName}</i>
      </p>
      <p>
        <i>{entry.description}</i>
      </p>
      <strong>diagnose by {entry.specialist}</strong>
    </Container>
  );
};

export default OccupationalHealthEntry;
