import { useSteps } from "@hooks/libs";
import {
  Box,
  Button,
  Container,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddMovieConfigurationForm } from "./AddMovieConfigurationForm";
import { AddMovieConfilmForm } from "./AddMovieConfilmForm";
import { AddMovieDetailForm } from "./AddMovieDetailForm";
import { useAttibuteQuery, useMovieMutation } from "@hooks/firestore";
import { zodResolver } from "@hookform/resolvers/zod";
import { movieSchema, MovieSchema } from "src/validations/movieInput";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import { useAddImageStorage } from "@hooks/firestorage";
import { serverTimestamp } from "firebase/firestore";
import { PaperContainer } from "@components/UI/Box/PaperContainer";
import CircularProgress from "@mui/material/CircularProgress";

export type FormConfiguration = {
  scene: number;
  time: number;
  preview: File | null | string;
  detail?: string;
  textAreas: {
    text?: string;
    count?: number;
  }[];
};

export type FormValue = {
  title: string;
  category: string[];
  platform: string[];
  raito: string;
  scale: string;
  materials: number;
  thumbnail: File | null | string;
  movie: File | null | string;
  configuration: FormConfiguration[];
};

const formDefaultValue: MovieSchema = {
  title: "",
  category: [""],
  platform: [""],
  raito: "",
  scale: "",
  materials: 0,
  remarks: "",
  thumbnail: null,
  movie: null,
  configuration: [
    {
      scene: 1,
      time: 0,
      preview: null,
      detail: "",
      textAreas: [
        {
          text: "",
          count: 0,
        },
      ],
    },
  ],
};
const stepItems = ["動画詳細登録", "構成表詳細登録", "確認"];

export const AddMovieFormContent = () => {
  const { data, isLoading, error } = useAttibuteQuery();
  const mutation = useMovieMutation();
  const storageMutate = useAddImageStorage();
  const [step, next, back] = useSteps(0);
  const {
    control,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(movieSchema),
    defaultValues: formDefaultValue,
  });
  console.log(errors);

  const onSubmit: SubmitHandler<MovieSchema> = (data) => {
    const detailItems = data.configuration.map((item) => {
      return item.detail;
    });
    const detailNumber = detailItems.length;
    const getFilePaths = () => {
      async function getFilePath() {
        const addThumbnailFile = await storageMutate.mutateAsync(
          data.thumbnail as File
        );
        const addMovieFile = await storageMutate.mutateAsync(
          data.movie as File
        );
        return { thumbnail: addThumbnailFile, movie: addMovieFile };
      }
      const filePath = getFilePath().then((result) => {
        return result;
      });
      return filePath;
    };
    const addConfiguration = data.configuration.map(
      (conf): Configuration => {
        async function getFilePath() {
          const addFile = await storageMutate.mutateAsync(conf.preview as File);
          return addFile;
        }
        getFilePath().then((result) => {
          conf.preview = result;
        });
        return conf as Configuration;
      }
    );
    async function mutateMovie() {
      const filePaths = await getFilePaths();
      try {
        await mutation.mutateAsync({
          title: data.title,
          category: data.category.filter((item) => item !== ""),
          platform: data.platform.filter((item) => item !== ""),
          raito: data.raito,
          scale: data.scale,
          thumbnail: filePaths.thumbnail,
          movie: filePaths.movie,
          configuration: addConfiguration,
          dlNumber: 0,
          materials: detailNumber,
          remarks: "",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } catch (e) {
        console.error(e);
      }
    }
    mutateMovie();
  };
  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);

        try {
          onSubmit(data);
        } catch (e) {
          console.error(e);
        }
      })}
    >
      <PaperContainer title="コンテンツ登録">
        <Stepper activeStep={step}>
          {stepItems.map((item) => (
            <Step key={item}>
              <StepLabel>{item}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box>
          {step === 0 &&
            data &&
            data.docs.map((doc) => (
              <AddMovieDetailForm
                control={control}
                key={doc.id}
                data={doc.data()}
              />
            ))}
          {step === 1 && (
            <AddMovieConfigurationForm control={control} watch={watch} />
          )}
          {step === 2 && <AddMovieConfilmForm getValues={getValues} />}
        </Box>
        <Box textAlign={"right"}>
          {step >= 1 && (
            <Button onClick={back}>
              <UndoIcon />
              戻る
            </Button>
          )}
          {step <= 1 && (
            <Button onClick={next}>
              次へ
              <RedoIcon />
            </Button>
          )}
        </Box>
      </PaperContainer>
      <Container maxWidth="lg">
        <Button variant="contained" type="submit">
          {mutation.isLoading ? <CircularProgress /> : "コンテンツ新規追加"}
        </Button>
      </Container>
    </form>
  );
};
