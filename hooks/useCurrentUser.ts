import useSwr from "swr";
import { fetcher } from "@/lib/fetcher";

const useCurrentUser = () => {
  const { data, error, mutate, isLoading } = useSwr("/api/current", fetcher);
  return {
    data,
    isLoading,
    error,
    mutate,
  };
};

export default useCurrentUser;
