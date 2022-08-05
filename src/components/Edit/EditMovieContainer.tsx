import { DataTabel } from "@components/UI/Tabel/DataTabel";
import { useMovieQuery } from "@hooks/firestore";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";

export const EditMovieContainer = () => {
  const { data, isLoading, error } = useMovieQuery();
  const movieColms = [
    {field: 'title', headerName: 'タイトル', width: 70},
    {field: 'scale', headerName: '尺', width: 70},
    {field: 'materials', headerName: '素材数', width: 70},
    {field: 'raito', headerName: '比率', width: 70},
  ]
  // useEffect(() => {
  //   if(data){
  //     const movieRows = data.docs.map((doc) => {
  //       const rows = {
  //         field: '', headerName: '', width: 
  //       }
  //     });
  //   }
  // },[isLoading])
  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Box sx={{ display: "flex", mt: 2 }}>
        <Typography>動画が見つかりませんでした。</Typography>
      </Box>
    );
  }
  return (
    <div>
      {data && <DataTabel/>}
    </div>
  );
};
