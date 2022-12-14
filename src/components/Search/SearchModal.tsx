import { Button, Box, Chip } from "@mui/material";
import { useState } from "react";
import { NarrowSearchBox } from "@components/Search/NarrowSearchBox";
import { AppModal } from "@components/UI/Modal/AppModal";
import { useAttibuteQuery } from "@hooks/firestore";
import { useSearchQuery } from "@hooks/globalstate";

export const SearchModal = () => {
  const [open, setOpen] = useState(false);
  const [ attributes, isLoading, error ] = useAttibuteQuery();
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
          {searchItem.categories.map(
            (item) =>
              item && (
                <Chip
                  key={item}
                  label={item}
                  variant="outlined"
                  color="primary"
                />
              )
          )}
          {searchItem.platforms.map(
            (item) =>
              item && (
                <Chip
                  key={item}
                  label={item}
                  variant="outlined"
                  color="primary"
                />
              )
          )}
          {searchItem.raitos.map(
            (item) =>
              item && (
                <Chip
                  key={item}
                  label={item}
                  variant="outlined"
                  color="primary"
                />
              )
          )}
          {searchItem.scales.map(
            (item) =>
              item && (
                <Chip
                  key={item}
                  label={item}
                  variant="outlined"
                  color="primary"
                />
              )
          )}
        </Box>
      </Box>
      <AppModal open={open} close={handleClose} width={800}>
        {attributes && (
          <NarrowSearchBox
            handleClose={handleClose}
            data={attributes}
            setSearchItem={setSearchItem}
            searchItem={searchItem}
          />
        )}
      </AppModal>
    </>
  );
};
