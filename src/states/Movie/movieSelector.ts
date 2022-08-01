import { searchItemsAtom } from "@states/Search/searchAtom";
import { selector } from "recoil";
import { movieItemAtom } from "./movieAtom";

type isIncludes = {
  <T>(arr: Array<T>, target: Array<T>): boolean;
};

const isIncludes: isIncludes = (arr, target) =>
  arr.some((el) => target.includes(el));

export const filterMovieState = selector({
  key: "filterMovie",
  get: ({ get }) => {
    get(movieItemAtom).filter((item) => {
      const searchQuery = get(searchItemsAtom);
      isIncludes(searchQuery.categories, item.category) &&
        isIncludes(searchQuery.platforms, item.platform) &&
        searchQuery.raitos.includes(item.raito) &&
        searchQuery.scales.includes(item.scale);
    });
  },
});
