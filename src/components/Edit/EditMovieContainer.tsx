import { useMovieItem } from "@hooks/globalstate";
import { Box, CircularProgress, Typography } from "@mui/material";
import { MovieDataTabel, TableHeadColms } from "./MovieDataTabel";

export const EditMovieContainer = () => {
  const [data, isLoading, error] = useMovieItem();
  const movieColms: TableHeadColms = [
    { field: "title", headerName: "タイトル", width: 70 },
    { field: "scale", headerName: "尺", width: 70 },
    { field: "materials", headerName: "素材数", width: 70 },
    { field: "raito", headerName: "比率", width: 70 },
    { field: "delete", headerName: "削除", width: 70 },
  ];
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
      <MovieDataTabel data={data} headerColms={movieColms} />
    </div>
  );
};
