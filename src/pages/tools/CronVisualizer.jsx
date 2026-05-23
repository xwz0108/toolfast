import { useState, useMemo } from 'react'
import { Typography, Box, Paper, TextField, Chip, Stack, Grid } from '@mui/material'
import ToolLayout from '../../components/ToolLayout'

const FIELDS = ['Minute (0-59)', 'Hour (0-23)', 'Day of Month (1-31)', 'Month (1-12)', 'Day of Week (0-6)']
const PRESETS = [
  { label: 'Every 5 minutes', value: '*/5 * * * *' },
  { label: 'Every hour', value: '0 * * * *' },
  { label: 'Daily at midnight', value: '0 0 * * *' },
  { label: 'Weekdays at 9 AM', value: '0 9 * * 1-5' },
  { label: 'Every Monday at 6 AM', value: '0 6 * * 1' },
  { label: '1st of each month', value: '0 0 1 * *' },
]

function parseField(field, min, max) {
  if (field === '*' || field === '?') return Array.from({length: max-min+1}, (_, i) => i+min)
  const values = []
  field.split(',').forEach(part => {
    if (part.includes('/')) {
      const [range, step] = part.split('/')
      const s = parseInt(step)
      let rMin = min, rMax = max
      if (range !== '*') { const [a,b] = range.split('-').map(Number); rMin = a; rMax = b }
      for (let i = rMin; i <= rMax; i += s) values.push(i)
    } else if (part.includes('-')) {
      const [a, b] = part.split('-').map(Number)
      for (let i = a; i <= b; i++) values.push(i)
    } else {
      values.push(parseInt(part))
    }
  })
  return [...new Set(values)].sort((a,b) => a-b)
}

function getNextDates(expr) {
  try {
    const parts = expr.trim().split(/\s+/)
    if (parts.length !== 5) return []
    const mins = parseField(parts[0], 0, 59)
    const hours = parseField(parts[1], 0, 23)
    const doms = parseField(parts[2], 1, 31)
    const months = parseField(parts[3], 1, 12)
    const dows = parseField(parts[4], 0, 6)
    
    const dates = []
    let d = new Date()
    d.setSeconds(0, 0)
    let attempts = 0
    
    while (dates.length < 10 && attempts < 10000) {
      attempts++
      d.setMinutes(d.getMinutes() + 1)
      const month = d.getMonth() + 1
      const day = d.getDate()
      const dayOfWeek = d.getDay()
      
      if (months.includes(month) && doms.includes(day) && dows.includes(dayOfWeek) && hours.includes(d.getHours()) && mins.includes(d.getMinutes())) {
        dates.push(new Date(d))
      }
    }
    return dates
  } catch { return [] }
}

function describeField(field, name) {
  if (field === '*') return `every ${name.toLowerCase()}`
  if (field === '?') return 'any'
  if (field.startsWith('*/')) return `every ${field.slice(2)} ${name.toLowerCase()}s`
  if (field.includes('-')) return `${field.replace('-', ' to ')}`
  if (field.includes(',')) return `at ${field}`
  return `at ${field}`
}

export default function CronVisualizer() {
  const [expr, setExpr] = useState('*/5 * * * *')
  const parts = expr.trim().split(/\s+/)
  const valid = parts.length === 5
  const dates = useMemo(() => valid ? getNextDates(expr) : [], [expr])

  return (
    <ToolLayout title="Cron Expression Visualizer" description="Parse cron expressions and see exact next execution times with human-readable descriptions." category="Developer Tools">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <TextField value={expr} onChange={e => setExpr(e.target.value)}
          placeholder="e.g. */5 * * * *" size="small"
          InputProps={{ sx: { fontFamily: 'monospace', fontSize: '1.1rem' } }}
          sx={{ mb: 2, maxWidth: 300 }}
          error={!valid && expr.length > 0}
          helperText={!valid && expr.length > 0 ? 'Need 5 space-separated fields' : ''}
        />

        <Stack direction="row" spacing={1} mb={3} flexWrap="wrap" useFlexGap>
          {PRESETS.map(p => (
            <Chip key={p.value} label={p.label} onClick={() => setExpr(p.value)}
              variant={expr === p.value ? 'filled' : 'outlined'}
              color={expr === p.value ? 'primary' : 'default'}
              size="small" sx={{ fontWeight: 600 }} />
          ))}
        </Stack>

        {valid && (
          <Grid container spacing={2} mb={4}>
            {FIELDS.map((field, i) => (
              <Grid item xs={6} sm={4} md={2.4} key={field}>
                <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.1)', textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary">{field}</Typography>
                  <Typography variant="h6" fontWeight={800} fontFamily="monospace" color="#c4b5fd">{parts[i]}</Typography>
                  <Typography variant="caption" color="#8b8fa8">{describeField(parts[i], FIELDS[i].split(' ')[0])}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}

        {dates.length > 0 && (
          <Box>
            <Typography fontWeight={600} mb={2} color="#8b8fa8">Next {dates.length} Executions</Typography>
            <Paper variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden' }}>
              {dates.map((d, i) => (
                <Box key={i} sx={{
                  p: 2, display: 'flex', alignItems: 'center', gap: 3,
                  borderBottom: i < dates.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  bgcolor: i === 0 ? 'rgba(167,139,250,0.04)' : 'transparent',
                }}>
                  <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: i === 0 ? 'rgba(167,139,250,0.2)' : 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: i === 0 ? '#c4b5fd' : '#8b8fa8', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>
                    {i + 1}
                  </Box>
                  <Box flex={1}>
                    <Typography fontFamily="monospace" fontSize="0.95rem" color="#cdd6f4">
                      {d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                    </Typography>
                    <Typography fontFamily="monospace" fontSize="0.85rem" color="#8b8fa8">
                      at {d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                  </Box>
                  {i === 0 && <Chip label="NEXT" size="small" color="primary" sx={{ fontWeight: 700 }} />}
                </Box>
              ))}
            </Paper>
          </Box>
        )}
      </Paper>
    </ToolLayout>
  )
}
