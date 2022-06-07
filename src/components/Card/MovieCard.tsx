import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Box } from "@mui/system";
import Image from "../../images/sample_01.png";
import { MovieDetailModal } from "../Modal/MovieDetailModal";
import { useState } from "react";

export const MovieCard = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea onClick={handleOpen}>
          <CardMedia
            component="img"
            height="200"
            image={Image}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              06203[正]
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", columnGap: 2 }}>
              <AccessTimeIcon fontSize="small" />
              <Typography variant="body1">0:15</Typography>
              <ViewSidebarIcon fontSize="small" />
              <Typography variant="body1">5</Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
      <MovieDetailModal handleClose={handleClose} open={open} setOpen={setOpen}/>
    </>
  );
};
