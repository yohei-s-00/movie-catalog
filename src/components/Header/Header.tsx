import { AppBar, Button, Toolbar, } from "@mui/material"
import { Box } from "@mui/system"
import { HeaderMenu } from "@components/Header/HeaderMenu";
import FaceIcon from '@mui/icons-material/Face';
import { useIsLogin } from "@hooks/globalstate";

export const Header = () => {
  const [isLogin, setIsLogin] = useIsLogin();
  return(
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <HeaderMenu />
        {isLogin && <Button color="secondary" variant="outlined"><FaceIcon />ログイン中</Button>}
      </Toolbar>
    </AppBar>
  </Box>
  )
}