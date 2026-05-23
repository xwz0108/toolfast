import { useState } from 'react'
import { Typography, Box, Paper, TextField, Stack, Select, MenuItem, Button, Snackbar } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import ToolLayout from '../../components/ToolLayout'

const KEYWORDS = ['SELECT','FROM','WHERE','AND','OR','ORDER BY','GROUP BY','HAVING','LIMIT','OFFSET','JOIN','INNER JOIN','LEFT JOIN','RIGHT JOIN','FULL JOIN','INSERT INTO','UPDATE','DELETE FROM','CREATE TABLE','ALTER TABLE','DROP TABLE','VALUES','SET','INTO','ON','AS','NOT','NULL','IS','IN','BETWEEN','LIKE','EXISTS','CASE','WHEN','THEN','ELSE','END','UNION','ALL','DISTINCT','COUNT','SUM','AVG','MAX','MIN','ASC','DESC','PRIMARY KEY','FOREIGN KEY','REFERENCES','INDEX','DEFAULT','CHECK','UNIQUE','CASCADE']

const FUNCTIONS = ['NOW()','CURRENT_DATE','CURRENT_TIMESTAMP','COALESCE','IFNULL','NULLIF','CAST','CONVERT','SUBSTRING','CONCAT','UPPER','LOWER','TRIM','LENGTH','REPLACE','DATE_FORMAT','DATE_ADD','DATE_SUB','DATEDIFF','ROUND','FLOOR','CEIL','ABS']

function formatSQL(sql, dialect) {
  let f = sql.replace(/\s+/g, ' ').trim()
    .replace(/,\s*/g, ',\n  ')
    .replace(/\b(INNER JOIN|LEFT JOIN|RIGHT JOIN|FULL JOIN|WHERE|AND|OR|GROUP BY|ORDER BY|HAVING|LIMIT|OFFSET|UNION)\b/gi, '\n$1')

  const words = [...KEYWORDS, ...FUNCTIONS]
  const regex = new RegExp(`\\b(${words.join('|')})\\b`, 'gi')
  f = f.replace(regex, m => `\n${m.toUpperCase()}`)
  f = f.replace(/^\n/, '').replace(/\n{2,}/g, '\n')
  return f
}

function highlightSQL(sql) {
  let h = sql
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  // Strings
  h = h.replace(/'([^']*)'/g, '<span style="color:#a6e3a1">\'$1\'</span>')

  // Numbers
  h = h.replace(/\b(\d+)\b/g, '<span style="color:#fab387">$1</span>')

  // Functions
  FUNCTIONS.forEach(fn => {
    h = h.replace(new RegExp(`\\b${fn.replace(/[()]/g,'\\$&')}\\b`, 'gi'), `<span style="color:#89b4fa">$&</span>`)
  })

  // Keywords
  KEYWORDS.forEach(kw => {
    h = h.replace(new RegExp(`\\b${kw}\\b`, 'gi'), `<span style="color:#cba6f7;font-weight:700">$&</span>`)
  })

  // Comments (-- style)
  h = h.replace(/(--.*)/g, '<span style="color:#6c7086;font-style:italic">$1</span>')

  return h
}

export default function SQLFormatter() {
  const [input, setInput] = useState(`SELECT u.id, u.name, u.email, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at > '2024-01-01' AND u.status = 'active'
GROUP BY u.id, u.name, u.email
ORDER BY order_count DESC
LIMIT 20`)
  const [dialect, setDialect] = useState('mysql')
  const [output, setOutput] = useState('')
  const [snack, setSnack] = useState(false)

  const format = () => {
    const formatted = formatSQL(input, dialect)
    setOutput(formatted)
  }

  return (
    <ToolLayout title="SQL Formatter & Beautifier" description="Format SQL queries with proper indentation and syntax highlighting. Supports MySQL, PostgreSQL, and SQLite." category="Developer Tools">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Stack direction="row" spacing={2} mb={2} alignItems="center">
          <Select value={dialect} onChange={e => setDialect(e.target.value)} size="small" sx={{ minWidth: 140 }}>
            <MenuItem value="mysql">MySQL</MenuItem>
            <MenuItem value="pg">PostgreSQL</MenuItem>
            <MenuItem value="sqlite">SQLite</MenuItem>
          </Select>
          <Button variant="contained" onClick={format} startIcon={<AutoFixHighIcon />}>Format</Button>
          <Button variant="outlined" onClick={() => { navigator.clipboard.writeText(output || input); setSnack(true) }} startIcon={<ContentCopyIcon />}>Copy</Button>
        </Stack>

        <TextField
          value={input} onChange={e => { setInput(e.target.value); setOutput('') }}
          placeholder="Paste your SQL query here..."
          fullWidth multiline rows={8}
          InputProps={{ sx: { fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: '0.85rem', lineHeight: 1.8 } }}
          sx={{ mb: 3 }}
        />

        {output && (
          <Box>
            <Typography variant="subtitle2" fontWeight={600} color="#8b8fa8" mb={1}>Formatted Result</Typography>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, bgcolor: '#1e1e2e', overflow: 'auto' }}>
              <pre style={{ margin: 0, fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: '0.85rem', lineHeight: 1.8, color: '#cdd6f4', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
                dangerouslySetInnerHTML={{ __html: highlightSQL(output) }} />
            </Paper>
          </Box>
        )}
      </Paper>
      <Snackbar open={snack} autoHideDuration={1500} onClose={() => setSnack(false)} message="Copied!" />
    </ToolLayout>
  )
}
