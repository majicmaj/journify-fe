import { SaveRounded } from "@mui/icons-material";
import { Card, IconButton, Textarea } from "@mui/joy";
import { useState } from "react";
import useDeleteJournal from "../../api/journal/useDeleteJournal";
import usePutJournal from "../../api/journal/usePutJournal";
import { IJournal } from "../../api/journals";
import Text from "../display/Text";
import JournalMenu from "./JournalMenu";

const Journal = ({ journal }: { journal: IJournal }) => {
  const { mutate: remove } = useDeleteJournal();
  const { mutate: update } = usePutJournal();

  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editedText, setEditedText] = useState(journal.text);

  const handleDelete = () => {
    setIsDeleting(!isDeleting);
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handlePut = () => {
    const newJournal = {
      text: editedText,
      timestamp: journal.timestamp,
    };
    update(newJournal);
    setIsEditing(false);
  };

  const handleRemove = () => {
    remove(journal.timestamp);
    setIsDeleting(false);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
    setIsDeleting(false);
    setIsEditing(false);
  };

  return (
    <Card>
      <div key={journal.timestamp} className="flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="flex justify-between flex-grow">
            {!isEditing && <Text>{journal.text}</Text>}
            {isEditing && (
              <Textarea
                maxRows={6}
                onChange={(e) => setEditedText(e.target.value)}
                value={editedText}
                sx={{ flexGrow: 1 }}
              />
            )}
          </div>

          <div>
            {isEditing && (
              <IconButton onClick={handlePut}>
                <SaveRounded />
              </IconButton>
            )}
            <JournalMenu
              handleEdit={handleEdit}
              handleCloseMenu={handleCloseMenu}
              handleRemove={handleRemove}
            />
          </div>
        </div>
        <Text size="sm">{journal.timestamp}</Text>
      </div>
    </Card>
  );
};

export default Journal;
