## What is Cron?

Cron is a time-based job scheduler in Unix. It runs commands automatically at specified times.

### Cron Syntax

A cron expression has 5 fields:
```
minute (0-59)
  hour (0-23)
    day of month (1-31)
      month (1-12)
        day of week (0-7, 0=Sunday)
```

### Common Examples

| Expression | Meaning |
|-----------|---------|
| `0 4 * * *` | Every day at 4:00 AM |
| `*/15 * * * *` | Every 15 minutes |
| `0 0 1 * *` | Midnight, 1st of month |
| `0 9-17 * * 1-5` | 9AM-5PM weekdays |

### Special Characters
- `*` = every value
- `,` = list separator (`0,30`)
- `-` = range (`9-17`)
- `/` = step values (`*/5`)

### Pitfalls
1. Overlapping runs — use lock files
2. Missing env vars — source your profile
3. Silent failures — always log output

[Visualize Cron Expression →](/tools/cron-visualizer)
