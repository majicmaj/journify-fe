import { Block } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { ArrowBackIosRounded, SaveAsRounded } from "@mui/icons-material";
import { Card, IconButton } from "@mui/joy";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import usePostJournal from "../../api/journal/usePostJournal";
import Text from "../../components/display/Text";
import useKeyboardSave from "../../hooks/useKeyboardSave";

function New() {
  const [journal, setJournal] = useState<Block[]>([]);

  const getTimestamp = () => new Date().toLocaleString();

  const { mutate: post } = usePostJournal();
  const navigate = useNavigate();

  const handleSubmit = () => {
    const text = JSON.stringify(editor.document);

    if (!text.trim()) return;

    post({ text, timestamp: getTimestamp() });
    navigate("/");
  };

  useKeyboardSave(() => handleSubmit(), [journal]);

  const editor = useCreateBlockNote();

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
      <Card
        sx={{
          height: "100%",
          p: 0,
          overflow: "hidden",
          ["* > .bn-editor"]: {
            height: "100%",
            border: "red",
          },
        }}
      >
        <BlockNoteView
          editor={editor}
          theme="light"
          onChange={() => setJournal(editor.document)}
          style={{ height: "100%" }}
        />
      </Card>
    </div>
  );
}

export default New;
