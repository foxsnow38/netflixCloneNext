import useSwr from "swr";

import { fetcher } from "@/lib/fetcher";

const useFavorites = (movieId: string) => {
  const { data, error, isLoading, mutate } = useSwr<any>(
    "/api/favorites",
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useFavorites;
