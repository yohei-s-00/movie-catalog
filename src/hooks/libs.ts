import ReactPDF, { renderToFile } from "@react-pdf/renderer";
import { FC, JSXElementConstructor, useState } from "react";

export const useSteps = (
  defaultNumber: number
): [number, () => void, () => void] => {
  const [currentStep, setStep] = useState<number>(defaultNumber);
  const handleNext = () => {
    setStep((prev) => prev + 1);
  };
  const handleBack = () => {
    setStep((prev) => prev - 1);
  };
  return [currentStep, handleNext, handleBack];
};