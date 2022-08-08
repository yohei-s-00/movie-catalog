import {
  FormControl,
  FormHelperText,
  FormLabel,
  TextareaAutosizeProps,
} from "@mui/material";
import MUIInput from "@mui/material/TextField";
import { FC, FocusEventHandler } from "react";

export type InputFieldProps = {
  label?: string;
  error?: string;
  type?: string;
};

type Props = InputFieldProps & {
  value: string | number;
  inputRef: TextareaAutosizeProps["ref"];
  onChange: (...event: any[]) => void;
  onBlur: FocusEventHandler<HTMLTextAreaElement>;
};

export const Input: FC<Props> = ({
  label,
  value,
  error,
  type,
  inputRef,
  onChange,
  onBlur,
}) => {
  
  return (
    <FormControl fullWidth>
      {label && <FormLabel>{label}</FormLabel>}
      <MUIInput
        value={value}
        inputRef={inputRef}
        onChange={(e)=> type === "number" ? onChange(parseInt(e.target.value))  : onChange(e.target.value)}
        onBlur={onBlur}
        type={type && type}
        variant="standard"
        
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
