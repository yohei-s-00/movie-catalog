import { useStoragePath } from "@hooks/firestorage";
import { Image,StyleSheet, } from "@react-pdf/renderer";
import { FC } from "react";

const styles = StyleSheet.create({
  image: {
    width: "100%",
    maxWidth: "100%",
    height: "auto"
  }
})

type Props = {
  src : string;
}

export const PDFImage: FC<Props> = ({src}) => {
  const [videoPath, { loading }] = useStoragePath(src);
  return (
      <Image
        style={styles.image}
        src={videoPath}
      />
  );
};
