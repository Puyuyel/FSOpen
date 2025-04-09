import { Container, Icon } from "@mui/material";
import { HealthCheckEntry as Entry } from "../../types";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FavoriteIcon from "@mui/icons-material/Favorite";

const HealthCheckEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <Container
      style={{ border: "1px solid", borderRadius: "5px", padding: "5px" }}
    >
      <p>
        {entry.date} <Icon component={MedicalServicesIcon} />
      </p>
      <p>
        <i>{entry.description}</i>
      </p>
      <Icon
        component={FavoriteIcon}
        color={
          entry.healthCheckRating === 0
            ? "success"
            : entry.healthCheckRating === 1
            ? "warning"
            : "error"
        }
      />
      <p>
        <strong>diagnose by {entry.specialist}</strong>
      </p>
    </Container>
  );
};

export default HealthCheckEntry;
