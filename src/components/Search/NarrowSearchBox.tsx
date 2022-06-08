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
  data: DocumentData
  handleClose: () => void
}

export const NarrowSearchBox: FC<Props> = ({data,handleClose}) => {
  return (
    <>
      <SearchTitle>カテゴリ</SearchTitle>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <FormControlLabel control={<Checkbox />} label="Label" />
        <FormControlLabel control={<Checkbox />} label="Label" />
      </Box>
      <SearchTitle>尺</SearchTitle>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <FormControlLabel control={<Checkbox />} label="Label" />
        <FormControlLabel control={<Checkbox />} label="Label" />
      </Box>
      <SearchTitle>素材数</SearchTitle>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <FormControlLabel control={<Checkbox />} label="Label" />
        <FormControlLabel control={<Checkbox />} label="Label" />
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
