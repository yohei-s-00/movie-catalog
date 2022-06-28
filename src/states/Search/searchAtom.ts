import { atom, RecoilState } from "recoil";

export const searchItemsAtom = atom<Attribute>({
  key: "searchItems",
  default: {
    categories: [],
    platforms: [],
    raitos: [],
    scales: [],
  },
});

export const searchCategoriesAtom = atom<string[]>({
  key: "searchCategories",
  default: [],
});
export const searchPlatformsAtom = atom<string[]>({
  key: "searchPlatforms",
  default: [],
});
export const searchRaitosAtom = atom<string[]>({
  key: "searchRaitos",
  default: [],
});
export const searchScalesAtom = atom<string[]>({
  key: "searchScales",
  default: [],
});
