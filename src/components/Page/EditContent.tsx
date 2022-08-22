import { EditMovieFormContent } from "@components/Edit/EditMovieFormContent";
import { useGetMovieQuery } from "@hooks/firestore";
import { useParams } from "react-router-dom";

export const EditContent = () => {
  const { id } = useParams();
  const { movie, isLoading, error } = useGetMovieQuery(id);
  if (isLoading) {
    <>
      ...loading
    </>
  }
  if (error) {
    <>
      error: {error}
    </>
  }
  return (
    <>
      {movie && id &&
        <EditMovieFormContent items={movie} id={id}/>
      }
    </>
  );
};
