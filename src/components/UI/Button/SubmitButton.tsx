import { Button } from "@mui/material";
import { FC } from "react";

type Props = {
  isLoading: boolean
  label: string
}

export const SubmitButton: FC<Props> = ({isLoading,label}) => {
  return (
    <Button variant="contained" type="submit">
      {isLoading ? "loading..." : label}
    </Button>
  );
};
