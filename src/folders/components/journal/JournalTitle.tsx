import { Input } from "@mui/joy";
import Text from "../display/Text";

interface IJournalText {
  isEditing: boolean;
  title: string;
  editedTitle: string;
  setEditedTitle: React.Dispatch<React.SetStateAction<string>>;
}

const JournalTitle = ({
  isEditing,
  title,
  editedTitle,
  setEditedTitle,
}: IJournalText) => {
  return (
    <div className="flex flex-col justify-between flex-grow">
      {isEditing ? (
        <Input
          onChange={(e) => setEditedTitle(e.target.value)}
          value={editedTitle}
          placeholder="Title"
          sx={{ flexGrow: 1 }}
        />
      ) : (
        <Text title>{title}</Text>
      )}
    </div>
  );
};

export default JournalTitle;
