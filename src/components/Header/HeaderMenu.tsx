import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import { AppLink } from "../Link/AppLink";

export const HeaderMenu = () => {
  const [open, setOpen] = useState(false);
  const MenuListItems = [
    { path: "/", name: "Home" },
    { path: "admin", name: "Admin" },
  ];
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={() => handleOpen()}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={handleClose}>
        <Box sx={{ width: 250 }}>
          <List>
            {MenuListItems.map((item) => (
              <ListItem key={item.name} disablePadding>
                <AppLink to={item.path}>
                  <ListItemButton onClick={() => handleClose()}>
                    <ListItemIcon>
                      {item.name === "Home" && <HomeIcon />}
                      {item.name === "Admin" && <SettingsIcon />}
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </AppLink>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
