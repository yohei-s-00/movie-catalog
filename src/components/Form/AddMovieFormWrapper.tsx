import { Box, Typography } from "@mui/material";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
};
export const AddMovieFormWrapper: FC<Props> = ({ children, title }) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{py: 4}}>
        {title}
      </Typography>
      <Box>{children}</Box>
    </Box>
  );
};
