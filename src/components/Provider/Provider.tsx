import { FC, ReactNode } from "react";
import { RecoilRoot } from "recoil";
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClientProvider, QueryClient } from "react-query";


type Props = {
  children: ReactNode;
};

export const Provider: FC<Props> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
      <CssBaseline />
        {children}
      </QueryClientProvider>
    </RecoilRoot>
  );
};
