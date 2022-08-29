import { useDeleteMovieMutation } from "@hooks/firestore";
import { useLink } from "@hooks/page";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton } from "@mui/material";
import { FC } from "react";

type Props = {
  id: string
}

export const DeleteMovie: FC<Props> = ({id}) => {
  const mutation = useDeleteMovieMutation(id)
  const navigation = useLink();
  const handleDelete = () => {
    mutation.mutate()
    navigation("/")
  };
  return (
    <IconButton onClick={() => handleDelete()} size="small">
      <DeleteForeverIcon />
    </IconButton>
  );
};
