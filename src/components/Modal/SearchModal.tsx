import { Button, Box, Typography } from "@mui/material";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { useState } from "react";
import { getAttibutes } from "../../firebase/firebase-query";
import { NarrowSearchBox } from "../Search/NarrowSearchBox";
import { SearchTitle } from "../Typography/SearchTitle";
import { AppModal } from "./AppModal";

export const SearchModal = () => {
  const [open, setOpen] = useState(false);

  // Moviesのコレクションからデータ取得
  const attributesQuery = useFirestoreQuery(["attributes"], getAttibutes());
  const { data: snapshot, isLoading, error } = attributesQuery;

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
        {snapshot && 
          snapshot.docs.map((doc) => (
            <NarrowSearchBox key={doc.id} handleClose={handleClose} data={doc.data()} />
          ))
        }
      </AppModal>
    </>
  );
};
