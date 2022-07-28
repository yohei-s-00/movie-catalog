import { InputField } from "@components/UI/Form/InputField";
import { Grid, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";
import { Control, useFieldArray, UseFormWatch } from "react-hook-form";
import { FormValue } from "./AddMovieFormContent";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddBoxIcon from '@mui/icons-material/AddBox';

type Props = {
  control: Control<FormValue, any>;
  watch: UseFormWatch<FormValue>;
  nestIndex: number;
};

export const ArrayTextAreaFields: FC<Props> = ({
  control,
  watch,
  nestIndex,
}) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `configuration.${nestIndex}.textAreas`,
  });
  const watchFieldArray = watch(`configuration.${nestIndex}.textAreas`);
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });
  const handleRemove = (index: number) => {
    remove(index);
  };
  const handelAppend = () => {
    append({
      name: "",
      count: 0,
    });
  };
  return (
    <Box>
      {controlledFields.map((item, k) => (
        <Grid sx={{ pb: 5 }} container spacing={2} key={item.id}>
          <Grid item xs={9}>
            <InputField
              control={control}
              label="タイトル"
              name={`configuration.${nestIndex}.textAreas.${k}.name` as const}
            />
          </Grid>
          <Grid item xs={2}>
            <InputField
              control={control}
              label="文字数"
              name={`configuration.${nestIndex}.textAreas.${k}.count` as const}
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => handelAppend()} size="small" color="primary">
              <AddBoxIcon />
            </IconButton>
            {k > 0 && (
              <IconButton onClick={() => handleRemove(k)} size="small">
                <DeleteForeverIcon />
              </IconButton>
            )}
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};
