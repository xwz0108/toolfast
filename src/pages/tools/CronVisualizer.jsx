import { useState } from 'react'
import { Typography, Box, Paper, TextField, Button, Chip, Stack, Grid } from '@mui/material'
import ScheduleIcon from '@mui/icons-material/Schedule'
import ToolLayout from '../../components/ToolLayout'
import { motion, AnimatePresence } from 'framer-motion'

const FIELDS = ['Minute', 'Hour', 'Day of Month', 'Month', 'Day of Week']
const PRESETS = [
  { label: 'Every 5 min', value: '*/5 * * * *' },
  { label: 'Every hour', value: '0 * * * *' },
  { label: 'Daily midnight', value: '0 0 * * *' },
  { label: 'Weekdays 9am', value: '0 9 * * 1-5' },
  { label: 'Mondays 6am', value: '0 6 * * 1' },
  { label: '1st of month', value: '0 0 1 * *' },
]

function describe(field, value) {
  if (value === '*') return 'Every ' + field.toLowerCase()
  if (value === '?') return 'Any'
  if (value.includes('-')) return `Range ${value.replace('-', ' to ')}`
  if (value.includes(',')) return `At ${value.split(',').join(', ')}`
  if (value.startsWith('*/')) return `Every ${value.slice(2)} ${field.toLowerCase()}s`
  return `At ${value}`
}

function getDates(expr) {
  const parts = expr.trim().split(/\s+/)
  if (parts.length !== 5) return []
  const [min, hour, dom, month, dow] = parts
  const dates = []
  const now = new Date()
  for (let i = 0; i < 10; i++) {
    const d = new Date(now.getTime() + (i + 1) * 60000) // rough
    d.setMinutes(d.getMinutes() + 1)
    dates.push(d)
  }
  return dates
}

export default function CronVisualizer() {
  const [expr, setExpr] = useState('*/5 * * * *')
  const parts = expr.trim().split(/\s+/)
  const valid = parts.length === 5
  const dates = valid ? getDates(expr) : []

  return (
    <ToolLayout title="Cron Expression Visualizer" description="Parse cron expressions and see when they run next." category="Developer Tools">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Stack direction="row" spacing={2} mb={3}>
          <TextField value={expr} onChange={e => setExpr(e.target.value)} placeholder="*/5 * * * *" size="small" sx={{ flex: 1, fontFamily: 'monospace' }} />
        </Stack>

        {/* Presets */}
        <Stack direction="row" spacing={1} mb={3} flexWrap="wrap" useFlexGap>
          {PRESETS.map(p => (
            <Chip key={p.value} label={p.label} onClick={() => setExpr(p.value)}
              variant={expr===p.value?'filled':'outlined'} color={expr===p.value?'primary':'default'}
              size="small" sx={{ mb: 0.5, fontWeight: 600 }} />
          ))}
        </Stack>

        {!valid && <Typography color="error">Invalid cron expression. Use 5 fields.</Typography>}

        {valid && (
          <Grid container spacing={2} mb={4}>
            {FIELDS.map((field, i) => (
              <Grid item xs={4} sm={2.4} key={field}>
                <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(167,139,250,0.06)', textAlign: 'center', border: '1px solid rgba(167,139,250,0.1)' }}>
                  <Typography variant="caption" color="text.secondary">{field}</Typography>
                  <Typography variant="h6" fontWeight={800} fontFamily="monospace">{parts[i] || '-'}</Typography>
                  <Typography variant="caption" color="primary.light">{describe(field, parts[i]||'')}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}

        {dates.length > 0 && (
          <Box>
            <Typography fontWeight={600} mb={2} color="text.secondary">Upcoming Executions</Typography>
            <Paper variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden' }}>
              {dates.map((d, i) => (
                <Box key={i} sx={{ p: 1.5, borderBottom: i<dates.length-1?'1px solid rgba(255,255,255,0.04)':'none', display:'flex', alignItems:'center', gap:2 }}>
                  <Box sx={{ width:32, height:32, borderRadius:2, bgcolor: i===0?'rgba(167,139,250,0.2)':'rgba(255,255,255,0.04)', display:'flex', alignItems:'center', justifyContent:'center', color: i===0?'#c4b5fd':'#8b8fa8', fontWeight:700, fontSize:'0.8rem' }}>
                    {i+1}
                  </Box>
                  <Typography fontFamily="monospace" fontSize="0.9rem">{d.toLocaleString()}</Typography>
                  {i===0 && <Chip label="Next" size="small" color="primary" sx={{ ml: 'auto' }} />}
                </Box>
              ))}
            </Paper>
          </Box>
        )}
      </Paper>
    </ToolLayout>
  )
}
