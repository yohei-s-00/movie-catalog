import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

type Props ={
  children: ReactNode;
}
export const CenterFlexBox: FC<Props> = ({children}) => {
  return(
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      {children}
    </Box>
  )
}