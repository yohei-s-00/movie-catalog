import { Button, Box, Typography, Chip } from "@mui/material";
import { useState } from "react";
import { NarrowSearchBox } from "@components/Search/NarrowSearchBox";
import { SearchTitle } from "../UI/Typography/SearchTitle";
import { AppModal } from "./AppModal";
import { useAttibuteQuery } from "@hooks/firestore";
import { useSearchQuery } from "@hooks/globalstate";

export const SearchModal = () => {
  const [open, setOpen] = useState(false);
  const { data, isLoading, error } = useAttibuteQuery();
  const [searchItem, setSearchItem] = useSearchQuery();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", columnGap: 2 }}>
        <Button variant="contained" onClick={handleOpen}>
          絞り込み検索
        </Button>
        <Box>
          {searchItem.categories.map((item) => item && <Chip key={item} label={item} variant="outlined" color="primary" />)}
          {searchItem.platforms.map((item) => item && <Chip key={item} label={item} variant="outlined" color="primary" />)}
          {searchItem.raitos.map((item) => item && <Chip key={item} label={item} variant="outlined" color="primary" />)}
          {searchItem.scales.map((item) =>  item && <Chip key={item} label={item} variant="outlined" color="primary" />)}
        </Box>
      </Box>
      <AppModal open={open} close={handleClose} width={800}>
        {data && 
          data.docs.map((doc) => (
            <NarrowSearchBox key={doc.id} handleClose={handleClose} data={doc.data()} setSearchItem={setSearchItem} />
          ))
        }
      </AppModal>
    </>
  );
};
