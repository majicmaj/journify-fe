import { SaveRounded } from "@mui/icons-material";
import { Box, Card, Divider, IconButton } from "@mui/joy";
import { useEffect, useState } from "react";
import useDeleteJournal from "../../api/journal/useDeleteJournal";
import usePutJournal from "../../api/journal/usePutJournal";
import { IJournal } from "../../api/journals";
import Text from "../display/Text";
import JournalMenu from "./JournalMenu";
import JournalText from "./JournalText";
import JournalTitle from "./JournalTitle";

const Journal = ({ journal }: { journal: IJournal }) => {
  const { mutate: remove } = useDeleteJournal();
  const { mutate: update } = usePutJournal();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(journal.title);
  const [editedText, setEditedText] = useState(journal.text);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handlePut = () => {
    const newJournal = {
      ...journal,
      text: editedText,
    };

    update(newJournal);
    setIsEditing(false);
  };

  const handleRemove = () => {
    remove(journal.timestamp);
  };

  // Saves the journal with ctrl/cmd + s
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handlePut();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editedText]);

  return (
    <Card>
      <div key={journal.timestamp} className="flex flex-col gap-2">
        <JournalTitle
          isEditing={isEditing}
          title={journal.title}
          editedTitle={editedTitle}
          setEditedTitle={setEditedTitle}
        />
        <div className="flex justify-between">
          <JournalText
            isEditing={isEditing}
            journal={journal}
            editedText={editedText}
            setEditedText={setEditedText}
          />
        </div>
      </div>
      <Divider />
      <Box
        className="flex gap-2 justify-between items-center"
        sx={{ m: -1, my: -1.5 }}
      >
        <Text size="sm">{journal.timestamp}</Text>
        <Box className="flex gap-2 items-center">
          {isEditing && (
            <IconButton onClick={handlePut}>
              <SaveRounded />
            </IconButton>
          )}
          <JournalMenu handleEdit={handleEdit} handleRemove={handleRemove} />
        </Box>
      </Box>
    </Card>
  );
};

export default Journal;
