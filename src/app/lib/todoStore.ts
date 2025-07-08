export interface Todo {
  id: string;
  todo: string;
  isCompleted: boolean;
  createdAt: string;
}

export let todos: Todo[] = [];
