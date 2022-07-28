import {
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import MUISelect, { SelectProps } from "@mui/material/Select/Select";
import { FC, ReactNode, useState } from "react";

export type SlectFieldProps = {
  label?: string;
  items: string[];
};

type Props = SlectFieldProps & {
  value: string;
  onChange: (...event: any[]) => void;
};

export const Select: FC<Props> = ({ label, items, value, onChange }) => {
  return (
    <FormControl variant="standard" fullWidth>
      {label && <FormLabel>{label}</FormLabel>}
      <MUISelect fullWidth label={label} onChange={onChange} value={value}>
        <MenuItem value="" disabled>
          <em>選択してください</em>
        </MenuItem>
        {items.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </MUISelect>
    </FormControl>
  );
};
