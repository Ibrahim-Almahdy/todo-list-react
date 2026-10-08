import { useMemo, useRef } from "react";
import usePersistTasks from "./hooks/usePresistTasks";
import type { Task } from "./types/Task";

function App() {
  const { tasks, setTasks } = usePersistTasks();
  const newTaskRef = useRef<HTMLInputElement>(null);

  const remainingTasks = useMemo(
    () => tasks.filter((task: Task) => !task.completed).length,
    [tasks],
  );

  const handleAddTask = () => {
    if (!newTaskRef.current) return;

    const text = newTaskRef.current.value;

    if (!text) return;

    setTasks((prev) => [
      ...prev,
      { id: prev.length + 1, completed: false, text },
    ]);

    newTaskRef.current.value = "";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const handleTaskCompletion = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };
  const handleTaskDeletion = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <main className="todo-page min-h-screen w-full bg-slate-50 px-4 py-8 transition-colors duration-300 sm:grid sm:place-items-center sm:p-6 lg:p-8">
      <div className="todo-shell mx-auto flex w-full max-w-xl flex-col gap-6 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xl shadow-slate-200/50 transition-colors duration-300 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="todo-kicker text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">Daily planner</p>
            <h1 className="todo-title text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Todo List</h1>
            <p className="todo-subtitle text-sm text-slate-500">Keep your day clear, focused, and on track.</p>
          </div>
          <label className="theme-switch relative mt-1 inline-flex h-9 w-16 shrink-0 cursor-pointer items-center rounded-full bg-slate-100 p-1 transition-colors duration-300 hover:bg-slate-200 focus-within:ring-4 focus-within:ring-indigo-100" aria-label="Toggle dark mode">
            <input id="theme-toggle" className="peer sr-only" type="checkbox" />
            <span className="absolute left-2 text-xs leading-none text-amber-500 transition-opacity peer-checked:opacity-0">☀</span>
            <span className="absolute right-2 text-xs leading-none text-indigo-200 opacity-0 transition-opacity peer-checked:opacity-100">☾</span>
            <span className="h-7 w-7 rounded-full bg-white shadow-sm transition-transform duration-300 peer-checked:translate-x-7" />
          </label>
        </div>
        <div className="flex w-full gap-3">
          <input
            onKeyDown={handleKeyDown}
            ref={newTaskRef}
            className="todo-input min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            type="text"
            placeholder="Add a new task..."
          />
          <button
            onClick={handleAddTask}
            className="todo-add-button grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-xl bg-indigo-600 text-xl font-medium text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-md hover:shadow-indigo-200 focus:outline-none focus:ring-4 focus:ring-indigo-200 active:scale-95"
          >
            +
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {tasks.map((task: Task) => (
            <div
              className="todo-task group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3 transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md hover:shadow-slate-100"
              key={task.id}
            >
              <div
                className="flex min-w-0 cursor-pointer items-center gap-3"
                onClick={() => handleTaskCompletion(task.id)}
              >
                <input className="h-5 w-5 shrink-0 cursor-pointer accent-indigo-600" type="checkbox" checked={task.completed} readOnly />

                <span
                  className={`${task.completed ? "text-slate-400 line-through" : "todo-task-text text-slate-700"} cursor-pointer select-none truncate text-sm font-medium transition-colors`}
                >
                  {task.text}
                </span>
              </div>

              <button
                onClick={() => handleTaskDeletion(task.id)}
                className="todo-delete cursor-pointer rounded-xl p-2 text-sm text-slate-400 opacity-100 transition hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
              >
                ❌
              </button>
            </div>
          ))}
        </div>
        <div className="todo-summary border-t border-slate-100 pt-5 text-sm font-medium text-slate-500">Remaining tasks: <span className="todo-summary-count text-slate-900">{remainingTasks}</span></div>
      </div>
    </main>
  );
}

export default App;
