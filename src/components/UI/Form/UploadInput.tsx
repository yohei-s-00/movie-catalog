import { FormValue } from "@components/Form/AddMovieFormContent";
import {
  Button,
  FormControl,
  FormLabel,
  TextareaAutosizeProps,
} from "@mui/material";
import { ChangeEvent, ChangeEventHandler, FC, FocusEventHandler } from "react";
import { FieldValues, Path, UseFormSetValue } from "react-hook-form";
import { Image } from "../Display/Image";

export type UploadInputProps = {
  label?: string;
  error?: string;
  accept: string;
};

type Props = UploadInputProps & {
  inputRef: React.Ref<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur: FocusEventHandler<HTMLInputElement>;
  OnChangeFile: ChangeEventHandler<HTMLInputElement>;
  value: File | null | string;
  name: string;
};

export const UploadInput: FC<Props> = ({
  label,
  error,
  accept,
  name,
  inputRef,
  onChange,
  onBlur,
  OnChangeFile,
  value,
}) => {
  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <label htmlFor={`upload-${name}`}>
        <input
          style={{ display: "none" }}
          id={`upload-${name}`}
          accept={`${accept}/*`}
          multiple
          type="file"
          ref={inputRef}
          onChange={OnChangeFile}
          onBlur={onBlur}
        />
        {value ? (
          accept === "image" ? (
            <Image
              src={window.URL.createObjectURL(new Blob([value]))}
              alt="サムネイル"
            />
          ) : (
            <video
              style={{ maxWidth: "100%" }}
              controls
              src={window.URL.createObjectURL(new Blob([value]))}
            />
          )
        ) : (
          <Button variant="contained" component="span">
            ファイルを選択
          </Button>
        )}
      </label>
    </FormControl>
  );
};
