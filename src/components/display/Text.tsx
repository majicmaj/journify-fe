import { Typography, TypographySystem } from "@mui/joy";

interface IText {
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  title?: boolean;
  h?: 1 | 2 | 3 | 4 | undefined;
}

const getLevel = (h: number | undefined, size: string, title: boolean) => {
  if (h) {
    return `h${h}`;
  }
  let level = "";

  if (title) {
    level = "title-";
  } else {
    level = "body-";
  }

  level += size;

  return level;
};

const Text = ({ children, size = "md", title = false, h }: IText) => {
  const level = getLevel(h, size, title) as keyof TypographySystem;

  return <Typography level={level}>{children}</Typography>;
};

export default Text;
