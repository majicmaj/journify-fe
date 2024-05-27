import { Box, Input } from "@mui/joy";
import { useState } from "react";
import useGetJournals from "./folders/api/journal/useGetJournals";
import { IJournal } from "./folders/api/journals";
import Text from "./folders/components/display/Text";
import Journal from "./folders/components/journal/Journal";
import NewEntryButton from "./folders/components/journal/NewEntryButton";

function App() {
  const [searchedJournal, setSearchedJournal] = useState<string>("");

  const { data: journals } = useGetJournals();

  const isJournals = journals?.length > 0;

  const filteredJournals = journals?.filter((journal: IJournal) =>
    journal.text.toLowerCase().includes(searchedJournal.toLowerCase())
  );

  return (
    <div className="relative max-h-screen h-screen bg-stone-100 overflow-hidden items-center flex flex-col">
      <div className="p-2 flex flex-col gap-2 h-full overflow-y-scroll w-full">
        <div className="pt-4 pb-8">
          <Text h={1}>Journify</Text>
        </div>

        <Input
          placeholder="Search"
          onChange={(e) => setSearchedJournal(e.target.value)}
          value={searchedJournal}
        />

        {isJournals &&
          filteredJournals?.map((journal: IJournal) => (
            <Journal journal={journal} key={journal.timestamp} />
          ))}
      </div>

      <Box className="fixed bottom-0 p-2 ">
        <NewEntryButton fullButton={!isJournals} />
      </Box>
    </div>
  );
}

export default App;
