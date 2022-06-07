import {
  Button,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { SearchTitle } from "../Typography/SearchTitle";
import { AppModal } from "./AppModal";

export const SearchModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", columnGap: 2 }}>
        <Button variant="outlined" onClick={handleOpen}>
          絞り込み検索
        </Button>
        <Typography>1760件</Typography>
      </Box>
      <AppModal open={open} close={handleClose} width={500}>
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
      </AppModal>
    </>
  );
};
