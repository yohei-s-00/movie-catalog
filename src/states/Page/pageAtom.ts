import { atom, RecoilState } from "recoil";

export const pageSlugAtom = atom({
  key: 'pageSlug',
  default: '/'
})