import "./App.css";
import InfiniteQuery from "./react-query/InfiniteQuery";
import Pagination from "./react-query/Pagination";
import PostList from "./react-query/PostList";
import TodoForm from "./react-query/TodoForm";
import TodoList from "./react-query/TodoList";

function App() {
  return (
    <>
      {/* <PostList /> */}

      <TodoForm />
      <TodoList />
      {/* <InfiniteQuery /> */}
    </>
  );
}

export default App;
