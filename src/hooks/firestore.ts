import {
  useFirestoreCollectionMutation,
  useFirestoreQuery,
} from "@react-query-firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import { useMemo, useCallback } from "react";
import { firestore } from "src/firebase/firebase";
import { converter } from "../firebase/firestore";

export const useMovieQuery = () => {
  const ref = query(collection(firestore, "movies")).withConverter(
    converter<Movie>()
  );
  const q = useFirestoreQuery<Movie>(["movies"], ref);
  const { data, isLoading, error } = q;

  return { data, isLoading, error };
};

export const useAttibuteQuery = () => {
  const ref = query(collection(firestore, "attributes")).withConverter(
    converter<Attribute>()
  );
  const q = useFirestoreQuery<Attribute>(["attributes"], ref);
  const { data, isLoading, error } = q;
  return { data, isLoading, error };
};

export const useMovieMutation = () => {
  const ref = collection(firestore, "movies").withConverter(converter<Movie>());
  const mutation = useFirestoreCollectionMutation(ref);
  // const { mutation, isLoading, error } = mutation;
  return mutation;
};
