import { DefaultValue, selector } from "recoil";
import {
  searchCategoriesAtom,
  searchItemsAtom,
  searchPlatformsAtom,
  searchRaitosAtom,
  searchScalesAtom,
} from "@states/Search/searchAtom";

export const searchListState = selector({
  key: "searchList",
  get: ({ get }) => {
    const categoriesQuery = get(searchCategoriesAtom);
    const platformsQuery = get(searchPlatformsAtom);
    const raitosQuery = get(searchRaitosAtom);
    const scalesQuery = get(searchScalesAtom);
    const query = {
      categories: categoriesQuery,
      platforms: platformsQuery,
      raitos: raitosQuery,
      scales: scalesQuery,
    };
    return query;
  },
  set: ({ reset, set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      reset(searchCategoriesAtom);
      reset(searchPlatformsAtom);
      reset(searchRaitosAtom);
      reset(searchScalesAtom);
      return;
    }
    set(searchItemsAtom, newValue);
  },
});

type keys = {
  [key: string]: string[];
}

export const searchFilterItems = selector({
  key: "searchFilterItems",
  get: ({ get }) => {
    const searchItems = get(searchItemsAtom);
    const keys = Object.keys(searchItems);
    const items: keys = searchItems
    let obj: keys = {};
    keys.forEach((key) => {
      if (!items[key]?.length) {
        return;
      }
      obj[key] = [...items[key]];
    });
    return obj;
  },
});
