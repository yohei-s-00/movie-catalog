import { FormControl, FormHelperText, FormLabel, MenuItem } from "@mui/material";
import MUISelect from "@mui/material/Select/Select";
import { FC } from "react";

export type SlectFieldProps = {
  label?: string;
  items: string[];
  error?: string
};

type Props = SlectFieldProps & {
  value: string;
  onChange: (...event: any[]) => void;
};

export const Select: FC<Props> = ({ label, items, error, value, onChange }) => {
  return (
    <FormControl variant="standard" fullWidth>
      {label && <FormLabel>{label}</FormLabel>}
      <MUISelect fullWidth label={label} onChange={onChange} value={value}>
        <MenuItem value="">
          <em>選択してください</em>
        </MenuItem>
        {items.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </MUISelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
