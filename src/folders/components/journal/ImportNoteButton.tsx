import { BorderColorRounded, PublishRounded } from "@mui/icons-material";
import { Button, IconButton } from "@mui/joy";

interface IImportNoteButton {
	fullButton?: boolean;
	setIsImportOpenModal: (value: boolean) => void;
}

const ImportNoteButton = ({
	fullButton,
	setIsImportOpenModal,
}: IImportNoteButton) => {
	if (fullButton) {
		return (
			<Button
				onClick={() => setIsImportOpenModal(true)}
				startDecorator={<BorderColorRounded />}
				fullWidth
				size="lg"
				variant="solid"
				sx={{
					width: "calc(50vw - 1rem)",
					margin: "0 2px",
				}}
			>
				Import
			</Button>
		);
	}

	return (
		<IconButton
			onClick={() => setIsImportOpenModal(true)}
			size="lg"
			color="primary"
			variant="solid"
			sx={{ borderRadius: "100%" }}
		>
			<PublishRounded />
		</IconButton>
	);
};

export default ImportNoteButton;
