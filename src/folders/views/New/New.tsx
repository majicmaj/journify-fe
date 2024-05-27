import { ArrowBackIosRounded, SaveAsRounded } from "@mui/icons-material";
import { IconButton, Input, Textarea } from "@mui/joy";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import usePostJournal from "../../api/journal/usePostJournal";
import Text from "../../components/display/Text";

function New() {
  const [journal, setJournal] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");

  const getTimestamp = () => new Date().toLocaleString();

  const { mutate: post } = usePostJournal();
  const navigate = useNavigate();

  const handleSubmit = (text: string) => {
    if (!text.trim()) return;

    post({ text, title, timestamp: getTimestamp() });
    navigate("/");
  };

  const lines = journal.length;
  const word = journal.join(" ").split(" ").length;

  // Saves the journal with ctrl/cmd + s
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSubmit(journal.join("\n"));
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [journal]);

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
        <IconButton size="lg" onClick={() => handleSubmit(journal.join("\n"))}>
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
