import { FormControl, FormHelperText, FormLabel, TextareaAutosizeProps, TextField,  } from "@mui/material";
import MUIInput from "@mui/material/Input"
import { ChangeEventHandler, FC, FocusEventHandler } from "react";

export type InputFieldProps = {
  label?: string;
  error?: string;
}

type Props = InputFieldProps & {
  value: string | number;
  inputRef: TextareaAutosizeProps["ref"];
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onBlur: FocusEventHandler<HTMLTextAreaElement>;
};

export const Input: FC<Props> = ({
  label,
  value,
  error,
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
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <FormHelperText >{error}</FormHelperText>}
    </FormControl>
  );
};
