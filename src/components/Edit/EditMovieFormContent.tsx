import { AddMovieConfigurationForm } from "@components/AddContent/AddMovieConfigurationForm";
import { AddMovieConfilmForm } from "@components/AddContent/AddMovieConfilmForm";
import { AddMovieDetailForm } from "@components/AddContent/AddMovieDetailForm";
import { PaperContainer } from "@components/UI/Box/PaperContainer";
import { useAttibuteQuery, useUpdateMovieMutation } from "@hooks/firestore";
import { useSteps } from "@hooks/libs";
import { Box, Container } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { FC } from "react";
import { MovieInputSchema, movieItemSchema, MovieItemSchema } from "src/validations/movieInput";
import { StepButton } from "@components/UI/Button/StepButton";
import { SubmitButton } from "@components/UI/Button/SubmitButton";
import { StepHead } from "@components/UI/Display/StepHead";
import { reducer } from "src/utility";
import { useAddImageStorage } from "@hooks/firestorage";
import { serverTimestamp } from "firebase/firestore";
import { useLink } from "@hooks/page";
import { zodResolver } from "@hookform/resolvers/zod";

const stepItems = ["動画詳細登録", "構成表詳細登録", "確認"];

type Props = {
  items: MovieInputSchema;
  id: string;
};

export const EditMovieFormContent: FC<Props> = ({ items, id }) => {
  const [attributes, isLoading, error] = useAttibuteQuery();
  const storageMutate = useAddImageStorage();
  const mutation = useUpdateMovieMutation(id);
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
    // resolver: zodResolver(movieItemSchema),
    defaultValues: {...items},
  });
  const onSubmit: SubmitHandler<MovieInputSchema> = (data) => {
    const detailItems = data.configuration.map((item) => {
      return item.imgVolume;
    });
    const detailNumber = detailItems.reduce(reducer);
    const getFilePaths = () => {
      async function getFilePath() {
        const addThumbnailFile =
          data.thumbnail instanceof File
            ? await storageMutate.mutateAsync(data.thumbnail as File)
            : (data.thumbnail as string);
        const addMovieFile =
          data.movie instanceof File
            ? await storageMutate.mutateAsync(data.movie as File)
            : (data.movie as string);
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
          const addFile =
            conf.preview instanceof File
              ? await storageMutate.mutateAsync(conf.preview as File)
              : (conf.preview as string);
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
          materials: detailNumber,
          remarks: data.remarks,
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
        <SubmitButton isLoading={mutation.isLoading} label={"コンテンツを更新する"} />
      </Container>
    </form>
  );
};
