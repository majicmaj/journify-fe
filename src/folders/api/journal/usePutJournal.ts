import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IJournal, putJournal } from "./journals";

const usePutJournal = () => {
  const queryClient = useQueryClient();

  const handlePut = async (journal: IJournal) => {
    putJournal(journal);
  };

  const mutation = useMutation({
    mutationKey: ["journal_put"],
    mutationFn: handlePut,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["journals"],
      });
    },
  });

  return mutation;
};

export default usePutJournal;
