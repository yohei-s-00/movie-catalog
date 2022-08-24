import { ChechBoxsField } from "@components/UI/Form/ChechBoxsField";
import { FormWrapper } from "@components/UI/Form/FormWrapper";
import { InputField } from "@components/UI/Form/InputField";
import { SelectField } from "@components/UI/Form/SelectField";
import { UploadInputField } from "@components/UI/Form/UploadInputField";
import styled from "@emotion/styled";
import { FC } from "react";
import { Control } from "react-hook-form";
import { RESOLUTION_SIZE } from "src/public/libs/movie";
import { MovieInputSchema } from "src/validations/movieInput";

type Props = {
  data: Attribute;
  control: Control<MovieInputSchema,any>;
};

const FieldBox = styled.div({
  marginTop: 40,
});

export const AddMovieDetailForm: FC<Props> = ({ data, control }) => {
  return (
    <FormWrapper title="動画詳細登録">
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
        <SelectField
          name="resolution"
          label="動画解像度"
          items={RESOLUTION_SIZE}
          control={control}
        />
      </FieldBox>
      <FieldBox>
        <ChechBoxsField
          row={true}
          name="category"
          label="カテゴリ"
          items={data.categories}
          control={control}
        />
      </FieldBox>
      <FieldBox>
        <ChechBoxsField
          row={true}
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
    </FormWrapper>
  );
};
