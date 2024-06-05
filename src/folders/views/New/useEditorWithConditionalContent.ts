import { useCreateBlockNote } from "@blocknote/react";
import { IJournal } from "../../api/journal/journals";

const useEditorWithDraft = (draft: IJournal) =>
  useCreateBlockNote({
    initialContent: JSON.parse(draft.text),
  });

const useEditorWithoutDraft = () => useCreateBlockNote();

const hookMap = {
  true: useEditorWithDraft,
  false: useEditorWithoutDraft,
};

/**
 * This hook is used to create a new block note editor with conditional content.
 * the useCreateBlockNote hook is used to create a new block note editor, and
 * cannot be passed initail content conditionally. This hook handles the content
 * conditionally and returns the appropriate hook based on the inital content or
 * the lack of.
 * @param draft
 * @returns
 */
const useEditorWithConditionalContent = (draft: IJournal | null) => {
  const hasValidDraft = draft !== null && Object.keys(draft).length > 0;
  const useEditorHook = hookMap[`${hasValidDraft}`];
  return useEditorHook(draft as IJournal);
};

export default useEditorWithConditionalContent;
