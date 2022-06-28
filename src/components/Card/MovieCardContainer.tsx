import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useMovieQuery } from "@hooks/firestore";
import { MovieCard } from "./MovieCard";
import { useMovieItem, useSearchItem } from "@hooks/globalstate";

export const MovieCardContainer = () => {
  // const [data, isLoading, error] = useMovieItem();
  const { data, isLoading, error } = useMovieQuery()

  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Box sx={{ display: "flex" }}>
        <Typography>動画が見つかりませんでした。</Typography>
      </Box>
    );
  }
  return (
    <Grid mt={2} container spacing={2}>
      {data &&
        data.docs.map((doc) => (
          <Grid key={doc.id} item xs={4}>
            <MovieCard data={doc.data()} />
          </Grid>
        ))}
    </Grid>
  );
};
