import { Dropdown, IconButton, Menu, MenuButton, MenuItem } from "@mui/joy";

import {
  ClearRounded,
  DeleteRounded,
  EditRounded,
  MenuRounded,
} from "@mui/icons-material";
import { useState } from "react";

interface IJournalMenu {
  handleEdit: () => void;
  handleCloseMenu: () => void;
  handleRemove: () => void;
}

const JournalMenu = ({
  handleEdit,
  handleCloseMenu,
  handleRemove,
}: IJournalMenu) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dropdown open={isOpen} onOpenChange={(_, open) => setIsOpen(open)}>
      <MenuButton slots={{ root: IconButton }}>
        <MenuRounded />
      </MenuButton>
      <Menu>
        <MenuItem onClick={handleEdit}>
          <EditRounded />
          Edit
        </MenuItem>
        <MenuItem onClick={handleRemove}>
          <DeleteRounded />
          Delete
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          <ClearRounded />
          Close
        </MenuItem>
      </Menu>
    </Dropdown>
  );
};

export default JournalMenu;
