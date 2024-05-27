import { Textarea } from "@mui/joy";
import { IJournal } from "../../api/journals";
import Line from "./Line";

interface IJournalText {
  isEditing: boolean;
  journal: IJournal;
  editedText: string;
  setEditedText: React.Dispatch<React.SetStateAction<string>>;
}

const JournalText = ({
  isEditing,
  journal,
  editedText,
  setEditedText,
}: IJournalText) => {
  return (
    <div className="flex flex-col justify-between flex-grow">
      {isEditing ? (
        <Textarea
          maxRows={6}
          onChange={(e) => setEditedText(e.target.value)}
          value={editedText}
          sx={{ flexGrow: 1 }}
        />
      ) : (
        journal.text
          .split("\n")
          .map((text, index) => <Line key={index} text={text} />)
      )}
    </div>
  );
};

export default JournalText;