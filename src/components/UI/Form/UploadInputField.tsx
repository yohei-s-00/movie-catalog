import { FormValue } from "@components/Form/AddMovieFormContent";
import { ChangeEvent, ChangeEventHandler, FC } from "react";
import {
  DeepMap,
  FieldError,
  FieldValues,
  useController,
  UseControllerProps,
  UseFormSetValue,
} from "react-hook-form";
import { UploadInputProps, UploadInput } from "./UploadInput";

type setValue = {
  setValue: UseFormSetValue<FormValue>
}

export type RhfUploadInputProps<T extends FieldValues> = UploadInputProps &
  UseControllerProps<T> & setValue;

export const UploadInputField = <T extends FieldValues>(
  props: RhfUploadInputProps<T>
) => {
  const { name, control, label, accept, setValue } = props;
  const {
    field: { ref, ...rest },
    formState: { errors },
  } = useController({ name, control });
  const OnChangeFile: ChangeEventHandler<HTMLInputElement>= (e) => {
    if(e.target.files){
      const file = e.target.files[0];
      const n = name.toString()
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
