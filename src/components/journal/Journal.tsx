import { SaveRounded } from "@mui/icons-material";
import { Card, Divider, IconButton, Textarea } from "@mui/joy";
import { useState } from "react";
import useDeleteJournal from "../../api/journal/useDeleteJournal";
import usePutJournal from "../../api/journal/usePutJournal";
import { IJournal } from "../../api/journals";
import Text from "../display/Text";
import JournalMenu from "./JournalMenu";

const Journal = ({ journal }: { journal: IJournal }) => {
  const { mutate: remove } = useDeleteJournal();
  const { mutate: update } = usePutJournal();

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(journal.text);

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
  };

  return (
    <Card>
      <div key={journal.timestamp} className="flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="flex flex-col justify-between flex-grow">
            {!isEditing &&
              journal.text.split("\n").map((text, index) => (
                <Text key={index} size="md" sx={{ wordBreak: "break-word" }}>
                  {text}
                </Text>
              ))}
            {isEditing && (
              <Textarea
                maxRows={6}
                onChange={(e) => setEditedText(e.target.value)}
                value={editedText}
                sx={{ flexGrow: 1 }}
              />
            )}
          </div>
        </div>
      </div>
      <Divider />
      <div className="flex justify-between items-center">
        <Text size="sm">{journal.timestamp}</Text>
        <div className="flex gap-2 items-center">
          {isEditing && (
            <IconButton onClick={handlePut}>
              <SaveRounded />
            </IconButton>
          )}
          <JournalMenu handleEdit={handleEdit} handleRemove={handleRemove} />
        </div>
      </div>
    </Card>
  );
};

export default Journal;
