import { useCreateBlockNote } from "@blocknote/react";
import { IJournal } from "../../api/journal/journals";

const useEditorWithDraft = (draft : IJournal) => 
    useCreateBlockNote({
        initialContent: JSON.parse(draft.text),
    });


const useEditorWithoutDraft = () => useCreateBlockNote();
    

const hookMap = { 
    true: useEditorWithDraft,
    false: useEditorWithoutDraft,
};


const useEditorWithConditionalContent = (draft : IJournal | null) => {
    const hasValidDraft = draft !== null && Object.keys(draft).length > 0;
    const useEditorHook = hookMap[`${hasValidDraft}`];
    return useEditorHook(draft as IJournal);
}

export default useEditorWithConditionalContent;
