import { Dropdown, IconButton, Menu, MenuButton, MenuItem } from "@mui/joy";

import {
  DeleteRounded,
  EditRounded,
  MoreHorizRounded,
} from "@mui/icons-material";
import { useState } from "react";

interface IJournalMenu {
  handleEdit: () => void;
  handleRemove: () => void;
}

const JournalMenu = ({ handleEdit, handleRemove }: IJournalMenu) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dropdown open={isOpen} onOpenChange={(_, open) => setIsOpen(open)}>
      <MenuButton slots={{ root: IconButton }}>
        <MoreHorizRounded />
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
      </Menu>
    </Dropdown>
  );
};

export default JournalMenu;
