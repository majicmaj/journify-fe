import { ArrowBackIosRounded, SaveAsRounded } from "@mui/icons-material";
import { IconButton, Input, Textarea } from "@mui/joy";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import usePostJournal from "../../api/journal/usePostJournal";
import Text from "../../components/display/Text";
import useKeyboardSave from "../../hooks/useKeyboardSave";

function New() {
  const [journal, setJournal] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");

  const getTimestamp = () => new Date().toLocaleString();

  const { mutate: post } = usePostJournal();
  const navigate = useNavigate();

  const handleSubmit = () => {
    const text = journal.join("\n");
    if (!text.trim()) return;

    post({ text, title, timestamp: getTimestamp() });
    navigate("/");
  };

  const lines = journal.length;
  const word = journal.join(" ").split(" ").length;

  useKeyboardSave(() => handleSubmit(), [journal, title]);

  return (
    <div className="max-h-screen h-screen bg-stone-100 justify-between flex flex-col gap-2 p-2">
      <div className="p-2 flex items-center justify-between">
        <Link to="/">
          <IconButton>
            <ArrowBackIosRounded />
          </IconButton>
        </Link>
        <Text title>
          {new Date().toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "2-digit",
          })}
        </Text>
        <IconButton size="lg" onClick={handleSubmit}>
          <SaveAsRounded />
        </IconButton>
      </div>
      {/* <div className="sticky bottom-0 left-0 right-0 p-2 flex items-center border gap-2"> */}
      <Input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        variant="outlined"
        placeholder="Title"
        size="lg"
      />
      <Textarea
        placeholder="Type something..."
        variant="outlined"
        minRows={3}
        onChange={(e) => setJournal(e.target.value.split("\n"))}
        value={journal.join("\n")}
        sx={{ flexGrow: 1 }}
        autoFocus
      />
      <div className="flex justify-end">
        <Text>
          {lines} line{lines > 1 && "s"}, {word} word{word > 1 && "s"}
        </Text>
      </div>
    </div>
  );
}

export default New;
