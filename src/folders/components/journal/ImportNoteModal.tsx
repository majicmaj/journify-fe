import { Box, Button, IconButton, TextArea, Modal, ModalDialog, ModalClose, DialogTitle, DialogContent, Stack, Textarea } from "@mui/joy";
import { useState, useRef } from "react";

import usePostJournal from "../../api/journal/usePostJournal";

interface IImportNoteModal {
    isImportOpenModal: boolean;
    setIsImportOpenModal: (state: boolean) => void;
}

const ImportNoteModal = ({ isImportOpenModal, setIsImportOpenModal }: IImportNoteModal) => {
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    const { mutate: post } = usePostJournal();
  const getTimestamp = () => new Date().toLocaleString();

    const handleSubmit = () => {
        // TODO: add try/catch in case is not part of the format
        // Don't convert to JSON because the filteredJounals use
        // string.toLowerCase to make the filter
        const text = textAreaRef.current?.value;
        const json = JSON.parse(text);
        post(json);
        setIsImportOpenModal(false)
    }

    return (
        <Modal open={isImportOpenModal} onClose={() => setIsImportOpenModal(false)} >
            <ModalDialog>
                <DialogTitle>
                    Import note as a json
                </DialogTitle>
                <ModalClose />
                <DialogContent>
                    copy and paste the json to import the note
                </DialogContent>
                <Stack spacing={2}>
                    <Textarea slotProps={{ textarea: {ref: textAreaRef}}} />
                    <Button onClick={handleSubmit}>Import</Button>
                </Stack>
            </ModalDialog>
        </Modal>
    )
}

export default ImportNoteModal;
