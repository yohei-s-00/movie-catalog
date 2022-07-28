import { storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useCallback, useState } from "react";
import { useMutation } from "react-query";

// firbase storage path取得
export const useStoragePath = (data: string) => {
  const [loading, setLoading] = useState(true);
  const [path, setPath] = useState("");
  const gsReference = ref(storage, data);
  console.log(gsReference);
  
  getDownloadURL(gsReference)
    .then((url) => {
      setPath(url);
      setLoading(false);
    })
    .catch((err) => console.log(err));

  return [path, { loading }] as const;
};

// firbase storage アップロード&path取得
export const useAddImageStorage = () => {
  // const [path, setPath] = useState("");
  const mutation = useMutation((newFile: File) => {
    const fileType = newFile.type;
    const fileName = newFile.name
    // setPath(`${fileType}/${fileName}`);
    const path = `${fileType}/${fileName}`
    const gsReference = ref(storage, path);
    const upload = uploadBytes(gsReference, newFile).then((snapshot) => {
      console.log(path);
      return path;
    });
    return upload;
  });

  return mutation;
};
