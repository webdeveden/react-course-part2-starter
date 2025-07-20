import React from "react";
import useTodos from "./hooks/useTodos";
import InfiniteScroll from "react-infinite-scroll-component";

const TodoList = () => {
  const {
    data: todos,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useTodos();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const totalTodos = todos?.pages.reduce(
    (total, page) => total + page.length,
    0
  );

  return (
    <InfiniteScroll
      dataLength={totalTodos || 0}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading...</h4>}
    >
      <ul className="list-group">
        {todos.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((todo) => (
              <li key={todo.id} className="list-group-item">
                {todo.title}
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
    </InfiniteScroll>
  );
};

export default TodoList;
