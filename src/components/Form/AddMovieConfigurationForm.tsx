import { InputField } from "@components/UI/Form/InputField";
import {
  Box,
  Button,
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
import {
  Control,
  useFieldArray,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { AddMovieFormWrapper } from "./AddMovieFormWrapper";
import { ArrayTextAreaFields } from "./ArrayTextAreaFields";
import { UploadInputField } from "@components/UI/Form/UploadInputField";
import { SelectField } from "@components/UI/Form/SelectField";
import { MovieSchema } from "src/validations/movieInput";
import { RESOLUTION_SIZE } from "src/public/libs/movie";

type Props = {
  watch: UseFormWatch<MovieSchema>;
  control: Control<MovieSchema, any>;
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
      textAreas: [
        {
          text: "",
          count: 0,
        },
      ],
    });
  };
  return (
    <AddMovieFormWrapper title="構成表詳細登録">
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
                  <Box sx={{ pb: 5 }}>
                    <SelectField
                      control={control}
                      label="推奨素材サイズ"
                      items={RESOLUTION_SIZE}
                      name={`configuration.${index}.detail` as const}
                    />
                  </Box>
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
    </AddMovieFormWrapper>
  );
};
