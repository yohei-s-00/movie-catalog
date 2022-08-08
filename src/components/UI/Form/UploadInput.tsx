import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import { FC, FocusEventHandler } from "react";
import { Image } from "../Display/Image";

export type UploadInputProps = {
  label?: string;
  error?: string;
  accept: string;
};

type Props = UploadInputProps & {
  inputRef: React.Ref<HTMLInputElement>;
  onChange: (...event: any[]) => void;
  onBlur: FocusEventHandler<HTMLInputElement>;
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
  value,
}) => {
  console.log(value);
  
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
          onChange={(e) => e.target.files ? onChange(e.target.files[0]) : null}
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
          <Button variant="outlined" component="span">
            ファイルを選択
          </Button>
        )}
      </label>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
