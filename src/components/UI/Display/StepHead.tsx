import { Step, StepLabel, Stepper } from "@mui/material";
import { FC } from "react";

type Props = {
  step: number
  stepItems: string[]
}

export const StepHead: FC<Props> = ({step,stepItems}) => {
  return (
    <Stepper activeStep={step}>
      {stepItems.map((item) => (
        <Step key={item}>
          <StepLabel>{item}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
