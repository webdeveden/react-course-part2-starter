import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../constants";
import todoService, { Todo } from "../../services/todoService";

interface AddTodoContext {
  previousTodos?: Todo[];
}

const useAddTodo = (onAdd: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<Todo, Error, Todo, AddTodoContext>({
    // mutationFn: (todo: Todo) =>
    //   axios
    //     .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
    //     .then((res) => res.data),
    mutationFn: todoService.post, // Use the APIClient to post the new todo

    //optmistic update
    // This is used to update the UI immediately without waiting for the server response
    // newTodo is the data we are sending to the server
    // context is used to rollback the optimistic update in case of an error
    // context is an object that contains the previous state of the data
    // It is passed to the onError callback
    // onSuccess is called when the mutation is successful
    // onError is called when the mutation fails
    onMutate: (newTodo) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS);

      //   const optimisticTodo = { ...newTodo, id: Date.now() }; // 👈 unique temporary id

      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos = []) => [
        newTodo,
        ...todos,
      ]);

      onAdd(); // Clear input, etc.
      return { previousTodos };
    },
    // saveTodo is the data returned from the server
    // newTodo is the data we sent to the server
    // We update the todo in the cache with the data returned from the server
    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos) =>
        todos?.map((todo) => (todo === newTodo ? savedTodo : todo))
      );
      console.log("Todo added successfully:", newTodo);
    },

    onError: (error, newTodo, context) => {
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, context?.previousTodos);
    },
  });
};

export default useAddTodo;
