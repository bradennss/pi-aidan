[.[].workflow_runs[]
 | select(.id != $id and .run_number < $number)
 | select(.head_branch == "main" and .event == "workflow_dispatch"
          and .workflow_id == $workflow)]
| sort_by(.run_number)
| group_by(.run_number)
| last
| if length == 1 then .[0] else error("Missing or ambiguous infrastructure history") end
| if .run_number == ($number - 1) and .status == "completed" and .conclusion == "success"
  then true else error("Infrastructure recovery checkpoint required") end
