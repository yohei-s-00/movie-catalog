import { storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useCallback, useState } from "react";
import { useMutation } from "react-query";

// firbase storage path取得
export const useStoragePath = (data: string) => {
  const [loading, setLoading] = useState(true);
  const [path, setPath] = useState("");
  const gsReference = ref(storage, data);
  async function getUrl() {
    if (data) {
      await getDownloadURL(gsReference)
        .then((url) => {
          setPath(url);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }
  getUrl();
  return [path, { loading }] as const;
};

// firbase storage アップロード&path取得
export const useAddImageStorage = () => {
  const mutation = useMutation((newFile: File) => {
    const fileType = newFile.type;
    const fileName = newFile.name;
    const id = Math.random().toString(32).substring(2);
    const path = `${fileType}/${id}/${fileName}`;
    const gsReference = ref(storage, path);
    const upload = uploadBytes(gsReference, newFile).then((snapshot) => {
      return path;
    });
    return upload;
  });

  return mutation;
};
