import { FormConfiguration } from "@components/Form/AddMovieFormContent";
import { Box, Button } from "@mui/material";
import { usePDF } from "@react-pdf/renderer";
import { FC } from "react";
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
};

export const PDFMovieConfigurationLink: FC<Props> = ({ title,PDFValue }) => {
  const [instance, updateInstance] = usePDF({
    document: <PDFMovieConfiguration formValue={PDFValue} />,
  });
  
  if (instance.loading) return <div>Loading ...</div>;
  if (instance.error) return <div>Something went wrong: {instance.error}</div>;

  return (
    <Box>
      {instance.url && (
        <Button href={instance.url} target="_blank">
          {title}
        </Button>
      )}
    </Box>
  );
};
