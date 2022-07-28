import { FormValue } from "@components/Form/AddMovieFormContent";
import { ChangeEvent, ChangeEventHandler, FC } from "react";
import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  useController,
  UseControllerProps,
  UseFormSetValue,
} from "react-hook-form";
import { UploadInputProps, UploadInput } from "./UploadInput";

type setValue<T> = {
  setValue: UseFormSetValue<T>;
};

export type RhfUploadInputProps<T extends FieldValues> = UploadInputProps &
  UseControllerProps<T> &
  setValue<T>;

export const UploadInputField = <T extends FieldValues>(
  props: RhfUploadInputProps<T>
) => {
  const { name, control, label, accept, setValue } = props;
  const {
    field: { ref, ...rest },
    formState: { errors },
  } = useController({ name, control });
  const OnChangeFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      const file: any = e.target.files[0];
      const n = name;
      setValue(n, file);
    }
  };
  return (
    <UploadInput
      label={label}
      inputRef={ref}
      OnChangeFile={OnChangeFile}
      accept={accept}
      {...rest}
      error={
        errors[name] &&
        `${(errors[name] as DeepMap<FieldValues, FieldError>).message}`
      }
    />
  );
};
