## What is Mermaid?

Mermaid lets you create diagrams using text and code. No design tools — just write markdown-style syntax.

### Why Use Mermaid?
- Version control friendly (plain text)
- Works in Markdown files
- GitHub, GitLab, Notion all support it
- Generate diagrams programmatically

### Flowchart
```
flowchart TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action A]
    B -->|No| D[Action B]
```

### Sequence Diagram
```
sequenceDiagram
    Client->>Server: GET /api
    Server->>DB: Query
    DB-->>Server: Data
    Server-->>Client: Response
```

### Class Diagram
```
classDiagram
    class User {
        +name
        +email
        +login()
    }
```

### Tips
1. Keep diagrams focused
2. Use meaningful labels
3. Use subgraphs for grouping

[Create Diagrams Now →](/tools/mermaid-editor)
