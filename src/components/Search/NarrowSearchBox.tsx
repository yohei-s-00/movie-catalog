import { Button, Box, Divider } from "@mui/material";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ChechBoxsField } from "@components/UI/Form/ChechBoxsField";
import { useSearchQuery } from "@hooks/globalstate";
import { SetterOrUpdater } from "recoil";

type Props = {
  data: Attribute;
  handleClose: () => void;
  setSearchItem: SetterOrUpdater<Attribute>
};

const initValue: Attribute = {
  categories: [],
  platforms: [],
  raitos: [],
  scales: [],
};

export const NarrowSearchBox: FC<Props> = ({ data, handleClose, setSearchItem }) => {
  
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
    setSearchItem(data);
    handleClose()
  };
  return (
    <form onSubmit={handleSubmit(handleSearch)}>
      <ChechBoxsField
        label="カテゴリ"
        name="categories"
        control={control}
        items={data.categories}
      />
      <ChechBoxsField
        label="尺"
        name="scales"
        control={control}
        items={data.scales}
      />
      <ChechBoxsField
        label="比率"
        name="raitos"
        control={control}
        items={data.raitos}
      />
      <ChechBoxsField
        label="配信先"
        name="platforms"
        control={control}
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
