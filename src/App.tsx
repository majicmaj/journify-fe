import { SendRounded } from "@mui/icons-material";
import { Container, Divider, IconButton, Textarea } from "@mui/joy";
import { useState } from "react";
import usePost from "./api/usePost";
import Text from "./components/display/Text";

function App() {
  const [journal, setJournal] = useState<string[]>([]);

  const timestamp = new Date().toISOString();
  const { post } = usePost(`/api/journal`);

  const handleSubmit = (text: string) => {
    post({ text, timestamp });
    window.location.reload();
  };

  const item = localStorage.getItem("/api/journal");
  return (
    <Container>
      <div className="py-1">
        <Text h={1}>Journify</Text>
      </div>

      <div>{item ? item : <Text>No entries yet.</Text>}</div>
      <Divider />
      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-2 border-t">
        <Textarea
          placeholder="Type something..."
          maxRows={6}
          onChange={(e) => setJournal(e.target.value.split("\n"))}
          onKeyPress={(e) =>
            e.key === "Enter" && handleSubmit(e.currentTarget.value)
          }
          value={journal.join("\n")}
          sx={{ flexGrow: 1 }}
        />
        <IconButton size="lg" onClick={() => handleSubmit(journal.join("\n"))}>
          <SendRounded />
        </IconButton>
      </div>
    </Container>
  );
}

export default App;
