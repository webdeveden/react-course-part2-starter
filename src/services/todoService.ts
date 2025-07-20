// creating a single instance of APIClient for the Todo service
// This allows us to reuse the same APIClient instance across the application
// and avoid creating multiple instances with the same endpoint

import APIClient from "./apiClient";

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}
export default new APIClient<Todo>("/todos");
