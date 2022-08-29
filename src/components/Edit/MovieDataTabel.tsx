import { useLink } from "@hooks/page";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC } from "react";
import { DeleteMovie } from "./DeleteMovie";

export type TableHeadColms = {
  field: string;
  headerName: string;
  width: number;
}[];

type Props = {
  data: MovieItem[];
  headerColms: TableHeadColms;
};

export const MovieDataTabel: FC<Props> = ({ data, headerColms }) => {
  const link = useLink();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headerColms.map((col) => {
              return <TableCell key={col.field}>{col.headerName}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => {
            const { id, title, scale, materials, raito } = item;
            return (
              <TableRow hover key={id} onClick={() => link(`${id}`)}>
                <TableCell>{title}</TableCell>
                <TableCell>{scale}</TableCell>
                <TableCell>{materials}</TableCell>
                <TableCell>{raito}</TableCell>
                <TableCell>
                  <DeleteMovie id={id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
