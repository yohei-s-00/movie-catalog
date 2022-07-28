import { Typography } from "@mui/material"
import { FC } from "react"

type Props = {
  title : string
}

export const PageTitle: FC<Props> = ({title}) => {
  return(
    <Typography variant="h4">
      {title}
    </Typography>
  )
}