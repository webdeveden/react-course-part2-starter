import { useInfiniteQuery } from "@tanstack/react-query";
import useInfinite from "./hooks/useInfinite";
import React from "react";

const InfiniteQuery = () => {
  const pageSize = 10; // Number of posts per page
  const {
    data: posts,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfinite({ pageSize });
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      <ul className="list-group">
        {posts?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((post) => (
              <li key={index} className="list-group-item">
                {post.title}
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      <button
        className="btn btn-primary mt-3 ms-1 "
        disabled={!posts?.pages.length || isFetchingNextPage}
        onClick={() => fetchNextPage()}
      >
        {posts?.pages.length ? "Load More" : "No More Posts"}
      </button>
    </>
  );
};

export default InfiniteQuery;
