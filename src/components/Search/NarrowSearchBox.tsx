import { Button, Box, Divider } from "@mui/material";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ChechBoxsField } from "@components/UI/Form/ChechBoxsField";

type Props = {
  data: Attribute;
  handleClose: () => void;
};

const initValue: Attribute = {
  categories: [],
  platforms: [],
  raitos: [],
  scales: []
}

export const NarrowSearchBox: FC<Props> = ({ data, handleClose }) => {
  const {
    control,
    handleSubmit,
    setError,
    setValue,
    getValues,
    watch,
    reset,
    formState: { isValid },
  } = useForm({
    mode: "onSubmit",
    defaultValues: initValue,
  });
  const handleReset = () => {
    reset();
  };
  const handleSearch: SubmitHandler<Attribute> = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(handleSearch)}>
      <ChechBoxsField
        label="カテゴリ"
        name="categories"
        items={data.categories}
      />
      <ChechBoxsField
        label="尺"
        name="scales"
        items={data.scales}
      />
      <ChechBoxsField
        label="比率"
        name="raitos"
        items={data.raitos}
      />
      <ChechBoxsField
        label="配信先"
        name="platforms"
        items={data.platforms}
      />
      <Divider sx={{ marginTop: 3, marginBottom: 2 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Button variant="text" onClick={() => handleReset()}>
            リセット
          </Button>
        </Box>
        <Box sx={{ display: "flex", columnGap: 2 }}>
          <Button variant="outlined" onClick={() => handleClose()}>
            キャンセル
          </Button>
          <Button variant="contained" type="submit">
            検索
          </Button>
        </Box>
      </Box>
    </form>
  );
};
