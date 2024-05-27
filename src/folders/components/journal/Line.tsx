import { Chip } from "@mui/joy";
import Text from "../display/Text";

const Line = ({ text }: { text: string }) => {
  const isLineEmpty = text.trim() === "";

  if (isLineEmpty) {
    return <br />;
  }

  const isLineIncludeHash = text.includes("#");

  if (!isLineIncludeHash) {
    return <Text>{text}</Text>;
  }

  const words = text.split(" ");
  const elements = words.map((word, index) => {
    if (word.startsWith("#")) {
      return (
        <Chip
          key={index}
          color="primary"
          sx={{
            mr: 1,
            mt: -0.5,
          }}
        >
          {word}
        </Chip>
      );
    }

    return <span key={index}>{word + " "}</span>;
  });

  return <Text>{elements}</Text>;
};

export default Line;
