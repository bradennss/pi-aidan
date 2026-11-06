import { useState } from "react";
import { Button } from "./components/arc/button/button";
import { Input } from "./components/arc/input/input";
import { Switch } from "./components/arc/switch/switch";

type Task = { id: number; title: string; completed: boolean };

export function App() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string>();

  return (
    <main className="page">
      <header>
        <h1>Checklist</h1>
        <p>Keep track for now. Refreshing clears your tasks.</p>
      </header>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const trimmed = title.trim();
          if (!trimmed) {
            setError("Enter a task before adding it.");
            return;
          }
          setTasks((current) => [
            ...current,
            { id: current.length, title: trimmed, completed: false },
          ]);
          setTitle("");
          setError(undefined);
        }}
      >
        <Input
          label="New task"
          value={title}
          error={error}
          onChange={(event) => {
            setTitle(event.target.value);
            setError(undefined);
          }}
        />
        <Button type="submit" size="lg">
          Add task
        </Button>
      </form>
      {tasks.length === 0 ? (
        <p className="empty">Add a task to get started.</p>
      ) : (
        <ul aria-label="Tasks">
          {tasks.map((task) => (
            <li key={task.id}>
              <span
                id={`task-${task.id}`}
                className={task.completed ? "completed" : undefined}
              >
                {task.title}
              </span>
              <Switch
                aria-labelledby={`task-${task.id}`}
                checked={task.completed}
                onCheckedChange={(completed) => {
                  setTasks((current) =>
                    current.map((item) =>
                      item.id === task.id ? { ...item, completed } : item,
                    ),
                  );
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
