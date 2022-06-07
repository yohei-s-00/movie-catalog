import { Box, Grid } from "@mui/material"
import { MovieCard } from "./MovieCard"

export const MovieCardContainer = () => {
  return(
    <Grid mt={2} container spacing={2}>
      <Grid item xs={4}>
        <MovieCard />
      </Grid>
      <Grid item xs={4}>
        <MovieCard />
      </Grid>
      <Grid item xs={4}>
        <MovieCard />
      </Grid>
    </Grid>
  )
}