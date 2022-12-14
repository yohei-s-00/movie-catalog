import {
  Button,
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
import { AppModal } from "@components/UI/Modal/AppModal";
import { CenterFlexBox } from "@components/UI/Box/CenterFlexBox";
import { useStoragePath } from "@hooks/firestorage";
import { PDFMovieConfigurationLink } from "@components/PDF/PDFMovieConfigurationLink";
import { useUpdateMovieMutation } from "@hooks/firestore";

const style = {
  maxWidth: "100%",
};

type Props = {
  handleClose: () => void;
  open: boolean;
  data: MovieItem;
};

export const MovieDetailModal: FC<Props> = ({
  handleClose,
  open,
  data,
}) => {
  const { id, scale, materials, raito, platform, remarks, movie } = data;
  const [videoPath, { loading }] = useStoragePath(movie);
  const mutation = useUpdateMovieMutation(id);

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
                      <AccessTimeIcon fontSize="small" />???
                    </CenterFlexBox>
                  </TableCell>
                  <TableCell align="center">
                    <CenterFlexBox>
                      <ViewSidebarIcon fontSize="small" />
                      ?????????
                    </CenterFlexBox>
                  </TableCell>
                  <TableCell align="center">
                    <CenterFlexBox>
                      <AspectRatioIcon fontSize="small" />
                      ??????
                    </CenterFlexBox>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">{scale}</TableCell>
                  <TableCell align="center">{materials}</TableCell>
                  <TableCell align="center">{raito}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {/* <Box sx={{display: "flex"}}>
            <UploadFileIcon fontSize="small" />
            <Typography variant="body1">DL???:{data.dlNumber}</Typography>
          </Box> */}
          <Typography sx={{ marginTop: 2, marginBottom: 2 }} variant="body1">
            ???????????????
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            {platform.map((item: string) => {
              if (item) {
                return <Chip key={item} label={item} variant="outlined" />;
              }
            })}
          </Box>
          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          <PDFMovieConfigurationLink
            title="???????????????????????????"
            PDFValue={data}
            mutate={mutation.mutate}
          />
        </Box>
      </Box>
      <Box sx={{ height: 100, marginTop: 2 }}>
        <Typography variant="h6">????????????</Typography>
        <Typography>{remarks}</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="outlined" onClick={() => handleClose()}>
          ?????????
        </Button>
      </Box>
    </AppModal>
  );
};
