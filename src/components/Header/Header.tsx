import { AppBar, Button, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { HeaderMenu } from "@components/Header/HeaderMenu";
import FaceIcon from "@mui/icons-material/Face";
import { useIsLogin } from "@hooks/globalstate";

export const Header = () => {
  const [isLogin] = useIsLogin();
  return (
    <Box
      sx={{ flexGrow: 1, position: "sticky", top: 0, zIndex: 100 }}
      component="header"
    >
      <AppBar position="static">
        <Toolbar>
          <HeaderMenu />
          {isLogin && (
            <Button color="secondary" variant="outlined">
              <FaceIcon />
              ログイン中
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
