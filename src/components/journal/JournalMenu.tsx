import { Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";

import {
  ClearRounded,
  DeleteRounded,
  EditRounded,
  MenuRounded,
  SaveAsRounded,
} from "@mui/icons-material";
import { useState } from "react";

interface IJournalMenu {
  handleDelete: () => void;
  handleEdit: () => void;
  handleCloseMenu: () => void;
  handlePut: () => void;
  handleRemove: () => void;
}

const JournalMenu = ({
  handleDelete,
  handleEdit,
  handleCloseMenu,
  handlePut,
  handleRemove,
}: IJournalMenu) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dropdown open={isOpen} onOpenChange={(_, open) => setIsOpen(open)}>
      <MenuButton>
        <MenuRounded />
      </MenuButton>
      <Menu>
        <MenuItem onClick={handleEdit}>
          <EditRounded />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteRounded />
          Delete
        </MenuItem>
        <MenuItem onClick={handlePut}>
          <SaveAsRounded />
          Save
        </MenuItem>
        <MenuItem onClick={handleRemove}>
          <ClearRounded />
          Remove
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          <MenuRounded />
          Close
        </MenuItem>
      </Menu>
    </Dropdown>
  );
};

export default JournalMenu;
