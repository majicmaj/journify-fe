import { Input } from "@mui/joy";
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
    <div className="max-h-screen h-screen bg-stone-100">
      <div className="p-2 h-full flex flex-col gap-2">
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

      <div className="sticky bottom-0 left-0 right-0 p-4 flex justify-center">
        <NewEntryButton fullButton={!isJournals} />
      </div>
    </div>
  );
}

export default App;
