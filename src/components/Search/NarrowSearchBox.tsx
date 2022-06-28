import { Button, Box, Divider } from "@mui/material";
import { DocumentData } from "firebase/firestore";
import { FC } from "react";
import { SearchCheckBoxField } from "@components/Search/SearchCheckBoxField";
import {
  useResetSearchItem,
  useSearchCategoriesItem,
  useSearchPlatformsItem,
  useSearchRaitosItem,
  useSearchScalesItem,
  useSetSearchItem,
} from "@hooks/globalstate";

type Props = {
  data: DocumentData;
  handleClose: () => void;
};

export const NarrowSearchBox: FC<Props> = ({ data, handleClose }) => {
  const [
    searchCategoriesItems,
    setSearchCategoriesItems,
  ] = useSearchCategoriesItem();
  const [
    searchPlatformsItems,
    setSearchPlatformsItems,
  ] = useSearchPlatformsItem();
  const [searchRaitosItems, setSearchRaitosItems] = useSearchRaitosItem();
  const [searchScalesItems, setSearchScalesItems] = useSearchScalesItem();
  const [item, setItems] = useSetSearchItem();
  const resetItems = useResetSearchItem();
  const handleReset = () => {
    resetItems();
  };
  const obj = {
    categories: searchCategoriesItems,
    platforms: searchPlatformsItems,
    raitos: searchRaitosItems,
    scales: searchScalesItems,
  };
  const handleSearch = () => {
    setItems({...obj});
    handleClose();
  };
  return (
    <Box>
      <SearchCheckBoxField
        label="カテゴリ"
        options={data.categories}
        searchItems={searchCategoriesItems}
        setSearchItems={setSearchCategoriesItems}
      />
      <SearchCheckBoxField
        label="尺"
        options={data.scales}
        searchItems={searchScalesItems}
        setSearchItems={setSearchScalesItems}
      />
      <SearchCheckBoxField
        label="比率"
        options={data.raitos}
        searchItems={searchRaitosItems}
        setSearchItems={setSearchRaitosItems}
      />
      <SearchCheckBoxField
        label="配信先"
        options={data.platforms}
        searchItems={searchPlatformsItems}
        setSearchItems={setSearchPlatformsItems}
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
          <Button variant="contained" onClick={() => handleSearch()}>
            検索
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
