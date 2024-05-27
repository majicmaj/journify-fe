import { Chip, Typography } from "@mui/joy";
import Text from "../display/Text";

const Hashtag = ({ word }: { word: string }) => (
  <Chip
    color="primary"
    sx={{
      mr: 0.5,
      mt: -0.5,
    }}
  >
    {word}
  </Chip>
);

const CodeBlock = ({ word }: { word: string }) => (
  <Typography variant="outlined" sx={{ display: "inline", mr: 0.5 }}>
    <code>{word.replace(/^`|`$/g, "")}</code>
  </Typography>
);

const Line = ({ text }: { text: string }) => {
  const isLineEmpty = text.trim() === "";

  if (isLineEmpty) {
    return <br />;
  }

  const words = text.split(" ");
  const elements = words.map((word, index) => {
    if (word.startsWith("#")) return <Hashtag key={index} word={word} />;
    if (word.startsWith("`")) return <CodeBlock key={index} word={word} />;

    return <>{word + " "}</>;
  });

  return <Text>{elements}</Text>;
};

export default Line;
