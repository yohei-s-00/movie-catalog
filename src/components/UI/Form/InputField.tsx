import {
  DeepMap,
  FieldError,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { Input, InputFieldProps } from "./Input";

export type RhfInputProps<T extends FieldValues> = InputFieldProps &
  UseControllerProps<T>;

export const InputField = <T extends FieldValues>(props: RhfInputProps<T>) => {
  const { name, control, label, type } = props;
  const {
    field: { ref, ...rest },
    formState: { errors },
  } = useController<T>({ name, control });
  
  return (
    <Input
      label={label}
      type={type}
      inputRef={ref}
      {...rest}
      error={
        errors[name] &&
        `${(errors[name] as DeepMap<FieldValues, FieldError>).message}`
      }
    />
  );
};
