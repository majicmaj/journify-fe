import { Dropdown, IconButton, Menu, MenuButton, MenuItem } from "@mui/joy";

import { DeleteRounded, MoreHorizRounded } from "@mui/icons-material";
import { useState } from "react";

interface IJournalMenu {
	handleRemove: () => void;
}

const JournalMenu = ({ handleRemove }: IJournalMenu) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dropdown open={isOpen} onOpenChange={(_, open) => setIsOpen(open)}>
			<MenuButton slots={{ root: IconButton }}>
				<MoreHorizRounded />
			</MenuButton>
			<Menu>
				<MenuItem onClick={handleRemove} color="danger">
					<DeleteRounded />
					Delete
				</MenuItem>
			</Menu>
		</Dropdown>
	);
};

export default JournalMenu;
