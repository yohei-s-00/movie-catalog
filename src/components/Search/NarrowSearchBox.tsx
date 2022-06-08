import {
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  Divider,
} from "@mui/material";
import { DocumentData } from "firebase/firestore";
import { FC } from "react";
import { SearchTitle } from "../Typography/SearchTitle";

type Props = {
  data: DocumentData;
  handleClose: () => void;
};

export const NarrowSearchBox: FC<Props> = ({ data, handleClose }) => {
  return (
    <>
      <SearchTitle>カテゴリ</SearchTitle>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {data.categories.map((category: string) => (
          <FormControlLabel key={category} control={<Checkbox />} label={category} />
        ))}
      </Box>
      <SearchTitle>尺</SearchTitle>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {data.scales.map((scale: string) => (
          <FormControlLabel key={scale} control={<Checkbox />} label={scale} />
        ))}
      </Box>
      <SearchTitle>比率</SearchTitle>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {data.raitos.map((raito: string)=> (
          <FormControlLabel key={raito} control={<Checkbox />} label={raito} />
        ))}
      </Box>
      <SearchTitle>配信先</SearchTitle>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {data.platforms.map((platform: string)=> (
          <FormControlLabel key={platform} control={<Checkbox />} label={platform} />
        ))}
      </Box>
      <Divider sx={{ marginTop: 3, marginBottom: 2 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Button variant="text">リセット</Button>
        </Box>
        <Box sx={{ display: "flex", columnGap: 2 }}>
          <Button variant="outlined" onClick={() => handleClose()}>
            キャンセル
          </Button>
          <Button variant="contained" onClick={() => handleClose()}>
            検索
          </Button>
        </Box>
      </Box>
    </>
  );
};
