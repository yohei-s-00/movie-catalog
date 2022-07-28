import styled from "@emotion/styled";
import { FC, ReactNode } from "react";
import { Link } from "react-router-dom"

type Props = {
  children: ReactNode;
  to: string
}

const StyleLink = styled(Link)({
  display: 'block',
  textDecoration: 'none',
  color: 'black',
  width: '100%',
})

export const AppLink: FC<Props> = ({children,to}) => {
  return(
    <StyleLink to={to}>
      {children}
    </StyleLink>
  )
}