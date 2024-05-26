// React MUI JOY imports
import { ClearRounded } from "@mui/icons-material";
import { Card, IconButton } from "@mui/joy";

// A delete journal hook,
import useDeleteJournal from "../../api/journal/useDeleteJournal";
import { IJournal } from "../../api/journals";

// Our standard Text component
import Text from "../display/Text";

const Journal = ({ journal }: { journal: IJournal }) => {
  const { mutate } = useDeleteJournal();

  const handleDelete = () => {
    mutate(journal.timestamp);
  };

  return (
    <Card>
      <div key={journal.timestamp} className="flex flex-col gap-2">
        <div className="flex justify-between">
          <Text>{journal.text}</Text>
          <IconButton onClick={handleDelete}>
            <ClearRounded />
          </IconButton>
        </div>
        <Text size="sm">{journal.timestamp}</Text>
      </div>
    </Card>
  );
};

export default Journal;
