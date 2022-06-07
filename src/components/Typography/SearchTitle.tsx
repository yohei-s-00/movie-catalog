import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const StyleTypography = styled(Typography)({
  marginTop: '10px',
  fontSize: '16px'
})

export const SearchTitle: FC<Props> = ({children}) => {
  return (
    <StyleTypography variant="h5">
      {children}
    </StyleTypography>
  );
};
