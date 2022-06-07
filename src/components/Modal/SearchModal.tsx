import { Button, Modal, Box, Typography, FormGroup, FormControlLabel, Checkbox, Divider } from "@mui/material";
import { flexbox } from "@mui/system";
import { useState } from "react";
import { SearchTitle } from "../Typography/SearchTitle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <SearchTitle>カテゴリ</SearchTitle>
          <Box sx={{display: 'flex',flexWrap: 'wrap'}}>
            <FormControlLabel
              control={<Checkbox />}
              label="Label"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Label"
            />
          </Box>
          <Typography variant="h5" sx={{borderBottom: 1, marginTop: 2}}>尺</Typography>
          <Box sx={{display: 'flex',flexWrap: 'wrap'}}>
            <FormControlLabel
              control={<Checkbox />}
              label="Label"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Label"
            />
          </Box>
          <Typography variant="h5" sx={{borderBottom: 1, marginTop: 2}}>素材数</Typography>
          <Box sx={{display: 'flex',flexWrap: 'wrap'}}>
            <FormControlLabel
              control={<Checkbox />}
              label="Label"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Label"
            />
          </Box>
          <Divider sx={{marginTop: 3, marginBottom: 2}} />
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Box>
            <Button variant="text">リセット</Button>
            </Box>
            <Box sx={{display: 'flex', columnGap: 2}}>
              <Button variant="outlined" onClick={() => handleClose()}>キャンセル</Button>
              <Button variant="contained" onClick={() => handleClose()}>検索</Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
