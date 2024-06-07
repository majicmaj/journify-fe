import { PublishRounded, BorderColorRounded } from "@mui/icons-material";
import { IconButton, Button } from "@mui/joy";

import { useState } from "react";

interface IImportNoteButton {
  fullButton?: boolean;
  isImportOpenModal: boolean;
  setIsImportOpenModal: (value: boolean) => void;
}

const ImportNoteButton = ({
  fullButton,
  isImportOpenModal,
  setIsImportOpenModal,
}: IImportNoteButton) => {
  if (fullButton) {
    return (
      <Button
        onClick={() => setIsImportOpenModal(true)}
        startDecorator={<BorderColorRounded />}
        fullWidth
        size="lg"
        variant="solid"
        sx={{
          width: "calc(50vw - 1rem)",
        }}
      >
        Import
      </Button>
    );
  }

  return (
    <IconButton
      onClick={() => setIsImportOpenModal(true)}
      size="lg"
      color="primary"
      variant="solid"
      sx={{ borderRadius: "100%" }}
    >
      <PublishRounded />
    </IconButton>
  );
};

export default ImportNoteButton;
