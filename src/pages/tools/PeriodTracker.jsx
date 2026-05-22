import { useState, useEffect } from 'react'
import { Typography, Box, Paper, Button, Chip, Stack, TextField } from '@mui/material'
import ToolLayout from '../../components/ToolLayout'

export default function PeriodTracker() {
  const [lastDate, setLastDate] = useState('')
  const [cycleLength, setCycleLength] = useState(28)
  const [predictions, setPredictions] = useState([])
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('periodTracker')
    if (saved) {
      const d = JSON.parse(saved)
      setLastDate(d.lastDate)
      setCycleLength(d.cycleLength)
    }
  }, [])

  const calculate = () => {
    if (!lastDate) return
    const start = new Date(lastDate + 'T00:00:00')
    const preds = []
    for (let i = 1; i <= 6; i++) {
      const next = new Date(start)
      next.setDate(next.getDate() + cycleLength * i)
      preds.push(next)
    }
    setPredictions(preds)
    localStorage.setItem('periodTracker', JSON.stringify({ lastDate, cycleLength }))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const formatDate = d => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

  return (
    <ToolLayout title="Period Tracker" description="Track and predict menstrual cycles. Private local-only storage with calendar predictions." category="Life Calculators">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Stack spacing={3} mb={4}>
          <Box>
            <Typography fontWeight={600} gutterBottom>Last Period Start Date</Typography>
            <TextField value={lastDate} onChange={e => setLastDate(e.target.value)} type="date" size="small" fullWidth InputLabelProps={{ shrink: true }} />
          </Box>
          <Box>
            <Typography fontWeight={600} gutterBottom>Cycle Length ({cycleLength} days)</Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Button variant="outlined" size="small" onClick={() => setCycleLength(l => Math.max(20, l-1))}>-</Button>
              <Typography variant="h6" fontWeight={700}>{cycleLength}</Typography>
              <Button variant="outlined" size="small" onClick={() => setCycleLength(l => Math.min(45, l+1))}>+</Button>
            </Stack>
          </Box>
          <Button variant="contained" onClick={calculate} size="large" sx={{ px: 4 }}>Calculate Predictions</Button>
          {saved && <Chip label="Saved to browser" color="success" size="small" sx={{ alignSelf: 'center' }} />}
        </Stack>

        {predictions.length > 0 && (
          <Box>
            <Typography variant="h6" fontWeight={700} mb={2}>Next Predicted Periods</Typography>
            <Paper variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden' }}>
              {predictions.map((d, i) => (
                <Box key={i} sx={{ p: 2, borderBottom: i < predictions.length - 1 ? '1px solid #e2e8f0' : 'none', display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: i === 0 ? '#4361ee' : 'rgba(67,97,238,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: i === 0 ? '#fff' : '#4361ee', fontWeight: 700 }}>
                    {d.getDate()}
                  </Box>
                  <Box flex={1}>
                    <Typography fontWeight={600}>{formatDate(d)}</Typography>
                    <Typography variant="caption" color="text.secondary">Prediction {i + 1}</Typography>
                  </Box>
                  <Chip label={i === 0 ? 'Next' : `+${cycleLength * (i + 1)}d`} size="small" variant="outlined" />
                </Box>
              ))}
            </Paper>
          </Box>
        )}
      </Paper>
    </ToolLayout>
  )
}
