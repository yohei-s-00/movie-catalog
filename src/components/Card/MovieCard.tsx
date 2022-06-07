import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Box } from "@mui/system";
import Image from "../../images/sample_01.png";
import { MovieDetailModal } from "../Modal/MovieDetailModal";
import { FC, useState } from "react";
import { DocumentData } from "firebase/firestore";

type Props = {
  data: DocumentData
}

export const MovieCard: FC<Props> = ({data}) => {
  console.log(data)
  const [open, setOpen] = useState(false);
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
          <CardMedia
            component="img"
            height="200"
            image={Image}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data.title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", columnGap: 2 }}>
              <AccessTimeIcon fontSize="small" />
              <Typography variant="body1">
                {data.scale}
              </Typography>
              <ViewSidebarIcon fontSize="small" />
              <Typography variant="body1">
                {data.remarks}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
      <MovieDetailModal handleClose={handleClose} open={open} setOpen={setOpen} data={data}/>
    </>
  );
};
