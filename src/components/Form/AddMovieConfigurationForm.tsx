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
import { FormValue } from "./AddMovieFormContent";
import { AddMovieFormWrapper } from "./AddMovieFormWrapper";
import { ArrayTextAreaFields } from "./ArrayTextAreaFields";
import { UploadInputField } from "@components/UI/Form/UploadInputField";

type Props = {
  watch: UseFormWatch<FormValue>;
  control: Control<FormValue, any>;
  setValue: UseFormSetValue<FormValue>;
};
type Configuration = {
  scene: number;
  time: string;
  preview: File | null;
  detail: string;
  textAreas: {
    name: string;
    count: number;
  }[];
};

export const AddMovieConfigurationForm: FC<Props> = ({
  watch,
  control,
  setValue,
}) => {
  const [sceneIndex, setSceneIndex] = useState(1);
  const { fields, append, remove, } = useFieldArray(
    {
      control,
      name: "configuration",
    }
  );
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
          name: "",
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
                    name={`configuration.${index}.scene` as const}
                  />
                </TableCell>
                <TableCell align="center">
                  <InputField
                    control={control}
                    name={`configuration.${index}.time` as const}
                  />
                </TableCell>
                <TableCell align="center">
                  <UploadInputField
                    name={`configuration.${index}.preview` as const}
                    accept="image"
                    control={control}
                    setValue={setValue}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ pb: 5 }}>
                    <InputField
                      control={control}
                      label="画像・動画"
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
      <Button onClick={() => handelAppend()}>
        <AddBoxIcon />
        行を追加
      </Button>
    </AddMovieFormWrapper>
  );
};
