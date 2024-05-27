import { BorderColorRounded } from "@mui/icons-material";
import { Button, IconButton } from "@mui/joy";
import { Link } from "react-router-dom";

interface INewEntryButton {
  fullButton?: boolean;
}

const NewEntryButton = ({ fullButton }: INewEntryButton) => {
  return (
    <Link to="/new">
      {!fullButton && (
        <Button
          startDecorator={<BorderColorRounded />}
          fullWidth
          size="lg"
          variant="soft"
        >
          New Entry
        </Button>
      )}
      {fullButton && (
        <IconButton
          size="lg"
          color="primary"
          variant="soft"
          sx={{ borderRadius: "100%" }}
        >
          <BorderColorRounded />
        </IconButton>
      )}
    </Link>
  );
};

export default NewEntryButton;
