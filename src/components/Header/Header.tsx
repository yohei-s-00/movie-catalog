import { AppBar, Toolbar, } from "@mui/material"
import { Box } from "@mui/system"
import { HeaderMenu } from "@components/Header/HeaderMenu";

export const Header = () => {
  return(
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <HeaderMenu />
      </Toolbar>
    </AppBar>
  </Box>
  )
}