import {
  FormControl,
  FormHelperText,
  FormLabel,
  TextareaAutosizeProps,
} from "@mui/material";
import MUIInput from "@mui/material/Input";
import { ChangeEventHandler, FC, FocusEventHandler } from "react";

export type InputFieldProps = {
  label?: string;
  error?: string;
  type?: string;
};

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
        onChange={onChange}
        onBlur={onBlur}
        type={type && type}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
