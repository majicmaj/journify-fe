import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { EditRounded, SaveRounded } from "@mui/icons-material";
import { Box, Card, Divider, IconButton } from "@mui/joy";
import { useColorScheme } from "@mui/joy/styles";
import { useState } from "react";
import { IJournal } from "../../api/journal/journals";
import useDeleteJournal from "../../api/journal/useDeleteJournal";
import usePutJournal from "../../api/journal/usePutJournal";
import useKeyboardSave from "../../hooks/useKeyboardSave";
import Text from "../display/Text";
import JournalMenu from "./JournalMenu";

const Journal = ({ journal }: { journal: IJournal }) => {
  const { mutate: remove } = useDeleteJournal();
  const { mutate: update } = usePutJournal();

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(JSON.parse(journal.text));

  const { mode } = useColorScheme();

  const themeClass = mode === "system" ? "light" : mode;

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handlePut = () => {
    const newJournal = {
      ...journal,
      text: JSON.stringify(editedText),
    };

    update(newJournal);
    setIsEditing(false);
  };

  const handleRemove = () => {
    remove(journal.timestamp);
  };

  useKeyboardSave(handlePut, [editedText]);

  const editor = useCreateBlockNote({
    initialContent: JSON.parse(journal.text),
  });

  return (
    <Card sx={{ p: 1 }} color={isEditing ? "primary" : "neutral"}>
      <div
        key={journal.timestamp}
        className="flex flex-col gap-2 overflow-hidden rounded-xl"
      >
        <Box
          className="transition-all duration-300"
          sx={{
            ml: isEditing ? 0 : -5,
          }}
        >
          <BlockNoteView
            editor={editor}
            onChange={() => {
              setEditedText(editor.document);
            }}
            editable={isEditing}
            sideMenu={isEditing}
            theme={themeClass}
          />
        </Box>
      </div>
      <Divider />
      <Box
        className="flex gap-2 justify-between items-center"
        sx={{ my: -0.5 }}
      >
        <Text size="sm">{journal.timestamp}</Text>
        <Box className="flex gap-2 items-center">
          {isEditing && (
            <IconButton onClick={handlePut}>
              <SaveRounded />
            </IconButton>
          )}
          {!isEditing && (
            <IconButton onClick={handleEdit}>
              <EditRounded />
            </IconButton>
          )}
          <JournalMenu handleRemove={handleRemove} />
        </Box>
      </Box>
    </Card>
  );
};

export default Journal;
