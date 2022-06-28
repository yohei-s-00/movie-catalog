import { storage } from "../firebase/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { useCallback, useState } from "react";

// firbase storage path取得
export const useStoragePath = (data: string) => {
  const [loading, setLoading] = useState(true);
  const [path, setPath] = useState("");
  const gsReference = ref(storage, data);
  getDownloadURL(gsReference)
    .then((url) => {
      setPath(url);
      setLoading(false);
    })
    .catch((err) => console.log(err));

  return [path, { loading }] as const;
};
