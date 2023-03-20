import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

const useMovieList = () => {
  const { data, error } = useSWR("/api/movies", fetcher);

  return {
    movies: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useMovieList;
