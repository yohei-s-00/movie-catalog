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
import { UseFormGetValues, UseFormHandleSubmit } from "react-hook-form";
import { AddMovieFormWrapper } from "./AddMovieFormWrapper";
import { FormValue } from "./AddMovieFormContent";
import { PDFMovieConfigurationLink } from "@components/PDF/PDFMovieConfigurationLink";

type Props = {
  handleSubmit: UseFormHandleSubmit<FormValue>;
  getValues: UseFormGetValues<FormValue>;
};

export const AddMovieConfilmForm: FC<Props> = ({ handleSubmit, getValues }) => {
  const formValue = getValues();
  return (
    <AddMovieFormWrapper title="登録確認">
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
                  formValue.category.map((cat) => (
                    <Chip
                      key={cat}
                      label={cat}
                      variant="outlined"
                      color="primary"
                    />
                  ))}
              </TableCell>
              <TableCell align="center">
                {formValue.platform.length &&
                  formValue.platform.map((item) => (
                    <Chip key={item} label={item} variant="outlined" />
                  ))}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <PDFMovieConfigurationLink formValue={formValue} />
    </AddMovieFormWrapper>
  );
};
