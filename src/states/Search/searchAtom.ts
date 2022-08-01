import { atom } from "recoil";

export const searchItemsAtom = atom<Attribute>({
  key: "searchItems",
  default: {
    categories: [],
    platforms: [],
    raitos: [],
    scales: [],
  },
});
