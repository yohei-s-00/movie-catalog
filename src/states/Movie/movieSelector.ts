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
  get: ({ get }) =>
    get(movieItemAtom).filter((item) => {
      const searchQuery = get(searchItemsAtom);
      function searchMovie() {
        let search = true;
        if (searchQuery.categories.length) {
          search = isIncludes(searchQuery.categories, item.category);
          if (search === false) {
            return false;
          }
        }
        if (searchQuery.platforms.length) {
          search = isIncludes(searchQuery.platforms, item.platform);
          if (search === false) {
            return false;
          }
        }
        if (searchQuery.raitos.length) {
          search = searchQuery.raitos.includes(item.raito);
          if (search === false) {
            return false;
          }
        }
        if (searchQuery.scales.length) {
          search = searchQuery.scales.includes(item.scale);
          if (search === false) {
            return false;
          }
        }
        return search;
      }
      return searchMovie();
    }),
});
