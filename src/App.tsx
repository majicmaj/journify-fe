import { SwapVertRounded } from "@mui/icons-material";
import { Box, IconButton, Input } from "@mui/joy";
import { useState } from "react";
import useGetJournals from "./folders/api/journal/useGetJournals";
import { IJournal } from "./folders/api/journals";
import Text from "./folders/components/display/Text";
import Journal from "./folders/components/journal/Journal";
import NewEntryButton from "./folders/components/journal/NewEntryButton";
import NoJournals from "./folders/components/journal/NoJournals";

function App() {
  const [searchedJournal, setSearchedJournal] = useState<string>("");
  const [sortMode, setSortMode] = useState("descending");

  const { data: journals } = useGetJournals();
  const isJournals = journals?.length > 0;

  const sortAscending = (journalA: IJournal, journalB: IJournal) => {
    const aTime = Number(new Date(journalA.timestamp).getTime());
    const bTime = Number(new Date(journalB.timestamp).getTime());
    return aTime - bTime;
  };

  const sortDescending = (journalA: IJournal, journalB: IJournal) => {
    const aTime = Number(new Date(journalA.timestamp).getTime());
    const bTime = Number(new Date(journalB.timestamp).getTime());
    return bTime - aTime;
  };

  const sortFunction =
    sortMode === "ascending" ? sortAscending : sortDescending;

  const sortedJournals = journals?.length
    ? [...journals]?.sort(sortFunction)
    : [];

  const filteredJournals = sortedJournals?.filter((journal: IJournal) =>
    journal.text.toLowerCase().includes(searchedJournal.toLowerCase())
  );

  const toggleSortMode = () => {
    setSortMode(sortMode === "ascending" ? "descending" : "ascending");
  };

  return (
    <div className="relative max-h-screen h-screen bg-stone-100 overflow-hidden items-center flex flex-col">
      <div className="p-2 flex flex-col gap-2 h-full overflow-y-scroll w-full">
        <div className="pt-4 pb-8 flex items-center gap-1">
          <img
            src="/journify_256.png"
            alt="Journify Logo"
            className="h-[32px] inline"
          />
          <Text h={3}>Journify</Text>
        </div>

        {isJournals && (
          <div className="flex gap-2">
            <Input
              placeholder="Search"
              onChange={(e) => setSearchedJournal(e.target.value)}
              value={searchedJournal}
              sx={{ flexGrow: 1 }}
            />
            <IconButton
              onClick={toggleSortMode}
              variant="outlined"
              color={sortMode === "ascending" ? "primary" : "neutral"}
            >
              <SwapVertRounded />
            </IconButton>
          </div>
        )}

        {isJournals &&
          filteredJournals?.map((journal: IJournal) => (
            <Journal journal={journal} key={journal.timestamp} />
          ))}

        {!isJournals && <NoJournals />}
      </div>

      <Box className="fixed bottom-0 p-2 pb-8">
        <NewEntryButton fullButton={!isJournals} />
      </Box>
    </div>
  );
}

export default App;
