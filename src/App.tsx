import { Box, Input, Button } from "@mui/joy";
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import { useState } from "react";
import useGetJournals from "./folders/api/journal/useGetJournals";
import { IJournal } from "./folders/api/journals";
import Text from "./folders/components/display/Text";
import Journal from "./folders/components/journal/Journal";
import NewEntryButton from "./folders/components/journal/NewEntryButton";
import NoJournals from "./folders/components/journal/NoJournals";

function App() {
  const [searchedJournal, setSearchedJournal] = useState<string>("");
  const [sortMode, setSortMode] = useState("ascending");

  const { data: journals } = useGetJournals();
  const isJournals = journals?.length > 0;


  const sortAscending = (journalA : IJournal, journalB : IJournal) => {
    const aTime = Number(new Date(journalA.timestamp).getTime())
    const bTime = Number(new Date(journalB.timestamp).getTime())
    return aTime - bTime 
    }

  const sortDescending = (journalA : IJournal, journalB : IJournal) => {
    const aTime = Number(new Date(journalA.timestamp).getTime())
    const bTime = Number(new Date(journalB.timestamp).getTime())
    return  bTime - aTime 
  }

  const sortFunction = sortMode === "ascending" ? sortAscending: sortDescending

 
  const sortedJournals = journals?.length ? [...journals]?.sort(sortFunction): [] 

  const filteredJournals = sortedJournals?.filter((journal: IJournal) =>
    journal.text.toLowerCase().includes(searchedJournal.toLowerCase())
    );

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

        <ToggleButtonGroup 
        value={sortMode}
        onChange={(_,value) => value && setSortMode(value)}>
        <Button value="ascending">Sort By Ascending</Button> 
        <Button value="descending">Sort By Descending</Button> 
        </ToggleButtonGroup>
        
        {isJournals && (
          <Input
            placeholder="Search"
            onChange={(e) => setSearchedJournal(e.target.value)}
            value={searchedJournal}
          />
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
