import { listTasks } from "../tasks/service";
import { CreateTaskForm, TaskCompletionForm } from "./task-forms";

export const dynamic = "force-dynamic";

export default async function Page() {
  const tasks = await listTasks();
  const completed = tasks.filter((task) => task.completed).length;
  return (
    <main>
      <header>
        <h1>Tasks</h1>
        <p role="status">
          {completed} of {tasks.length} completed
        </p>
      </header>
      <CreateTaskForm />
      {tasks.length === 0 ? (
        <p className="empty">No tasks yet. Add your first task above.</p>
      ) : (
        <ul aria-label="Tasks" className="tasks">
          {tasks.map((task) => (
            <li key={task.id}>
              <div className="task-copy">
                <span
                  className={task.completed ? "completed-title" : undefined}
                >
                  {task.title}
                </span>
                <span className="task-status">
                  {task.completed ? "Completed" : "Open"}
                </span>
              </div>
              <TaskCompletionForm id={task.id} completed={task.completed} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
