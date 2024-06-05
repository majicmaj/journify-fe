import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJournal } from "./journals";

const useDeleteJournal = () => {
  const queryClient = useQueryClient();

  const handleDelete = async (timestamp: string) => {
    deleteJournal(timestamp);
  };

  const mutation = useMutation({
    mutationKey: ["journal_delete"],
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["journals"],
      });
    },
  });

  return mutation;
};

export default useDeleteJournal;
