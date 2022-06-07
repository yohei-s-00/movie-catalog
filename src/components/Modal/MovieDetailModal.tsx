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
} from "@mui/material";
import { FC } from "react";
import Image from "../../images/sample_01.png";
import PDF from "../../images/pdf/Format_6203.pdf";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type Props = {
  handleClose: () => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MovieDetailModal: FC<Props> = ({ handleClose, open, setOpen }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ display: "flex", columnGap: 4 }}>
          <Box>
            <img src={Image} alt="" />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4">06203[正]</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <AccessTimeIcon fontSize="small" />
                        尺
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <ViewSidebarIcon fontSize="small" />
                        素材数
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <ViewSidebarIcon fontSize="small" />
                        比率
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">00:15</TableCell>
                    <TableCell align="center">5</TableCell>
                    <TableCell align="center">1:1</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Typography sx={{ marginTop: 2, marginBottom: 2 }} variant="body1">
              推奨配信先
            </Typography>
            <Chip label="YDN／YDA" variant="outlined" />
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
              <Button variant="contained">構成表ダウンロード</Button>
          </Box>
        </Box>
        <Box sx={{ height: 100, marginTop: 2 }}>
          <Typography variant="h6">特記事項</Typography>
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button variant="outlined" onClick={() => handleClose()}>閉じる</Button>
        </Box>
      </Box>
    </Modal>
  );
};
