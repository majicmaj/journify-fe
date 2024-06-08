import Text from "./Text";

const DateText = ({ date }: { date?: string }) => {
	const d = date ? new Date(date) : new Date();
	return (
		<Text title>
			{d.toLocaleDateString("en-US", {
				weekday: "short",
				month: "short",
				day: "2-digit",
			})}
		</Text>
	);
};

export default DateText;
