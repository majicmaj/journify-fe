import { Typography, TypographySystem } from "@mui/joy";

type THeading = 1 | 2 | 3 | 4 | undefined;
type TSize = "sm" | "md" | "lg";
type TLevel = keyof TypographySystem;
interface IText {
  children?: React.ReactNode;
  h?: THeading;
  size?: TSize;
  title?: boolean;
}

const getLevel = (h: THeading, size: string, title: boolean) => {
  if (h) return `h${h}`; // h1, h2, h3, h4
  return (title ? "title-" : "body-") + size; // title-sm, title-md, title-lg, body-sm, body-md, body-lg
};

const Text = ({ children, size = "md", title = false, h }: IText) => {
  const level = getLevel(h, size, title) as TLevel;

  return <Typography level={level}>{children}</Typography>;
};

export default Text;
