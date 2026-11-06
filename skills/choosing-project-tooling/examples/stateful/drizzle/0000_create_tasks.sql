CREATE TABLE "tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	CONSTRAINT "tasks_title_length" CHECK (char_length("tasks"."title") between 1 and 200)
);
