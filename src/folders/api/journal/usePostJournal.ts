import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IJournal, postJournal } from "./journals";
import { useNavigate } from "react-router-dom";
import usePostDraft  from "../draft/usePostDraft";

const usePostJournal = () => {
	const queryClient = useQueryClient();

	const navigate = useNavigate();
	const timestamp = new Date().toLocaleString();

	const { mutate : post } = usePostDraft();

	const handlePost = async (journal: IJournal) => {
		postJournal(journal);
	};

	const mutation = useMutation({
		mutationKey: ["journal_post"],
		mutationFn: handlePost,
		onSuccess: () => {
			post({
                text: "{}",
                timestamp,
            })
			queryClient.invalidateQueries({
				queryKey: ["journals", "draft"]
			});
			navigate("/");
		},
	});

	return mutation;
};

export default usePostJournal;
