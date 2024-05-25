import { SendRounded } from "@mui/icons-material";
import { Container, Divider, IconButton, Textarea } from "@mui/joy";
import Text from "./components/display/Text";

function App() {
  return (
    <Container>
      <div className="py-1">
        <Text h={1}>Journify</Text>
      </div>
      <Divider />
      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-2 border-t">
        <Textarea
          placeholder="Type something..."
          maxRows={6}
          sx={{ flexGrow: 1 }}
        />
        <IconButton size="lg">
          <SendRounded />
        </IconButton>
      </div>
    </Container>
  );
}

export default App;
