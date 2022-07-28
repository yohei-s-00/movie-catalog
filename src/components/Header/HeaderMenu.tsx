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
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { AppLink } from "@components/UI/Link/AppLink";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "src/firebase/firebase";
import { useLink } from "@hooks/page";
import { useIsLogin } from "@hooks/globalstate";

export const HeaderMenu = () => {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useIsLogin();
  const navigation = useLink();
  const MenuListItems = [
    { path: "/", name: "Home", icon: <HomeIcon /> },
    { path: "admin", name: "Admin", icon: <SettingsIcon /> },
    { path: "login", name: "Login", icon: <LoginIcon /> },
  ];
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleLogout = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        signOut(auth)
          .then(() => {
            console.log("ログアウトしました");
            setIsLogin(false)
            navigation("/",{ replace: true });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("既にログアウトしています");
        setIsLogin(false)
        navigation("/",{ replace: true });
      }
    });
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
            {MenuListItems.map((item, i) => (
              <>
                {item.name !== "Admin" && (
                  <ListItem key={i} disablePadding>
                    <AppLink to={item.path}>
                      <ListItemButton onClick={() => handleClose()}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} />
                      </ListItemButton>
                    </AppLink>
                  </ListItem>
                )}
                {isLogin && item.name === "Admin" && (
                  <ListItem key={i} disablePadding>
                    <AppLink to={item.path}>
                      <ListItemButton onClick={() => handleClose()}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} />
                      </ListItemButton>
                    </AppLink>
                  </ListItem>
                )}
              </>
            ))}
            {isLogin && (
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleLogout()}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="ログアウト" />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
