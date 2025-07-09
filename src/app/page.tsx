"use client";

import React, { useEffect, useState } from "react";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import { Todo } from "@/lib/todoStore";
import { supabase } from "@/utils/supabase/client";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  // ================== Local api ======================
  // const fetchTodos = async () => {
  //   const res = await fetch("/api/todo");
  //   const data = await res.json();
  //   setTodos(data);
  //   setFilteredTodos(data);
  // };

  // const handleAdd = async (todoText: string) => {
  //   if (todos.some((t) => t.todo.toLowerCase() === todoText.toLowerCase())) {
  //     alert("Todo already exists.");
  //     return;
  //   }

  //   if (editingTodo) {
  //     const updatedTodo = { ...editingTodo, todo: todoText };
  //     await fetch(`/api/todo/${editingTodo.id}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(updatedTodo),
  //     });
  //     setEditingTodo(null);
  //   } else {
  //     const newTodo: Todo = {
  //       id: crypto.randomUUID(),
  //       todo: todoText,
  //       isCompleted: false,
  //       createdAt: new Date().toISOString(),
  //     };
  //     await fetch("/api/todo", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(newTodo),
  //     });
  //   }

  //   fetchTodos();
  // };

  // const handleRemove = async (id: string) => {
  //   await fetch(`/api/todo/${id}`, { method: "DELETE" });
  //   fetchTodos();
  // };

  // const handleEdit = (todo: Todo) => {
  //   setEditingTodo(todo);
  // };

  // const handleToggleComplete = async (id: string) => {
  //   const todo = todos.find((t) => t.id === id);
  //   if (!todo) return;
  //   const updated = { ...todo, isCompleted: !todo.isCompleted };
  //   await fetch(`/api/todo/${id}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(updated),
  //   });
  //   fetchTodos();
  // };

  // ===================== Supabase api ========================
  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) console.error(error);
    setTodos(data || []);
    setFilteredTodos(data || []);
  };

  const handleSubmit = async (todoText: string) => {
    if (!todoText.trim()) return;

    if (editingTodo) {
      // Update existing todo
      await supabase
        .from("todos")
        .update({ todo: todoText })
        .eq("id", editingTodo.id);
      setEditingTodo(null);
    } else {
      // Add new todo
      if (todos.some((t) => t.todo.toLowerCase() === todoText.toLowerCase())) {
        alert("Todo already exists.");
        return;
      }

      const newTodo = {
        id: crypto.randomUUID(),
        todo: todoText,
        is_completed: false,
        created_at: new Date().toISOString(),
      };

      await supabase.from("todos").insert([newTodo]);
    }

    fetchTodos();
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleRemove = async (id: string) => {
    await supabase.from("todos").delete().eq("id", id);
    fetchTodos();
  };

  const handleToggleComplete = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    await supabase
      .from("todos")
      .update({ is_completed: !todo.is_completed })
      .eq("id", id);
    fetchTodos();
  };

  useEffect(() => {
    const channel = supabase
      .channel("todos-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "todos" },
        () => fetchTodos()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleFilter = (query: string) => {
    setFilteredTodos(
      todos.filter((t) => t.todo.toLowerCase().includes(query.toLowerCase()))
    );
  };

  return (
    <main className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <TodoInput
        onAdd={handleSubmit}
        onFilter={handleFilter}
        initialValue={editingTodo?.todo}
        editing={!!editingTodo}
        onEditDone={() => setEditingTodo(null)}
      />
      <TodoList
        todos={filteredTodos}
        onRemove={handleRemove}
        onEdit={handleEdit}
        onToggleComplete={handleToggleComplete}
      />
    </main>
  );
}
