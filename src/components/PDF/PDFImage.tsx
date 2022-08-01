import { useStoragePath } from "@hooks/firestorage";
import { Image } from "@react-pdf/renderer";
import { FC } from "react";

type Props = {
  src : string;
}

export const PDFImage: FC<Props> = ({src}) => {
  const [videoPath, { loading }] = useStoragePath(src);
  return (
    <>
      <Image
        style={{ maxWidth: "100%" }}
        src={videoPath}
      />
    </>
  );
};
