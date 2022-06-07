import { Box, Container } from "@mui/system";
import { FC, ReactNode } from "react"
import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";

export const Layout = () => {
  return(
    <>
      <Header />
      <Container maxWidth="lg">
        <Box py={4}>
          <Outlet />
        </Box>
      </Container>
    </>
  )
}