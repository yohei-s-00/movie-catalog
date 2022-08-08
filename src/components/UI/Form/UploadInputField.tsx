import {
  DeepMap,
  FieldError,
  FieldValues,
  useController,
  UseControllerProps,
  UseFormSetValue,
} from "react-hook-form";
import { UploadInputProps, UploadInput } from "./UploadInput";

export type RhfUploadInputProps<T extends FieldValues> = UploadInputProps &
  UseControllerProps<T>;

export const UploadInputField = <T extends FieldValues>(
  props: RhfUploadInputProps<T>
) => {
  const { name, control, label, accept } = props;
  const {
    field: { ref, ...rest },
    formState: { errors },
  } = useController({ name, control });
  return (
    <UploadInput
      label={label}
      inputRef={ref}
      accept={accept}
      {...rest}
      error={
        errors[name] &&
        `${(errors[name] as DeepMap<FieldValues, FieldError>).message}`
      }
    />
  );
};
