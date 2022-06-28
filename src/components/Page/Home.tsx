import { MovieCardContainer } from "@components/Card/MovieCardContainer"
import { SearchModal } from "@components/Modal/SearchModal"

export const Home = () => {
  return(
    <>
      <SearchModal />
      <MovieCardContainer />
    </>
  )
}