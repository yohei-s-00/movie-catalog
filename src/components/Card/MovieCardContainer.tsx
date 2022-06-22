import { Box, Grid } from "@mui/material";
import { useMovieQuery } from "../../hocks/firestore";
import { MovieCard } from "./MovieCard";

export const MovieCardContainer = () => {
  const { data, isLoading, error } = useMovieQuery();

  return (
    <Grid mt={2} container spacing={2}>
      {data &&
        data.docs.map((doc) => (
          <Grid key={doc.id} item xs={4}>
            <MovieCard data={doc.data()}/>
          </Grid>
        ))}
    </Grid>
  );
};
