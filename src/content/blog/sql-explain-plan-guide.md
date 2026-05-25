## What is a SQL Execution Plan?

When you run a SQL query, the database creates an **execution plan** — a step-by-step strategy for retrieving your data efficiently.

Understanding execution plans helps you find slow queries, identify missing indexes, and understand why a query is slow.

### Common Operations

| Operation | What It Means | Performance |
|-----------|--------------|-------------|
| Seq Scan | Scanning entire table | Slow for large tables |
| Index Scan | Using an index to find rows | Fast |
| Nested Loop | Join two tables row by row | Slow for large joins |
| Hash Join | Build hash table and join | Fast |
| Sort | Sorting results | Costly |

### Key Metrics

1. **Cost**: Lower is better
2. **Rows**: Estimated rows returned
3. **Width**: Average row size

> Always check if your query uses an index. If not, create one.

[Try SQL Formatter →](/tools/sql-formatter)
