import React from "react";
import TodoItem from "./TodoItem";
import { Todo } from "@/lib/todoStore";

interface Props {
  todos: Todo[];
  onRemove: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onToggleComplete: (id: string) => void;
}

const TodoList: React.FC<Props> = ({
  todos,
  onRemove,
  onEdit,
  onToggleComplete,
}) => {
  if (todos.length === 0) {
    return (
      <p className="text-center text-gray-400 p-4">
        No result. Create a new one instead!
      </p>
    );
  }

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onRemove={onRemove}
          onEdit={onEdit}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
};

export default TodoList;
