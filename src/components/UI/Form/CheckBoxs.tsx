import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { ChangeEvent, FC, useState } from "react";

export type CheckBoxProps = {
  items: string[];
  label?: string;
};

type Props = CheckBoxProps & {
  value: string[];
  onChange: (...event: any[]) => void;
};

export const CheckBoxs: FC<Props> = ({ items, label, onChange, value }) => {
  const [values, setValues] = useState<(string | null)[]>(value || []);
  const handleChenge = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const valueCopy = [...values];
    valueCopy[index] = e.target.checked ? e.target.value : null;
    const filterValue = valueCopy.map((val) => {
      if(val === undefined){
        return null
      }
      return val;
    });
    onChange(filterValue);
    setValues(filterValue);
  };
  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <FormGroup row>
        {items.map((item, index) => (
          <FormControlLabel
            key={item}
            label={item}
            control={
              <Checkbox
                value={item}
                onChange={(e) => handleChenge(e, index)}
                checked={values.includes(item)}
              />
            }
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};
