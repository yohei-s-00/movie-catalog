import {
  useFirestoreCollectionMutation,
  useFirestoreDocumentDeletion,
  useFirestoreDocumentMutation,
  useFirestoreQuery,
} from "@react-query-firebase/firestore";
import { collection, doc, query, where } from "firebase/firestore";
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
  return mutation;
};

export const useUpdateMovieMutation = (id: string) => {
  const collections = collection(firestore, "movies").withConverter(
    converter<UpdateMovie>()
  );
  const ref = doc(collections, id);
  const mutation = useFirestoreDocumentMutation(ref, {
    merge: true,
  });
  return mutation;
};

export const useDeleteMovieMutation = (id: string) => {
  const collections = collection(firestore, "movies").withConverter(
    converter<Movie>()
  );
  const ref = doc(collections, id);
  const mutation = useFirestoreDocumentDeletion(ref);
  return mutation;
};
