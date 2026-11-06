"use client";

import { Button } from "@/components/arc/button/button";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main>
      <h1>Tasks are unavailable</h1>
      <p role="alert">
        Could not load tasks. Try again when the database is available.
      </p>
      <Button onClick={reset}>Try again</Button>
    </main>
  );
}
