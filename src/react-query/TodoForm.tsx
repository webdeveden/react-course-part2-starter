import { useRef, useState } from "react";
import useAddTodo from "./hooks/useAddTodo";

const TodoForm = () => {
  const [input, setInput] = useState(""); // 🔥 Track input value
  const ref = useRef<HTMLInputElement>(null); // 🔥 Reference to the input field

  const addTodo = useAddTodo(() => {
    setInput(""); // Clear input after adding a todo
    ref.current?.focus(); // Focus back on the input field after adding a todo
  });

  return (
    <>
      {addTodo.error && (
        <div className="alert alert-danger">{addTodo.error.message}</div>
      )}
      <form
        className="row mb-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) {
            addTodo.mutate({
              id: Date.now(), // Use a unique ID for the new todo
              title: input,
              userId: 1,
              completed: false,
            });
          }
        }}
      >
        <div className="col">
          <input
            ref={ref}
            type="text"
            className="form-control"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="col">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={!input.trim() || addTodo.isLoading}
          >
            {addTodo.isLoading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
