import { Todo, todos } from "@/lib/todoStore";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(todos);
  }

  if (req.method === "POST") {
    const newTodo: Todo = req.body;
    todos.push(newTodo);
    return res.status(201).json({ success: true });
  }

  res.status(405).end();
}
