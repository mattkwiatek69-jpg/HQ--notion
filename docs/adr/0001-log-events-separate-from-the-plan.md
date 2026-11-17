# Log events are separate records keyed to occurrences, with a snapshot

The hub once tracked by ticking checklist items per day (`days`), and later stopped tracking altogether. When the owner asked to record what actually happened again, we kept the Plan, Routine definitions and the record of what happened as three separate things: a Log event (`log` in saved data, schema 5) names one Occurrence by date plus a key derived from the Plan (`p:<part of the day>:<routine id>:<nth>` or `h:<daily habit id>`), and stores a snapshot of the routine's name and planned minutes. Ticking the plan item itself, or keying by list position, was rejected because editing the week or a routine would silently rewrite or orphan the history; the snapshot keeps an event readable after the routine is renamed, edited or deleted. The old `days` ticks stay untouched and are read as done where no Log event exists.

## Consequences

- Moving a routine to another part of the day changes its key, so earlier events stay with the old occurrence rather than following the routine. This is deliberate: the event records what was planned then.
- Nothing is logged automatically. Finishing the follow-along player offers Mark done; it no longer appends to the tracking-era `sessions` list, which is kept as it was.
