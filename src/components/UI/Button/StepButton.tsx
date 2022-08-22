import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import { Box, Button } from "@mui/material";
import { FC } from "react";

type Props = {
  step: number;
  next: () => void;
  back: () => void;
};

export const StepButton: FC<Props> = ({ step, next, back }) => {
  return (
    <Box textAlign={"right"}>
      {step >= 1 && (
        <Button onClick={back}>
          <UndoIcon />
          戻る
        </Button>
      )}
      {step <= 1 && (
        <Button onClick={next}>
          次へ
          <RedoIcon />
        </Button>
      )}
    </Box>
  );
};
