import { InputField } from "@components/UI/Form/InputField";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { FC, useState } from "react";
import { Control, FieldValues, useFieldArray, UseFormWatch } from "react-hook-form";
import { ArrayTextAreaFields } from "./ArrayTextAreaFields";
import { UploadInputField } from "@components/UI/Form/UploadInputField";
import { SelectField } from "@components/UI/Form/SelectField";
import { MovieInputSchema, MovieItemSchema, MovieSchema } from "src/validations/movieInput";
import { RESOLUTION_IMAGE } from "src/public/libs/movie";
import { FormWrapper } from "@components/UI/Form/FormWrapper";

type Props = {
  watch: UseFormWatch<MovieInputSchema>;
  control: Control<MovieInputSchema>;
};

export const AddMovieConfigurationForm: FC<Props> = ({ control, watch }) => {
  const [sceneIndex, setSceneIndex] = useState(1);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "configuration",
  });
  const watchFieldArray = watch("configuration");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });
  const handleRemove = (index: number) => {
    remove(index);
    setSceneIndex(index);
  };
  const handelAppend = () => {
    setSceneIndex((initValue) => initValue + 1);
    append({
      scene: sceneIndex + 1,
      time: 0,
      preview: null,
      detail: "",
      imgVolume: 0,
      textAreas: [
        {
          text: "",
          count: 0,
        },
      ],
    });
  };
  return (
    <FormWrapper title="構成表詳細登録">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ width: 80 }}>
                シーンNo
              </TableCell>
              <TableCell align="center" sx={{ width: 150 }}>
                Time
              </TableCell>
              <TableCell align="center" sx={{ width: 200 }}>
                画面プレビュー
              </TableCell>
              <TableCell align="center">必要な素材</TableCell>
              <TableCell align="center" sx={{ width: 80 }}>
                削除
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {controlledFields.map((field, index) => (
              <TableRow key={field.id}>
                <TableCell align="center">
                  <InputField
                    control={control}
                    type="number"
                    name={`configuration.${index}.scene` as const}
                  />
                </TableCell>
                <TableCell align="center">
                  <InputField
                    control={control}
                    type="number"
                    name={`configuration.${index}.time` as const}
                  />
                </TableCell>
                <TableCell align="center">
                  <UploadInputField
                    name={`configuration.${index}.preview` as const}
                    accept="image"
                    control={control}
                  />
                </TableCell>
                <TableCell>
                  <Grid sx={{ pb: 5 }} container spacing={2}>
                    <Grid item xs={9}>
                      <SelectField
                        control={control}
                        label="推奨素材サイズ"
                        items={RESOLUTION_IMAGE}
                        name={`configuration.${index}.detail` as const}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <InputField
                        control={control}
                        label="画像素材数"
                        type="number"
                        name={`configuration.${index}.imgVolume` as const}
                      />
                    </Grid>
                  </Grid>
                  <ArrayTextAreaFields
                    control={control}
                    watch={watch}
                    nestIndex={index}
                  />
                </TableCell>
                <TableCell align="center">
                  {index > 0 && (
                    <IconButton
                      onClick={() => handleRemove(index)}
                      size="small"
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button sx={{ mt: 2 }} variant="outlined" onClick={() => handelAppend()}>
        <AddBoxIcon />
        行を追加
      </Button>
    </FormWrapper>
  );
};
