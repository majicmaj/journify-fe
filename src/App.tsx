import { SendRounded } from "@mui/icons-material";
import { IconButton, Textarea } from "@mui/joy";
import { useState } from "react";
import useGetJournals from "./api/journal/useGetJournals";
import usePostJournal from "./api/journal/usePostJournal";
import { IJournal } from "./api/journals";
import Text from "./components/display/Text";
import Journal from "./components/journal/Journal";

function App() {
  const [journal, setJournal] = useState<string[]>([]);

  const timestamp = new Date().toLocaleString();

  const { data: journals } = useGetJournals();
  const { mutate: post } = usePostJournal();

  const isJournals = journals?.length > 0;

  const handleSubmit = (text: string) => {
    post({ text, timestamp });
    setJournal([]);
  };

  return (
    <div className="h-screen">
      <div className="p-2">
        <Text h={1}>Journify</Text>
      </div>

      <div className="p-2 h-full">
        {isJournals && (
          <div className="h-full flex flex-col gap-2">
            {journals?.map((journal: IJournal) => (
              <Journal journal={journal} key={journal.timestamp} />
            ))}
          </div>
        )}

        {!isJournals && (
          <div className="h-full grid place-items-center">
            <Text>No journals yet</Text>
          </div>
        )}
      </div>

      <div className="sticky bg-white bottom-0 left-0 right-0 p-4 flex items-center gap-2 border-t">
        <Textarea
          placeholder="Type something..."
          maxRows={6}
          onChange={(e) => setJournal(e.target.value.split("\n"))}
          value={journal.join("\n")}
          sx={{ flexGrow: 1 }}
        />
        <IconButton size="lg" onClick={() => handleSubmit(journal.join("\n"))}>
          <SendRounded />
        </IconButton>
      </div>
    </div>
  );
}

export default App;
