import { MovieCardContainer } from "@components/Card/MovieCardContainer"
import { SearchModal } from "@components/Search/SearchModal"

export const Home = () => {
  return(
    <>
      <SearchModal />
      <MovieCardContainer />
    </>
  )
}