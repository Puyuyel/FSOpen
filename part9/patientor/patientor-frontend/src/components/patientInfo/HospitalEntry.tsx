import { Container, Icon } from "@mui/material";
import { HospitalEntry as Entry } from "../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <Container
      style={{ border: "1px solid", borderRadius: "5px", padding: "5px" }}
    >
      <p>
        {entry.date} <Icon component={LocalHospitalIcon} />
      </p>
      <p>
        <i>{entry.description}</i>
      </p>
      <p>
        <strong>Discharge: </strong>
        {entry.discharge.date} : {entry.discharge.criteria}
      </p>
      <strong>diagnose by {entry.specialist}</strong>
    </Container>
  );
};

export default HospitalEntry;
