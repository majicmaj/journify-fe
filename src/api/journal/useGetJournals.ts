import { useQuery } from "@tanstack/react-query";
import { getJournals } from "../journals";

const useGetJournals = () => {
  const query = useQuery({
    queryKey: ["journals"],
    queryFn: getJournals,
  });

  return query;
};

export default useGetJournals;
