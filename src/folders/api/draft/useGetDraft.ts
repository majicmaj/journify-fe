import { useQuery } from "@tanstack/react-query";
import { getDraft } from "./draft";

const useGetDraft = () => {
  const query = useQuery({
    queryFn: getDraft,
    queryKey: ["draft"],
  });

  return query;
};

export default useGetDraft;
