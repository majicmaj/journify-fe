import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IJournal } from "../journal/journals";
import { postDraft } from "./draft";

const usePostDraft = () => {
  const queryClient = useQueryClient();

  const handlePost = async (journal: IJournal) => {
    postDraft(journal);
  };

  const mutation = useMutation({
    mutationKey: ["draft_post"],
    mutationFn: handlePost,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["draft"],
      });
    },
  });

  return mutation;
};

export default usePostDraft;
