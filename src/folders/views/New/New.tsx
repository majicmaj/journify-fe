import { ArrowBackIosRounded, SaveAsRounded } from "@mui/icons-material";
import { Card, IconButton } from "@mui/joy";
import { useColorScheme } from "@mui/joy/styles";
import { Link, useNavigate } from "react-router-dom";
import useGetDraft from "../../api/draft/useGetDraft";
import usePostJournal from "../../api/journal/usePostJournal";
import Text from "../../components/display/Text";
import useKeyboardSave from "../../hooks/useKeyboardSave";
import Draft from "./Draft";

const getTimestamp = () => new Date().toLocaleString();

function New() {
  const { mutate: post } = usePostJournal();
  const navigate = useNavigate();

  const { data: draft } = useGetDraft();

  const handleSubmit = () => {
    const text = draft?.text;

    if (!text) return;
    post({ text, timestamp: getTimestamp() });
    navigate("/");
  };

  useKeyboardSave(() => handleSubmit(), [draft]);

  const { mode } = useColorScheme();
  const themeClass = mode === "system" ? "light" : mode;

  const { data, isLoading } = useGetDraft();

  return (
    <div className={themeClass}>
      <div className="max-h-screen h-screen bg-stone-100 dark:bg-stone-900 justify-between flex flex-col gap-2 p-2">
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
          {!isLoading && <Draft draft={data} />}
        </Card>
      </div>
    </div>
  );
}

export default New;
