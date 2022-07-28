import { Button, Box, Typography } from "@mui/material";
import { useState } from "react";
import { NarrowSearchBox } from "@components/Search/NarrowSearchBox";
import { SearchTitle } from "../UI/Typography/SearchTitle";
import { AppModal } from "./AppModal";
import { useAttibuteQuery } from "@hooks/firestore";

export const SearchModal = () => {
  const [open, setOpen] = useState(false);

  const { data, isLoading, error } = useAttibuteQuery();

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
        {/* <Typography>1760件</Typography> */}
      </Box>
      <AppModal open={open} close={handleClose} width={800}>
        {data && 
          data.docs.map((doc) => (
            <NarrowSearchBox key={doc.id} handleClose={handleClose} data={doc.data()} />
          ))
        }
      </AppModal>
    </>
  );
};
