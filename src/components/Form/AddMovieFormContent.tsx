import { useSteps } from "@hooks/libs";
import { Box, Button, Step,  StepLabel, Stepper } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddMovieConfigurationForm } from "./AddMovieConfigurationForm";
import { AddMovieConfilmForm } from "./AddMovieConfilmForm";
import { AddMovieDetailForm } from "./AddMovieDetailForm";
import { useAttibuteQuery, useMovieMutation } from "@hooks/firestore";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "src/validations/movieInput";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import { useAddImageStorage } from "@hooks/firestorage";
import { serverTimestamp } from "firebase/firestore";
import { PaperContainer } from "@components/UI/Box/PaperContainer";

export type FormConfiguration = {
  scene: number;
  time: number;
  preview: File | null | string;
  detail: string;
  textAreas: {
    name: string;
    count: number;
  }[];
};

export type FormValue = {
  title: string;
  category: string[];
  platform: string[];
  raito: string;
  scale: string;
  thumbnail: File | null | string;
  movie: File | null | string;
  configuration: FormConfiguration[];
};

const formDefaultValue: FormValue = {
  title: "",
  category: [],
  platform: [],
  raito: "",
  scale: "",
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
          name: "",
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
    setError,
    setValue,
    getValues,
    watch,
    formState: { isValid },
  } = useForm({
    mode: "onSubmit",
    // resolver: zodResolver(schema),
    defaultValues: formDefaultValue,
  });

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    const getFilePaths = () => {
      async function getFilePath() {
        const addThumbnailFile = await storageMutate.mutateAsync(
          data.thumbnail as File
        );
        const addMovieFile = await storageMutate.mutateAsync(data.movie as File);
        return { thumbnail: addThumbnailFile, movie: addMovieFile };
      }
      const filePath = getFilePath().then((result) => {
        return result;
      });
      return filePath;
    };
    const addConfiguration = data.configuration.map((conf): Configuration => {
      async function getFilePath() {
        const addFile = await storageMutate.mutateAsync(conf.preview as File);
        return addFile;
      }
      getFilePath().then((result) => {
        conf.preview = result;
      });
      return conf as Configuration;
    });
    async function mutateMovie() {
      const filePaths = await getFilePaths();
      mutation.mutateAsync({
        title: data.title,
        category: data.category,
        platform: data.platform,
        raito: data.raito,
        scale: data.scale,
        thumbnail: filePaths.thumbnail,
        movie: filePaths.movie,
        configuration: addConfiguration,
        dlNumber: 0,
        materials: 0,
        remarks: "",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
    mutateMovie();
  };
  return (
    <PaperContainer title="コンテンツ登録">
      <Stepper activeStep={step}>
        {stepItems.map((item) => (
          <Step key={item}>
            <StepLabel>{item}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <form
        onSubmit={handleSubmit((data) => {
          try {
            onSubmit(data);
          } catch (e) {
            console.log(e);
          }
        })}
      >
        <Box>
          {step === 0 &&
            data &&
            data.docs.map((doc) => (
              <AddMovieDetailForm
                control={control}
                key={doc.id}
                data={doc.data()}
                setValue={setValue}
              />
            ))}
          {step === 1 && (
            <AddMovieConfigurationForm
              control={control}
              setValue={setValue}
              watch={watch}
            />
          )}
          {step === 2 && (
            <AddMovieConfilmForm
              handleSubmit={handleSubmit}
              getValues={getValues}
            />
          )}
        </Box>
        <Box textAlign={"right"}>
          <Button onClick={back}>
            <UndoIcon />
            戻る
          </Button>
          <Button onClick={next}>
            次へ
            <RedoIcon />
          </Button>
        </Box>
        <Box>
          <Button type="submit">新規追加</Button>
        </Box>
      </form>
    </PaperContainer>
  );
};
