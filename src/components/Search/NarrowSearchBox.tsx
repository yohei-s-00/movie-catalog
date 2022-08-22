import { Button, Box, Divider } from "@mui/material";
import { FC, useEffect, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ChechBoxsField } from "@components/UI/Form/ChechBoxsField";
import { SetterOrUpdater } from "recoil";

type Props = {
  data: Attribute;
  handleClose: () => void;
  searchItem: Attribute;
  setSearchItem: SetterOrUpdater<Attribute>;
};

const initValue: Attribute = {
  categories: [],
  platforms: [],
  raitos: [],
  scales: [],
};

export const NarrowSearchBox: FC<Props> = ({
  data,
  handleClose,
  searchItem,
  setSearchItem,
}) => {

  const defaultValues = useMemo(() => {
    return {
      ...searchItem,
    };
  }, [searchItem]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({
    mode: "onSubmit",
    defaultValues: defaultValues,
  });

  const handleReset = () => {
    reset();
    setSearchItem(initValue);
    console.log(searchItem);
  };

  const handleSearch: SubmitHandler<Attribute> = (data) => {
    setSearchItem(data);
    handleClose();
  };

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

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
