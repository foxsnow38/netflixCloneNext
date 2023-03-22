import useSwr from "swr";
import { fetcher } from "../lib/fetcher";

const useMovie = (movieId: string) => {
  const { data, error } = useSwr(`/api/movies/${movieId}`, fetcher);

  return {
    movie: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useMovie;
