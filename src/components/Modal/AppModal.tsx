import { Box, Modal } from "@mui/material";
import { width } from "@mui/system";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  open: boolean;
  close: () => void
  width: number;
};

export const AppModal: FC<Props> = ({ children, open, close, width }) => {

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: width,
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={open} onClose={close}>
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};
