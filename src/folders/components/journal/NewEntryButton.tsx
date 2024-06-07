import { AddRounded, BorderColorRounded } from "@mui/icons-material";
import { Button, IconButton } from "@mui/joy";
import { Link } from "react-router-dom";

interface INewEntryButton {
  fullButton?: boolean;
}

const NewEntryButton = ({ fullButton }: INewEntryButton) => {
  return (
    <Link to="/new">
      {fullButton && (
        <Button
          startDecorator={<BorderColorRounded />}
          fullWidth
          size="lg"
          variant="solid"
          sx={{
            width: "calc(50vw - 1rem)",
            margin: "0 2px",
          }}
        >
          New Entry
        </Button>
      )}
      {!fullButton && (
        <IconButton
          size="lg"
          color="primary"
          variant="solid"
          sx={{ borderRadius: "100%" }}
        >
          <AddRounded />
        </IconButton>
      )}
    </Link>
  );
};

export default NewEntryButton;
