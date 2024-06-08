import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import {
	EditRounded,
	SaveRounded,
	ShareRounded,
	ContentCopyRounded,
} from "@mui/icons-material";
import {
	Box,
	Card,
	CardContent,
	Divider,
	IconButton,
	Modal,
	ModalClose,
	ModalDialog,
	DialogTitle,
	Stack,
} from "@mui/joy";
import { useColorScheme } from "@mui/joy/styles";
import { useState } from "react";
import { IJournal } from "../../api/journal/journals";
import useDeleteJournal from "../../api/journal/useDeleteJournal";
import usePutJournal from "../../api/journal/usePutJournal";
import useKeyboardSave from "../../hooks/useKeyboardSave";
import Text from "../display/Text";
import JournalMenu from "./JournalMenu";

const Journal = ({ journal }: { journal: IJournal }) => {
	const { mutate: remove } = useDeleteJournal();
	const { mutate: update } = usePutJournal();

	const [isSharing, setIsSharing] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [editedText, setEditedText] = useState(JSON.parse(journal.text));

	const { mode } = useColorScheme();

	const themeClass = mode === "system" ? "light" : mode;

	const handleEdit = () => {
		setIsEditing(!isEditing);
	};

	const handlePut = () => {
		const newJournal = {
			...journal,
			text: JSON.stringify(editedText),
		};

		update(newJournal);
		setIsEditing(false);
	};

	const handleRemove = () => {
		remove(journal.timestamp);
	};

	const copyClipboard = () => {
		if ("clipboard" in navigator) {
			return navigator.clipboard.writeText(JSON.stringify(journal));
		} else {
			return document.execCommand("copy", true, JSON.stringify(journal));
		}
	};

	useKeyboardSave(handlePut, [editedText]);

	const editor = useCreateBlockNote({
		initialContent: JSON.parse(journal.text),
	});

	return (
		<Card sx={{ p: 1 }} color={isEditing ? "primary" : "neutral"}>
			<div
				key={journal.timestamp}
				className="flex flex-col gap-2 overflow-hidden rounded-xl"
			>
				<Box
					className="transition-all duration-300"
					sx={{
						ml: isEditing ? 0 : -5,
					}}
				>
					<BlockNoteView
						editor={editor}
						onChange={() => {
							setEditedText(editor.document);
						}}
						editable={isEditing}
						sideMenu={isEditing}
						theme={themeClass}
					/>
				</Box>
			</div>
			<Divider />
			<Box
				className="flex gap-2 justify-between items-center"
				sx={{ my: -0.5 }}
			>
				<Text size="sm">{journal.timestamp}</Text>
				<Box className="flex gap-2 items-center">
					{isEditing && (
						<IconButton onClick={handlePut}>
							<SaveRounded />
						</IconButton>
					)}
					{!isEditing && (
						<IconButton onClick={handleEdit}>
							<EditRounded />
						</IconButton>
					)}
					{isSharing && (
						<Modal open={isSharing} onClose={() => setIsSharing(false)}>
							<ModalDialog>
								<DialogTitle>Share</DialogTitle>
								<ModalClose />
								<Stack direction="row" justifyContent="end">
									<IconButton onClick={copyClipboard}>
										<ContentCopyRounded />
									</IconButton>
								</Stack>
								<Card>
									<CardContent>
										<div>
											<pre className="block py-10 px-30 overflow-scroll">
												{JSON.stringify(journal, null, 2)}
											</pre>
										</div>
									</CardContent>
								</Card>
							</ModalDialog>
						</Modal>
					)}
					<IconButton onClick={() => setIsSharing(true)}>
						<ShareRounded />
					</IconButton>
					<JournalMenu handleRemove={handleRemove} />
				</Box>
			</Box>
		</Card>
	);
};

export default Journal;
