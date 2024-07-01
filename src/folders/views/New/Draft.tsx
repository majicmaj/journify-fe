import { BlockNoteView } from "@blocknote/mantine";
import usePostDraft from "../../api/draft/usePostDraft";
import { IJournal } from "../../api/journal/journals";
import useEditorWithConditionalContent from "./useEditorWithConditionalContent";
import { useColorScheme } from "@mui/joy";

const Draft = ({ draft }: { draft:IJournal }) => {

    const editor = useEditorWithConditionalContent(draft);
    
    const { mode } = useColorScheme();
    const { mutate: updateDraft } = usePostDraft();
    
    const timestamp = new Date().toLocaleString();
    const themeClass = mode === "system" ? "light" : mode;
    

    return (
        <BlockNoteView
        editor={editor}
        theme={themeClass}
        onChange={() =>
            updateDraft({
                text: JSON.stringify(editor.document),
                timestamp,
            })
        }
        style={{ height: "100%" }} 
        />  
    );
};

export default Draft;
