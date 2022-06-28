import { atom, RecoilState } from "recoil";

export const movieItemAtom = atom<MovieItem[]>({
  key: "movieItems",
  default: [
    {
      id: "",
      category: [],
      configuration: {
        src: "",
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      dlNumber: 0,
      movie: {
        src: "",
      },
      platform: [],
      raito: "",
      remarks: 0,
      scale: "",
      thumbnail: "",
      title: "",
    },
  ],
});

export const currentMovieItemAtom = atom<MovieItem[]>({
  key: "currentMovieItems",
  default: [
    {
      id: "",
      category: [],
      configuration: {
        src: "",
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      dlNumber: 0,
      movie: {
        src: "",
      },
      platform: [],
      raito: "",
      remarks: 0,
      scale: "",
      thumbnail: "",
      title: "",
    },
  ],
});
