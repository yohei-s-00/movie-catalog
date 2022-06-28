import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { FC } from "react";
import { SetterOrUpdater } from "recoil";

type Props = {
  label: string;
  options: string[];
  searchItems: string[];
  setSearchItems: SetterOrUpdater<string[]>;
};

export const SearchCheckBoxField: FC<Props> = ({label,options,searchItems,setSearchItems}) => {

  const handleChange = (option: string) => {
    if(searchItems.includes(option)){
      setSearchItems(searchItems.filter((item) => item !== option))
    }else{
      setSearchItems([...searchItems, option])
    }
  }
  return (
    <FormControl>
      <FormLabel>
        {label}
      </FormLabel>
      <FormGroup row>
        {options.map((option,i)=> (
          <FormControlLabel
            control={<Checkbox />}
            key={i} 
            label={option}
            value={option}
            onChange={() => handleChange(option)}
            checked={searchItems.includes(option)}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};
