import { todos } from "@/app/lib/todoStore";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  console.log("Requested to delete ID:", id);
  console.log(
    "Existing IDs:",
    todos.map((t) => t.id)
  );

  if (typeof id !== "string")
    return res.status(400).json({ error: "Invalid ID" });

  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return res.status(404).json({ error: "Todo not found" });

  if (req.method === "PUT") {
    todos[index] = req.body;
    return res.status(200).json({ success: true });
  }

  if (req.method === "DELETE") {
    todos.splice(index, 1);
    return res.status(200).json({ success: true });
  }

  res.status(405).end();
}
