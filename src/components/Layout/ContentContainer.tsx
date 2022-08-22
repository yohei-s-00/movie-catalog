import { Box, Container } from "@mui/system";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export const ContentContainer: FC<Props> = ({ children }) => {

  return (
    <Box component="main">
      <Container sx={{ height: "100vh" }} maxWidth="lg">
        <Box py={4}>{children}</Box>
      </Container>
    </Box>
  );
};
