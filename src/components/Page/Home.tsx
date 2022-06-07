import { MovieCardContainer } from "../Card/MovieCardContainer"
import { SearchModal } from "../Modal/SearchModal"

export const Home = () => {
  return(
    <>
      <SearchModal />
      <MovieCardContainer />
    </>
  )
}