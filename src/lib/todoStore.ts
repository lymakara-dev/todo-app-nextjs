export interface Todo {
  id: string;
  todo: string;
  isCompleted: boolean; // for local api
  is_completed: boolean; // for supabase api
  createdAt: string;
}

export const todos: Todo[] = [];
