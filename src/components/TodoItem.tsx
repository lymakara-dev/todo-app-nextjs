import React from "react";

interface Todo {
  id: string;
  todo: string;
  isCompleted: boolean;
  createdAt: string;
}

interface TodoItemProps {
  todo: Todo;
  onRemove: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onToggleComplete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onRemove,
  onEdit,
  onToggleComplete,
}) => {
  return (
    <div className="flex justify-between items-center p-2 border-b hover:bg-gray-100 group">
      <span
        className={
          todo.isCompleted ? "line-through text-gray-500" : "text-black"
        }
      >
        {todo.todo}
      </span>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100">
        <button
          onClick={() => onToggleComplete(todo.id)}
          className="text-sm text-blue-600"
        >
          {todo.isCompleted ? "Mark Incomplete" : "Mark Complete"}
        </button>
        <button onClick={() => onEdit(todo)} className="text-sm text-green-600">
          Edit
        </button>
        <button
          onClick={() => onRemove(todo.id)}
          className="text-sm text-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
