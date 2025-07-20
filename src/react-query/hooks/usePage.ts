import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  completed: boolean;
}

interface PostQuery {
  page: number;
  pageSize: number;
}
const usePage = (query: PostQuery) => {
  const fetchPosts = () =>
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
        params: {
          _start: (query.page - 1) * query.pageSize,
          _limit: query.pageSize,
        },
      })
      .then((response) => response.data);

  return useQuery<Post[], Error>({
    // users/userId/posts
    queryKey: ["posts", query],
    queryFn: fetchPosts,
    staleTime: 1 * 60 * 1000, //1min
    keepPreviousData: true, // Keep previous data while loading new data
    // This is useful for pagination to avoid flickering
  });
};

export default usePage;
