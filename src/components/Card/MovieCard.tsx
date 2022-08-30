import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Box } from "@mui/system";
import { MovieDetailModal } from "@components/Card/MovieDetailModal";
import { FC, useState } from "react";
import { useStoragePath } from "@hooks/firestorage";

type Props = {
  data: MovieItem;
};

export const MovieCard: FC<Props> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [path, { loading }] = useStoragePath(data.thumbnail);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Card>
        <CardActionArea onClick={handleOpen}>
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
            <CardMedia
              component="img"
              height="200"
              image={path}
              alt="green iguana"
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data.title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", columnGap: 2 }}>
              <AccessTimeIcon fontSize="small" />
              <Typography variant="body1">{data.scale}</Typography>
              <ViewSidebarIcon fontSize="small" />
              <Typography variant="body1">{data.materials}</Typography>
              <UploadFileIcon fontSize="small" />
              <Typography variant="body1">{data.dlNumber}</Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
      <MovieDetailModal
        handleClose={handleClose}
        open={open}
        data={data}
      />
    </>
  );
};
