import {
  useFirestoreCollectionMutation,
  useFirestoreDocument,
  useFirestoreDocumentDeletion,
  useFirestoreDocumentMutation,
  useFirestoreQuery,
  useFirestoreQueryData,
} from "@react-query-firebase/firestore";
import {
  collection,
  doc,
  query,
  orderBy,
  FirestoreError,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "src/firebase/firebase";
import { converter } from "../firebase/firestore";

export const useMovieQuery = () => {
  const ref = query(
    collection(firestore, "movies"),
    orderBy("createdAt", "desc")
  ).withConverter(converter<Movie>());
  const q = useFirestoreQuery<Movie>(["movies"], ref);
  const { data, isLoading, error } = q;
  return { data, isLoading, error };
};

export const useGetMovieQuery = (id: string | undefined) => {
  const [movie, setMovie] = useState<Movie>();
  if (id) {
    const ref = doc(firestore, "movies", id).withConverter(converter<Movie>());
    const q = useFirestoreDocument<Movie>(["movies", id], ref);
    const { data, isLoading, error } = q;
    useEffect(() => {
      if (data) {
        const movieItem = data.data();
        if (movieItem) {
          setMovie(movieItem);
        }
      }
    }, [isLoading]);
    return { movie, isLoading, error };
  } else {
    const isLoading = true;
    const error = "動画がありません。";
    return { movie, isLoading, error };
  }
};

export const useAttibuteQuery = (): [
  Attribute | undefined,
  boolean,
  FirestoreError | null
] => {
  const [attributes, setAttributes] = useState<Attribute>();
  const ref = query(collection(firestore, "attributes")).withConverter(
    converter<Attribute>()
  );
  const q = useFirestoreQuery<Attribute>(["attributes"], ref);
  const { data, isLoading, error } = q;
  useEffect(() => {
    if (data) {
      data.docs.map((item) => {
        const data = item.data();
        setAttributes(data);
      });
    }
  }, [isLoading]);
  return [attributes, isLoading, error];
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
