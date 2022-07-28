import { Box, Container } from "@mui/system";
import { FC, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@components/Header/Header";
import { ContentContainer } from "./ContentContainer";

export const Layout = () => {
  return (
    <>
      <Header />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </>
  );
};
