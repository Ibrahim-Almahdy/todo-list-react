import type { TaskList } from "../types/Task";
import { useEffect, useState } from "react";

function usePersistTasks() {
  const [tasks, setTasks] = useState<TaskList>(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return { tasks, setTasks };
}

export default usePersistTasks;
