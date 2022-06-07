import { Box, Grid } from "@mui/material";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { getMovie } from "../../firebase/firebase-query";
import { MovieCard } from "./MovieCard";

export const MovieCardContainer = () => {

  // Moviesのコレクションからデータ取得
  const moviesQuery = useFirestoreQuery(["movies"], getMovie());
  const { data: snapshot, isLoading, error } = moviesQuery;

  return (
    <Grid mt={2} container spacing={2}>
      {snapshot &&
        snapshot.docs.map((doc) => (
          <Grid key={doc.id} item xs={4}>
            <MovieCard data={doc.data()}/>
          </Grid>
        ))}
    </Grid>
  );
};
