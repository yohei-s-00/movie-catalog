import {
  Button,
  Modal,
  Box,
  Typography,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  CircularProgress,
} from "@mui/material";
import { FC } from "react";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import { AppModal } from "./AppModal";
import { CenterFlexBox } from "../UI/Box/CenterFlexBox";
import { DocumentData } from "firebase/firestore";
import { useStoragePath } from "@hooks/firestorage";
import { PDFMovieConfigurationLink } from "@components/PDF/PDFMovieConfigurationLink";

const style = {
  maxWidth: "100%",
};

type Props = {
  handleClose: () => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: MovieItem;
};

export const MovieDetailModal: FC<Props> = ({
  handleClose,
  open,
  setOpen,
  data,
}) => {
  const [videoPath, { loading }] = useStoragePath(data.movie);

  return (
    <AppModal open={open} close={handleClose} width={900}>
      <Box sx={{ display: "flex", columnGap: 4 }}>
        <Box width={500} height={350}>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 200,
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <video style={style} controls muted>
              <source src={videoPath} type="video/mp4" />
              <p>Your browser doesn't support HTML5 video.</p>
            </video>
          )}
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4">{data.title}</Typography>
          <Box sx={{ mt: 2 }}>
            {data.category.map((cat: string) => (
              <Chip key={cat} label={cat} variant="outlined" color="primary" />
            ))}
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <CenterFlexBox>
                      <AccessTimeIcon fontSize="small" />尺
                    </CenterFlexBox>
                  </TableCell>
                  <TableCell align="center">
                    <CenterFlexBox>
                      <ViewSidebarIcon fontSize="small" />
                      素材数
                    </CenterFlexBox>
                  </TableCell>
                  <TableCell align="center">
                    <CenterFlexBox>
                      <AspectRatioIcon fontSize="small" />
                      比率
                    </CenterFlexBox>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">{data.scale}</TableCell>
                  <TableCell align="center">{data.remarks}</TableCell>
                  <TableCell align="center">{data.raito}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Typography sx={{ marginTop: 2, marginBottom: 2 }} variant="body1">
            推奨配信先
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            {data.platform.map((item: string) => {
              if (item) {
                return <Chip key={item} label={item} variant="outlined" />;
              }
            })}
          </Box>
          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          <PDFMovieConfigurationLink
            title="構成表ダウンロード"
            PDFValue={data}
          />
        </Box>
      </Box>
      <Box sx={{ height: 100, marginTop: 2 }}>
        <Typography variant="h6">特記事項</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="outlined" onClick={() => handleClose()}>
          閉じる
        </Button>
      </Box>
    </AppModal>
  );
};
