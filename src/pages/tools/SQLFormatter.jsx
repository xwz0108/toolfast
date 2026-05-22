import { useState } from 'react'
import { Typography, Box, Paper, Button, TextField, Select, MenuItem, Snackbar } from '@mui/material'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ToolLayout from '../../components/ToolLayout'

export default function SQLFormatter() {
  const [input, setInput] = useState('SELECT id,name,email FROM users WHERE created_at > "2024-01-01" ORDER BY id DESC LIMIT 10')
  const [dialect, setDialect] = useState('mysql')
  const [snack, setSnack] = useState(false)

  const format = (sql) => {
    const keywords = ['SELECT','FROM','WHERE','ORDER BY','GROUP BY','HAVING','LIMIT','OFFSET','JOIN','INNER JOIN','LEFT JOIN','RIGHT JOIN','INSERT INTO','UPDATE','DELETE FROM','SET','VALUES','AND','OR','NOT','IN','BETWEEN','LIKE','AS','ON','CREATE TABLE','ALTER TABLE','DROP','INDEX']
    let f = sql.replace(/\s+/g,' ').trim()
    const upper = new RegExp(`\\b(${keywords.join('|')})\\b`,'gi')
    f = f.replace(upper, m => `\n${m.toUpperCase()}`).replace(/^\n/,'').replace(/,\s*/g,',\n  ')
    return f
  }

  return (
    <ToolLayout title="SQL Formatter & EXPLAIN" description="Format SQL queries instantly with syntax highlighting. Supports MySQL, PostgreSQL, and SQLite." category="Developer Tools">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <TextField value={input} onChange={e => setInput(e.target.value)} placeholder="Paste your SQL here..." fullWidth multiline rows={6} InputProps={{ sx: { fontFamily: 'monospace', fontSize: '0.9rem' } }} sx={{ mb: 3 }} />
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Select value={dialect} onChange={e => setDialect(e.target.value)} size="small"><MenuItem value="mysql">MySQL</MenuItem><MenuItem value="pg">PostgreSQL</MenuItem><MenuItem value="sqlite">SQLite</MenuItem></Select>
          <Button variant="contained" startIcon={<AutoFixHighIcon />} onClick={() => setInput(format(input))}>Format</Button>
          <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={() => { navigator.clipboard.writeText(input); setSnack(true) }}>Copy</Button>
        </Box>
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, bgcolor: '#1e1e2e', color: '#cdd6f4', fontFamily: 'monospace', fontSize: '0.85rem', whiteSpace: 'pre-wrap', minHeight: 100 }}>
          {input}
        </Paper>
      </Paper>
      <Snackbar open={snack} autoHideDuration={1500} onClose={() => setSnack(false)} message="Copied!" />
    </ToolLayout>
  )
}
