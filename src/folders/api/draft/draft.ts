import { IJournal } from "../journal/journals";

export const DRAFT_KEY = "draft";

export const getDraft = () => {
  const draft = window.localStorage.getItem(DRAFT_KEY);
  return draft ? JSON.parse(draft) : {};
};

export const postDraft = (draft: IJournal) => {
  window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
};
