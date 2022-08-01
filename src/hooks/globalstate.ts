import { LoginAtom } from "@states/Auth/LoginAtom";
import { movieItemAtom } from "@states/Movie/movieAtom";
import { filterMovieState } from "@states/Movie/movieSelector";
import { FirestoreError } from "firebase/firestore";
import { useEffect, useState } from "react";

import { SetterOrUpdater, useRecoilState, useRecoilValue } from "recoil";
import { useMovieQuery } from "./firestore";

export const useIsLogin = (): [boolean, SetterOrUpdater<boolean>] => {
  const [isLogin, setIsLogin] = useRecoilState<boolean>(LoginAtom);
  return [isLogin, setIsLogin];
};

export const useMovieItem = (): [
  MovieItem[],
  boolean,
  FirestoreError | null
] => {
  const { data, isLoading, error } = useMovieQuery();
  const [loading,setLoading] = useState(isLoading)
  const [moveiItem, setMovieItem] = useRecoilState(movieItemAtom);
  useEffect(() => {
    if(data){
      const movie = data.docs.map((doc) => {
        const id = doc.id
        const item = doc.data()
        return {id: id ,...item}
      })
      setMovieItem(movie)
      setLoading(false)
    }
  },[isLoading])
  return [moveiItem, loading, error];
};

export const useFilterMovieItem = () => {
  const moveiItem = useRecoilValue(filterMovieState);
  return moveiItem;
};
