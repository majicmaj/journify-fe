import { BorderColorRounded, PublishRounded } from "@mui/icons-material";
import { MoreHorizRounded } from "@mui/icons-material";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightsStaySharpIcon from "@mui/icons-material/NightsStaySharp";
import { Dropdown, IconButton, Menu, MenuButton, MenuItem } from "@mui/joy";
import { Button } from "@mui/joy";
import ImportNoteButton from "./ImportNoteButton";

import { useState } from "react";

interface IMainMenu {
	mode: "light" | "dark";
	setMode: () => void;
	setIsImportOpenModal: (value: boolean) => void;
}

const MainMenu = ({ mode, setMode, setIsImportOpenModal }: IMainMenu) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleIcon = () => {
		return mode === "light" ? <NightsStaySharpIcon /> : <LightModeIcon />;
	};

	const toggleTheme = () => setMode(mode === "dark" ? "light" : "dark");

	return (
		<Dropdown open={isOpen} onOpenChange={(_, open) => setIsOpen(open)}>
			<MenuButton slots={{ root: IconButton }}>
				<MoreHorizRounded />
			</MenuButton>
			<Menu>
				<MenuItem onClick={toggleTheme}>
					<IconButton className="cursor-pointer ">{toggleIcon()}</IconButton>
				</MenuItem>
				<MenuItem>
					<Button
						onClick={() => setIsImportOpenModal(true)}
						startDecorator={<PublishRounded />}
						variant="solid"
						sx={{}}
					>
						Import from JSON
					</Button>
				</MenuItem>
			</Menu>
		</Dropdown>
	);
};

export default MainMenu;
