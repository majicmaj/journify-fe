import { Typography, TypographySystem } from "@mui/joy";

type THeading = 1 | 2 | 3 | 4 | undefined;
type TSize = "sm" | "md" | "lg";
type TLevel = keyof TypographySystem;
interface IText {
	children?: React.ReactNode;
	h?: THeading;
	size?: TSize;
	title?: boolean;
	sx?: React.CSSProperties;
	className?: string;
}

const getLevel = (h: THeading, size: string, title: boolean) => {
	if (h) return `h${h}`; // h1, h2, h3, h4
	return (title ? "title-" : "body-") + size; // title-sm, title-md, title-lg, body-sm, body-md, body-lg
};

const Text = ({
	children,
	size = "md",
	title = false,
	h,
	sx,
	className,
}: IText) => {
	const level = getLevel(h, size, title) as TLevel;

	return (
		<Typography level={level} sx={sx} className={className}>
			{children}
		</Typography>
	);
};

export default Text;
