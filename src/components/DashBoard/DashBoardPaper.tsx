import { AppLink } from "@components/UI/Link/AppLink";
import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";

type Props = {
  title: string;
  text: string;
  to: string;
};

export const DashBoardPaper: FC<Props> = ({ title, text, to }) => {
  return (
    <Card
      sx={{
        display: "block",
        px: 2,
        mt: 2,
        borderLeft: 8,
        borderLeftColor: "green",
      }}
      variant="outlined"
    >
      <AppLink to={to}>
        <Box sx={{ py: 5 }}>
          <CardContent>
            <Typography variant="h5">{title}</Typography>
            <Typography>{text}</Typography>
          </CardContent>
        </Box>
      </AppLink>
    </Card>
  );
};
