import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { getMovie } from "../firebase/firebase-query";

export const useMovieQuery = () => {
  const query = useFirestoreQuery(["movies"], getMovie());
  const { data, isLoading, error } = query;
  return { data, isLoading, error };
};
