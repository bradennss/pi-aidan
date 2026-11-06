"use client";

import { useActionState } from "react";
import { Button } from "@/components/arc/button/button";
import { Input } from "@/components/arc/input/input";
import { addTask, changeTaskCompletion } from "./actions";

export function CreateTaskForm() {
  const [state, action, pending] = useActionState(addTask, { title: "" });
  return (
    <form action={action} className="create-form">
      <Input
        label="Task title"
        name="title"
        required
        maxLength={200}
        defaultValue={state.title}
        error={state.error}
        description="Keep it to 200 characters."
      />
      <Button type="submit" size="lg" loading={pending}>
        Add task
      </Button>
    </form>
  );
}

export function TaskCompletionForm({
  id,
  completed,
}: {
  id: string;
  completed: boolean;
}) {
  const [state, action, pending] = useActionState(changeTaskCompletion, {});
  return (
    <form action={action} className="completion-form">
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="completed" value={String(!completed)} />
      <Button type="submit" variant="secondary" loading={pending}>
        {completed ? "Reopen task" : "Mark complete"}
      </Button>
      {state.error && (
        <p role="alert" className="error">
          {state.error}
        </p>
      )}
    </form>
  );
}
