import { MoreHorizRounded, PublishRounded } from "@mui/icons-material";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightsStaySharpIcon from "@mui/icons-material/NightsStaySharp";
import {
	Button,
	Dropdown,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
} from "@mui/joy";

import { useState } from "react";

interface IMainMenu {
	mode: string | undefined;
	toggleTheme: () => void;
	setIsImportOpenModal: (value: boolean) => void;
}

const MainMenu = ({ mode, toggleTheme, setIsImportOpenModal }: IMainMenu) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleIcon = () => {
		return mode === "dark" ? <NightsStaySharpIcon /> : <LightModeIcon />;
	};

	return (
		<Dropdown open={isOpen} onOpenChange={(_, open) => setIsOpen(open)}>
			<MenuButton slots={{ root: IconButton }}>
				<MoreHorizRounded />
			</MenuButton>
			<Menu>
				<MenuItem>
					<Button
						onClick={toggleTheme}
						startDecorator={toggleIcon()}
						className="cursor-pointer"
						color="neutral"
						variant="plain"
					>
						{mode}
					</Button>
				</MenuItem>
				<MenuItem>
					<Button
						onClick={() => setIsImportOpenModal(true)}
						startDecorator={<PublishRounded />}
						variant="plain"
						color="neutral"
					>
						Import
					</Button>
				</MenuItem>
			</Menu>
		</Dropdown>
	);
};

export default MainMenu;
