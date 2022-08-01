import { atom, RecoilState } from "recoil";

export const movieItemAtom = atom<MovieItem[]>({
  key: "movieItems",
  default: [
    {
      id: "",
      category: [],
      configuration: [
        {
          scene: 0,
          time: 0,
          preview: "",
          detail: "",
          textAreas: [
            {
              name: "",
              count: 0,
            },
          ],
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      dlNumber: 0,
      movie: "",
      platform: [],
      raito: "",
      remarks: "",
      scale: "",
      thumbnail: "",
      title: "",
      materials: 0,
    },
  ],
});
