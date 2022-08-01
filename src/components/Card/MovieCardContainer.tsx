import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { MovieCard } from "./MovieCard";
import { useFilterMovieItem, useMovieItem } from "@hooks/globalstate";

export const MovieCardContainer = () => {
  const [data, isLoading, error] = useMovieItem();
  // const filterItem = useFilterMovieItem()
  // console.log(filterItem);
  
  
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
      {data.map((doc) => {
        const { id: id, ...data } = doc;
        return (
          <Grid key={id} item xs={4}>
            <MovieCard data={{id,...data}} />
          </Grid>
        );
      })}
    </Grid>
  );
};
