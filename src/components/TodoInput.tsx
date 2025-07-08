import React, { useState, KeyboardEvent, useEffect } from "react";

interface Props {
  onAdd: (todo: string) => void;
  onFilter: (query: string) => void;
  initialValue?: string;
  editing?: boolean;
  onEditDone?: () => void;
}

const TodoInput: React.FC<Props> = ({
  onAdd,
  onFilter,
  initialValue = "",
  editing = false,
  onEditDone,
}) => {
  const [input, setInput] = useState(initialValue);

  useEffect(() => {
    setInput(initialValue);
  }, [initialValue]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!input.trim()) return;
      onAdd(input.trim());
      if (!editing) setInput("");
      if (editing && onEditDone) onEditDone();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Enter a todo"
      className="w-full p-2 border"
      value={input}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
};

export default TodoInput;
