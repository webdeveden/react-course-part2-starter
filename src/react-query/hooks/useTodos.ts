import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../constants";
import todoService, { Todo } from "../../services/todoService";

const useTodos = () => {
  return useInfiniteQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODOS,
    queryFn: todoService.getAll,
    staleTime: 10 * 1000,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.length > 0 ? nextPage : undefined;
    },

    // 10 secons, data will be considered fresh for this duration
    // cacheTime: 5 * 60 * 1000, // 5 minutes, data will be cached for this duration
    // refetchOnWindowFocus: false, // do not refetch when window is focused
    // retry: 3, // retry once on failure
    // refetchOnReconnect: false, // do not refetch when the device reconnects to the internet
    // refetchOnMount: false, // do not refetch when the component mounts
  });
};

export default useTodos;
