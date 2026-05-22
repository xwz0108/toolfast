import { useState, useMemo } from 'react'
import { Typography, Box, Paper, TextField, Chip, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material'
import ToolLayout from '../../components/ToolLayout'

export default function RegexVisualizer() {
  const [pattern, setPattern] = useState('(\\d{3})[-.]?(\\d{3})[-.]?(\\d{4})')
  const [testText, setTestText] = useState('Call me at 123-456-7890 or 987.654.3210')
  const [flags, setFlags] = useState('g')

  const matches = useMemo(() => {
    try {
      const re = new RegExp(pattern, flags.replace('g','') + 'd')
      const results = []
      let match
      while ((match = re.exec(testText)) !== null) {
        results.push({ full: match[0], groups: match.slice(1), index: match.index })
        if (!flags.includes('g')) break
      }
      return results
    } catch { return [] }
  }, [pattern, testText, flags])

  const error = useMemo(() => {
    try { new RegExp(pattern, flags); return null }
    catch (e) { return e.message }
  }, [pattern, flags])

  return (
    <ToolLayout title="Regex Visualizer" description="Test regular expressions with real-time visual feedback. Supports Unicode and Chinese characters." category="Developer Tools">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="subtitle2" fontWeight={600} mb={1}>Pattern</Typography>
        <TextField value={pattern} onChange={e => setPattern(e.target.value)} placeholder="/pattern/" fullWidth size="small" InputProps={{ sx: { fontFamily: 'monospace' } }} sx={{ mb: 1 }} error={!!error} helperText={error} />
        <Stack direction="row" spacing={1} mb={3}>
          <ToggleButtonGroup value={flags} onChange={(_, v) => v && setFlags(v)} size="small">
            <ToggleButton value="g">g</ToggleButton>
            <ToggleButton value="gi">i</ToggleButton>
            <ToggleButton value="gm">m</ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <Typography variant="subtitle2" fontWeight={600} mb={1}>Test String</Typography>
        <TextField value={testText} onChange={e => setTestText(e.target.value)} placeholder="Enter text to test..." fullWidth multiline rows={4} InputProps={{ sx: { fontFamily: 'monospace', fontSize: '0.9rem' } }} sx={{ mb: 3 }} />

        <Typography variant="subtitle2" fontWeight={600} mb={1}>Matches ({matches.length})</Typography>
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, minHeight: 80 }}>
          {matches.length === 0 ? (
            <Typography color="text.secondary">No matches found</Typography>
          ) : (
            <Stack spacing={1}>
              {matches.map((m, i) => (
                <Paper key={i} variant="outlined" sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(167,139,250,0.06)' }}>
                  <Typography fontFamily="monospace" color="primary.light" fontWeight={700}>{m.full}</Typography>
                  {m.groups.length > 0 && (
                    <Stack direction="row" spacing={0.5} mt={0.5} flexWrap="wrap">
                      {m.groups.map((g, j) => <Chip key={j} label={`$${j+1}: ${g}`} size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />)}
                    </Stack>
                  )}
                  <Typography variant="caption" color="text.secondary">Position: {m.index}</Typography>
                </Paper>
              ))}
            </Stack>
          )}
        </Paper>
      </Paper>
    </ToolLayout>
  )
}
