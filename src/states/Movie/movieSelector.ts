import { collection, getDocs } from "firebase/firestore";
import { DefaultValue, selector } from "recoil";
import { firestore } from "src/firebase/firebase";

export const movieItemState = selector({
  key: "movieItem",
  get: async ({ get }) => {
    const ref = collection(firestore, "movie");
    const response = await getDocs(ref).then((querySnapshot) => {
      querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    });
    return response;
  },
});
