import { ChechBoxsField } from "@components/UI/Form/ChechBoxsField";
import { InputField } from "@components/UI/Form/InputField";
import { SelectField } from "@components/UI/Form/SelectField";
import { UploadInputField } from "@components/UI/Form/UploadInputField";
import styled from "@emotion/styled";
import { FC } from "react";
import { Control, UseFormSetValue } from "react-hook-form";
import { MovieSchema } from "src/validations/movieInput";
import { AddMovieFormWrapper } from "./AddMovieFormWrapper";

type Props = {
  data: Attribute;
  control: Control<MovieSchema, any>;
};

const FieldBox = styled.div({
  marginTop: 40,
});

export const AddMovieDetailForm: FC<Props> = ({ data, control }) => {
  return (
    <AddMovieFormWrapper title="動画詳細登録">
      <FieldBox>
        <InputField name="title" label="タイトル" control={control} />
      </FieldBox>
      <FieldBox>
        <SelectField
          name="raito"
          label="比率"
          items={data.raitos}
          control={control}
        />
      </FieldBox>
      <FieldBox>
        <SelectField
          name="scale"
          label="動画尺"
          items={data.scales}
          control={control}
        />
      </FieldBox>
      <FieldBox>
        <ChechBoxsField
          name="category"
          label="カテゴリ"
          items={data.categories}
          control={control}
        />
      </FieldBox>
      <FieldBox>
        <ChechBoxsField
          name="platform"
          label="推奨配信先"
          items={data.platforms}
          control={control}
        />
      </FieldBox>
      <FieldBox>
        <UploadInputField
          name="thumbnail"
          label="サムネイル"
          accept="image"
          control={control}
        />
      </FieldBox>
      <FieldBox>
        <UploadInputField
          name="movie"
          label="動画"
          accept="video"
          control={control}
        />
      </FieldBox>
      <FieldBox>
        <InputField name="remarks" label="特記事項" control={control} />
      </FieldBox>
    </AddMovieFormWrapper>
  );
};
