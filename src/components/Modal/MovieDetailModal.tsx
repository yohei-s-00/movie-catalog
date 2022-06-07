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
import { AppModal } from "./AppModal";
import { CenterFlexBox } from "../Box/CenterFlexBox";
import { DocumentData } from "firebase/firestore";

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
  data: DocumentData;
};

export const MovieDetailModal: FC<Props> = ({
  handleClose,
  open,
  setOpen,
  data,
}) => {
  return (
    <AppModal open={open} close={handleClose} width={800}>
      <Box sx={{ display: "flex", columnGap: 4 }}>
        <Box>
          <img src={Image} alt="" />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4">{data.title}</Typography>
          <Box>
            {data.category.map((cat: string) => (
              <Chip key={cat} label={cat} variant="outlined" />
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
                      <ViewSidebarIcon fontSize="small" />
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
          {data.platform.map((item: string) => (
            <Chip key={item} label={item} variant="outlined" />
          ))}
          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          <Button variant="contained">構成表ダウンロード</Button>
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
