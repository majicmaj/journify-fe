import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { IJournal, postJournal } from "./journals";

const usePostJournal = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  // const timestamp = new Date().toLocaleString();
  // const { mutate: post } = usePostDraft();

  const handlePost = async (journal: IJournal) => {
    postJournal(journal);
  };

  const mutation = useMutation({
    mutationKey: ["journal_post"],
    mutationFn: handlePost,
    onSuccess: () => {
      window.localStorage.removeItem("draft");
      queryClient.invalidateQueries({
        queryKey: ["journals"],
      });
      queryClient.invalidateQueries({
        queryKey: ["draft"],
      });
      navigate("/");
    },
  });

  return mutation;
};

export default usePostJournal;
