import { FC, ReactNode } from "react";
import { RecoilRoot } from "recoil";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { QueryClientProvider, QueryClient } from "react-query";
import { green } from "@mui/material/colors";

type Props = {
  children: ReactNode;
};

const theme = createTheme({
  palette: {
    primary: green,
  },
});

export const Provider: FC<Props> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
};
