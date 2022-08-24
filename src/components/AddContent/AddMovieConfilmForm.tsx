import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC } from "react";
import { UseFormGetValues } from "react-hook-form";
import { PDFMovieConfigurationLink } from "@components/PDF/PDFMovieConfigurationLink";
import { MovieInputSchema } from "src/validations/movieInput";
import { FormWrapper } from "@components/UI/Form/FormWrapper";

type Props = {
  getValues: UseFormGetValues<MovieInputSchema>;
};

export const AddMovieConfilmForm: FC<Props> = ({ getValues }) => {
  const formValue = getValues();
  return (
    <FormWrapper title="登録確認">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">タイトル</TableCell>
              <TableCell align="center">比率</TableCell>
              <TableCell align="center">動画尺</TableCell>
              <TableCell align="center">カテゴリ</TableCell>
              <TableCell align="center">推奨配信先</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">
                {formValue.title && formValue.title}
              </TableCell>
              <TableCell align="center">
                {formValue.raito && formValue.raito}
              </TableCell>
              <TableCell align="center">
                {formValue.scale && formValue.scale}
              </TableCell>
              <TableCell align="center">
                {formValue.category.length &&
                  formValue.category.map((cat) => {
                    if (cat) {
                      return (
                        <Chip
                          key={cat}
                          label={cat}
                          variant="outlined"
                          color="primary"
                        />
                      );
                    }
                  })}
              </TableCell>
              <TableCell align="center">
                {formValue.platform.length &&
                  formValue.platform.map((item) => {
                    if (item) {
                      return (
                        <Chip key={item} label={item} variant="outlined" />
                      );
                    }
                  })}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <PDFMovieConfigurationLink title="PDFを確認する" PDFValue={formValue} />
    </FormWrapper>
  );
};
