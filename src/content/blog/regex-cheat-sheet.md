## Regex Quick Reference

Regular expressions (regex) are patterns used to match character combinations in strings.

### Basic Patterns

| Pattern | Matches | Example |
|---------|---------|---------|
| `.` | Any character | `h.t` matches "hat", "hot" |
| `^` | Start of string | `^Hello` |
| `$` | End of string | `world$` |
| `*` | Zero or more | `ab*c` matches "ac", "abbc" |
| `+` | One or more | `ab+c` matches "abc", "abbc" |
| `?` | Optional | `colou?r` matches "color", "colour" |

### Character Classes

| Pattern | Matches |
|---------|---------|
| `[abc]` | a, b, or c |
| `[^abc]` | NOT a, b, or c |
| `[a-z]` | Any lowercase letter |
| `\d` | Any digit (0-9) |
| `\w` | Word character (a-z, A-Z, 0-9, _) |
| `\s` | Whitespace |

### Common Recipes

| Task | Regex |
|------|-------|
| Email | `[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}` |
| URL | `https?://[^\s/$.?#].[^\s]*` |
| Phone (US) | `\d{3}-\d{3}-\d{4}` |
| Date (YYYY-MM-DD) | `\d{4}-\d{2}-\d{2}` |

### Flags
- `g` — Global (find all matches)
- `i` — Case insensitive
- `m` — Multiline mode

[Test Your Regex →](/tools/regex-visualizer)
