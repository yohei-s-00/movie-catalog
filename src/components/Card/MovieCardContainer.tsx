import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { MovieCard } from "./MovieCard";
import { useFilterMovieItem, useMovieItem } from "@hooks/globalstate";

export const MovieCardContainer = () => {
  const [data, isLoading, error] = useMovieItem();
  const filterItem = useFilterMovieItem();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error || !filterItem.length) {
    return (
      <Box sx={{ display: "flex" ,mt: 2}}>
        <Typography>動画が見つかりませんでした。</Typography>
      </Box>
    );
  }
  if (filterItem.length) {
    return (
      <Grid mt={2} container spacing={2}>
        {filterItem.map((doc) => {
          const { id: id, ...data } = doc;
          return (
            <Grid key={id} item xs={4}>
              <MovieCard data={{ id, ...data }} />
            </Grid>
          );
        })}
      </Grid>
    );
  }
  return (
    <Grid mt={2} container spacing={2}>
      {data.map((doc) => {
        const { id: id, ...data } = doc;
        return (
          <Grid key={id} item xs={4}>
            <MovieCard data={{ id, ...data }} />
          </Grid>
        );
      })}
    </Grid>
  );
};
