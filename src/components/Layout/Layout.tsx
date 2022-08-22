import { Box, Container } from "@mui/system";
import { FC, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@components/Header/Header";
import { ContentContainer } from "./ContentContainer";

export const Layout = () => {
  return (
    <Box sx={{height: "100vh",display: "flex", flexDirection: "column"}}>
      <Header />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </Box>
  );
};
