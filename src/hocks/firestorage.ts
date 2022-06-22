import { storage } from "../firebase/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { useState } from "react";

export const useStoragePath = (data: string) => {
  const [path, setPath] = useState("");
  const gsReference = ref(storage, data);
  getDownloadURL(gsReference)
    .then((url) => {
      setPath(url);
    })
    .catch((err) => console.log(err));
  return path
};
