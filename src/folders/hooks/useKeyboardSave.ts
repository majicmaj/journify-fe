import { useEffect } from "react";

const useKeyboardSave = (onSave: () => void, dependencies: unknown[] = []) => {
	// Saves the journal with ctrl/cmd + s
	return useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key === "s") {
				e.preventDefault();
				onSave();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, dependencies);
};

export default useKeyboardSave;
