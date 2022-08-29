import { useSteps } from "@hooks/libs";
import { Box, Container } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddMovieConfigurationForm } from "./AddMovieConfigurationForm";
import { AddMovieConfilmForm } from "./AddMovieConfilmForm";
import { AddMovieDetailForm } from "./AddMovieDetailForm";
import { useAttibuteQuery, useMovieMutation } from "@hooks/firestore";
import { zodResolver } from "@hookform/resolvers/zod";
import { movieSchema, MovieSchema } from "src/validations/movieInput";
import { useAddImageStorage } from "@hooks/firestorage";
import { serverTimestamp } from "firebase/firestore";
import { PaperContainer } from "@components/UI/Box/PaperContainer";
import { useLink } from "@hooks/page";
import { reducer } from "src/utility";
import { StepButton } from "@components/UI/Button/StepButton";
import { SubmitButton } from "@components/UI/Button/SubmitButton";
import { StepHead } from "@components/UI/Display/StepHead";

const formDefaultValue: MovieSchema = {
  title: "",
  category: [""],
  platform: [""],
  raito: "",
  scale: "",
  resolution: "",
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
      imgVolume: 0,
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
  const [attributes, isLoading, error] = useAttibuteQuery();
  const mutation = useMovieMutation();
  const storageMutate = useAddImageStorage();
  const [step, next, back] = useSteps(0);
  const navigation = useLink();
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

  // サブミット処理
  const onSubmit: SubmitHandler<MovieSchema> = (data) => {
    const detailItems = data.configuration.map((item) => {
      return item.imgVolume;
    });
    const detailNumber = detailItems.reduce(reducer);
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
          resolution: data.resolution,
          thumbnail: filePaths.thumbnail,
          movie: filePaths.movie,
          configuration: addConfiguration,
          dlNumber: 0,
          materials: detailNumber,
          remarks: data.remarks,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        navigation("/");
      } catch (e) {
        alert(`${e}:送信エラーが発生しました。`);
      }
    }
    mutateMovie();
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        try {
          onSubmit(data);
        } catch (e) {
          alert(`${e}:送信エラーが発生しました。`);
        }
      })}
    >
      <PaperContainer title="コンテンツ登録">
        <StepHead step={step} stepItems={stepItems} />

        <Box>
          {step === 0 && attributes && (
            <AddMovieDetailForm control={control} data={attributes} />
          )}
          {step === 1 && (
            <AddMovieConfigurationForm control={control} watch={watch} />
          )}
          {step === 2 && <AddMovieConfilmForm getValues={getValues} />}
        </Box>
        <StepButton step={step} next={next} back={back} />
      </PaperContainer>
      <Container maxWidth="lg">
        <SubmitButton isLoading={mutation.isLoading} label={"コンテンツ新規登録"}/>
      </Container>
    </form>
  );
};
