export interface IJournal {
  timestamp: string;
  text: string;
  title: string;
}

export const JOURNAL_KEY = "journals";

export const getJournals = () => {
  const journals = window.localStorage.getItem(JOURNAL_KEY);
  return journals ? JSON.parse(journals) : [];
};

export const getJournal = (timestamp: string) => {
  const journals = getJournals();
  return journals.find((journal: IJournal) => journal.timestamp === timestamp);
};

export const postJournal = (journal: IJournal) => {
  const journals = getJournals();
  journals.push(journal);
  window.localStorage.setItem(JOURNAL_KEY, JSON.stringify(journals));
};

export const putJournal = (journal: IJournal) => {
  const journals = getJournals();
  const index = journals.findIndex(
    (j: IJournal) => j.timestamp === journal.timestamp
  );
  journals[index] = journal;
  window.localStorage.setItem(JOURNAL_KEY, JSON.stringify(journals));
};

export const deleteJournal = (timestamp: string) => {
  const journals = getJournals();
  const index = journals.findIndex(
    (journal: IJournal) => journal.timestamp === timestamp
  );
  journals.splice(index, 1);
  window.localStorage.setItem(JOURNAL_KEY, JSON.stringify(journals));
};
