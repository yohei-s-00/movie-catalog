import { async } from "@firebase/util";
import { movieItemAtom } from "@states/Movie/movieAtom";
import {
  searchCategoriesAtom,
  searchItemsAtom,
  searchPlatformsAtom,
  searchRaitosAtom,
  searchScalesAtom,
} from "@states/Search/searchAtom";
import {
  searchFilterItems,
  searchListState,
} from "@states/Search/searchSelector";
import { collection, FirestoreError, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  SetterOrUpdater,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { firestore } from "src/firebase/firebase";
import { useMovieQuery } from "./firestore";

export const useMovieItem = (): [MovieItem[] | undefined, boolean, FirestoreError | null] => {
  const [movie, setMovie] = useState<MovieItem[]>();
  const { data, isLoading, error } = useMovieQuery();
  const getItems = () => {
    data?.docs.map((doc) => {
      setMovie([{ id: doc.id, ...doc.data() }]);
    });
  };
  getItems();
  return [movie, isLoading, error];
};

export const useSearchCategoriesItem = (): [
  string[],
  SetterOrUpdater<string[]>
] => {
  const [searchCategoriesItems, setSearchCategoriesItems] = useRecoilState(
    searchCategoriesAtom
  );
  return [searchCategoriesItems, setSearchCategoriesItems];
};

export const useSearchPlatformsItem = (): [
  string[],
  SetterOrUpdater<string[]>
] => {
  const [searchPlatformsItems, setSearchPlatformsItems] = useRecoilState(
    searchPlatformsAtom
  );
  return [searchPlatformsItems, setSearchPlatformsItems];
};

export const useSearchRaitosItem = (): [
  string[],
  SetterOrUpdater<string[]>
] => {
  const [searchRaitosItems, setSearchRaitosItems] = useRecoilState(
    searchRaitosAtom
  );
  return [searchRaitosItems, setSearchRaitosItems];
};

export const useSearchScalesItem = (): [
  string[],
  SetterOrUpdater<string[]>
] => {
  const [searchScalesItems, setSearchScalesItems] = useRecoilState(
    searchScalesAtom
  );
  return [searchScalesItems, setSearchScalesItems];
};

export const useResetSearchItem = () => {
  const resetItems = useResetRecoilState(searchListState);
  return resetItems;
};
export const useSetSearchItem = (): [Attribute, SetterOrUpdater<Attribute>] => {
  const [item, setItems] = useRecoilState(searchListState);
  return [item, setItems];
};

export const useSearchItem = () => {
  const searchItem = useRecoilValue(searchFilterItems);

  return searchItem;
};
