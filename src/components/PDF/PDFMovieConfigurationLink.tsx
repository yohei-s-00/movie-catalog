import { FormConfiguration } from "@components/Form/AddMovieFormContent";
import { Box, Button } from "@mui/material";
import { usePDF } from "@react-pdf/renderer";
import { FirestoreError, increment, WithFieldValue } from "firebase/firestore";
import { FC } from "react";
import { UseMutateFunction } from "react-query";
import { PDFMovieConfiguration } from "./PDFMovieConfiguration";

type Props = {
  title: string;
  PDFValue: {
    title: string;
    category: string[];
    platform: string[];
    raito: string;
    scale: string;
    thumbnail: File | null | string;
    movie: File | null | string;
    configuration: FormConfiguration[];
  };
  mutate?: UseMutateFunction<
    void,
    FirestoreError,
    WithFieldValue<UpdateMovie>,
    unknown
  >;
};

export const PDFMovieConfigurationLink: FC<Props> = ({
  title,
  PDFValue,
  mutate,
}) => {
  const [instance, updateInstance] = usePDF({
    document: <PDFMovieConfiguration formValue={PDFValue} />,
  });
  const handleIncrement = () => {
    if (mutate) {
      mutate({
        dlNumber: increment(1),
      });
    }
  };
  if (instance.loading) return <div>Loading ...</div>;
  if (instance.error) return <div>Something went wrong: {instance.error}</div>;

  return (
    <Box>
      {instance.url && (
        <Button
          href={instance.url}
          target="_blank"
          onClick={() => handleIncrement()}
        >
          {title}
        </Button>
      )}
    </Box>
  );
};
