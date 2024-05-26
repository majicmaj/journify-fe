import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IJournal, postJournal } from "../journals";

const useDeleteJournal = () => {
  const queryClient = useQueryClient();

  const handlePost = async (journal: IJournal) => {
    postJournal(journal);
  };

  const mutation = useMutation({
    mutationKey: ["journal_post"],
    mutationFn: handlePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["journals"],
      });
    },
  });

  return mutation;
};

export default useDeleteJournal;
