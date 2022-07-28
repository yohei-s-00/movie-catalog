import { ReactNode, FC } from "react";
import { Container, Paper, Typography } from "@mui/material";

type Props = {
  children: ReactNode;
  title?: string;
};
export const PaperContainer: FC<Props> = ({ children, title }) => {
  return (
    <Container maxWidth="lg">
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        {title && (
          <Typography component="h1" variant="h5" align="center">
            {title}
          </Typography>
        )}
        {children}
      </Paper>
    </Container>
  );
};
