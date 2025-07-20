import { useState } from "react";

import usePage from "./hooks/usePage";

const Pagination = () => {
  const pageSize = 10; // Number of posts per page
  const [page, setPage] = useState(1);
  const { data: posts, error, isLoading } = usePage({ page, pageSize });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  const totalPages = Math.ceil((posts?.length || 0) / pageSize);
  // Calculate total pages based on the number of posts and page size

  return (
    <>
      <ul className="list-group">
        {posts?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
      <button
        disabled={page === 1}
        className="btn btn-primary mt-3"
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button>
      <button
        // disabled={page >= totalPages}
        className="btn btn-primary mt-3 ms-1"
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </>
  );
};

export default Pagination;
