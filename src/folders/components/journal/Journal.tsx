import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { EditRounded, SaveRounded, ShareRounded, ContentCopyRounded } from "@mui/icons-material";
import { Box, Card, CardContent, Textarea, Divider, IconButton, Modal, ModalClose, ModalDialog, DialogTitle, DialogContent, Stack, FormControl, FormLabel, Input, Button } from "@mui/joy";
import { useColorScheme } from "@mui/joy/styles";
import { useState, useRef } from "react";
import { IJournal } from "../../api/journal/journals";
import useDeleteJournal from "../../api/journal/useDeleteJournal";
import usePutJournal from "../../api/journal/usePutJournal";
import useKeyboardSave from "../../hooks/useKeyboardSave";
import Text from "../display/Text";
import JournalMenu from "./JournalMenu";

const Journal = ({ journal }: { journal: IJournal }) => {
    const { mutate: remove } = useDeleteJournal();
    const { mutate: update } = usePutJournal();

    const textAreaRef = useRef(null);

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

    const copyClipboard = (event) => {
        // TODO: add copy to clipboard and open a modal to show the text in json
  if ('clipboard' in navigator) {
    return navigator.clipboard.writeText(journal.text);
  } else {
    return document.execCommand('copy', true, journal.text);
  }
    }

    const syntaxHighlight = (json) => {
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }

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
                    {
                        isSharing && (
                            <Modal open={isSharing} onClose={() => setIsSharing(false)}>
                                <ModalDialog>
                                    <DialogTitle>
                                        Share
                                    </DialogTitle>
                                    <Stack direction="row"
                                        justifyContent="end"
                                    >
                                        <IconButton onClick={copyClipboard}>
                                            <ContentCopyRounded />
                                        </IconButton>

                                    </Stack>
                                    <Card>
                                      <CardContent >
                                    <div>
                                      <pre className="block py-10 px-30 overflow-scroll">
                                        {JSON.stringify(journal.text, null, 2)}
                                      </pre>
                                    </div>
                                      </CardContent>
                                    </Card>
                                </ModalDialog>
                            </Modal>
                        )
                    }
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
