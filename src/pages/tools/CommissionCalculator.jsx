import { useState, useMemo } from 'react'
import {
  Typography, Box, Paper, Slider, Stack, Table, TableBody, TableCell,
  TableRow, TableHead, Chip, Divider, Grid, TextField, InputAdornment,
} from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import ToolLayout from '../../components/ToolLayout'

const PRESETS = [
  {
    name: 'VPS Hosting',
    commissionType: 'one-time',
    price: 100,
    rate: 100,
    desc: '一单 $50-200，按用户首购',
    color: '#22c55e',
  },
  {
    name: 'SaaS Tool',
    commissionType: 'recurring',
    price: 100,
    rate: 30,
    desc: '按月订阅 30% 分成，用户平均留存 12-20 月',
    color: '#a78bfa',
  },
  {
    name: 'Crypto Exchange',
    commissionType: 'split',
    price: 500,
    rate: 50,
    desc: '手续费永久分成，最高 50%',
    color: '#f59e0b',
  },
  {
    name: 'Website Builder',
    commissionType: 'one-time',
    price: 150,
    rate: 100,
    desc: '首月佣金，企业套餐可达 $1500',
    color: '#3b82f6',
  },
]

function formatMoney(n) {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

export default function CommissionCalculator() {
  const [presetIdx, setPresetIdx] = useState(1)
  const [monthlyUsers, setMonthlyUsers] = useState(10)
  const [customPrice, setCustomPrice] = useState(100)
  const [customRate, setCustomRate] = useState(30)
  const [avgMonths, setAvgMonths] = useState(16)
  const [activeUsers, setActiveUsers] = useState(100)

  const current = PRESETS[presetIdx]
  const price = customPrice
  const rate = customRate

  const results = useMemo(() => {
    const perConversion = current.commissionType === 'split'
      ? price * (rate / 100)
      : price * (rate / 100)

    const monthlyNew = monthlyUsers * perConversion
    const monthlyRecurringTotal =
      current.commissionType === 'recurring' ? activeUsers * price * (rate / 100) : 0
    const monthlySplitTotal =
      current.commissionType === 'split' ? activeUsers * price * (rate / 100) : 0
    const monthlyOneTime = current.commissionType === 'one-time' ? monthlyUsers * perConversion : 0

    let monthly = 0
    if (current.commissionType === 'recurring') monthly = monthlyRecurringTotal
    else if (current.commissionType === 'split') monthly = monthlySplitTotal
    else monthly = monthlyOneTime

    const yearly = monthly * 12
    const lifetime = current.commissionType === 'recurring'
      ? monthly * avgMonths
      : yearly * 3

    return { perConversion, monthly, yearly, lifetime }
  }, [presetIdx, monthlyUsers, activeUsers, price, rate, avgMonths, current])

  const handlePresetChange = (idx) => {
    setPresetIdx(idx)
    const p = PRESETS[idx]
    setCustomPrice(p.price)
    setCustomRate(p.rate)
  }

  return (
    <ToolLayout
      title="Affiliate Commission Calculator"
      description="Calculate your potential earnings from affiliate programs. Compare one-time, recurring, and revenue-share models."
      category="Life Calculators"
    >
      <Paper sx={{ p: { xs: 2, sm: 4 }, borderRadius: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#e8e6f0' }}>
          Select Product Type
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1} mb={3}>
          {PRESETS.map((p, i) => (
            <Chip
              key={p.name}
              label={p.name}
              onClick={() => handlePresetChange(i)}
              variant={presetIdx === i ? 'filled' : 'outlined'}
              sx={{
                ...(presetIdx === i && {
                  bgcolor: p.color + '22',
                  color: p.color,
                  borderColor: p.color + '44',
                  fontWeight: 700,
                }),
                cursor: 'pointer',
                py: 0.5,
                px: 1,
              }}
            />
          ))}
        </Stack>

        <Typography variant="body2" sx={{ color: '#8b8fa8', mb: 3 }}>
          {current.desc}
        </Typography>

        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Commission Per Sale / Monthly Fee"
              type="number"
              value={customPrice}
              onChange={e => setCustomPrice(Number(e.target.value) || 0)}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Commission Rate (%)"
              type="number"
              value={customRate}
              onChange={e => setCustomRate(Number(e.target.value) || 0)}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="New Users per Month"
              type="number"
              value={monthlyUsers}
              onChange={e => setMonthlyUsers(Number(e.target.value) || 0)}
            />
          </Grid>
        </Grid>

        {current.commissionType === 'recurring' && (
          <Grid container spacing={3} mb={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Total Active Users"
                type="number"
                value={activeUsers}
                onChange={e => setActiveUsers(Number(e.target.value) || 0)}
                helperText="Your total retained user base"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Avg User Lifetime (months)"
                type="number"
                value={avgMonths}
                onChange={e => setAvgMonths(Number(e.target.value) || 0)}
                helperText="SaaS users average 12-20 months"
              />
            </Grid>
          </Grid>
        )}

        {current.commissionType === 'split' && (
          <Grid container spacing={3} mb={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Total Active Users"
                type="number"
                value={activeUsers}
                onChange={e => setActiveUsers(Number(e.target.value) || 0)}
                helperText="Number of active traders you referred"
              />
            </Grid>
          </Grid>
        )}

        <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.06)' }} />

        <Typography variant="h6" gutterBottom sx={{ color: '#e8e6f0' }}>
          Your Earnings
        </Typography>

        <Box sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#a78bfa', fontWeight: 600, borderColor: 'rgba(255,255,255,0.06)' }}>Metric</TableCell>
                <TableCell align="right" sx={{ color: '#a78bfa', fontWeight: 600, borderColor: 'rgba(255,255,255,0.06)' }}>Amount</TableCell>
                <TableCell sx={{ color: '#a78bfa', fontWeight: 600, borderColor: 'rgba(255,255,255,0.06)' }}>Note</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ '& td': { borderColor: 'rgba(255,255,255,0.06)' } }}>
                <TableCell sx={{ color: '#a0a4b8' }}>Per Conversion</TableCell>
                <TableCell align="right" sx={{ color: current.color, fontWeight: 700, fontFamily: 'monospace', fontSize: '1.1rem' }}>
                  {formatMoney(results.perConversion)}
                </TableCell>
                <TableCell sx={{ color: '#6b6f80', fontSize: '0.85rem' }}>
                  {current.commissionType === 'one-time' ? '一次性佣金' : current.commissionType === 'recurring' ? '每用户/月' : '每活跃用户/月'}
                </TableCell>
              </TableRow>
              <TableRow sx={{ '& td': { borderColor: 'rgba(255,255,255,0.06)' }, bgcolor: 'rgba(255,255,255,0.02)' }}>
                <TableCell sx={{ color: '#a0a4b8' }}>Monthly Income</TableCell>
                <TableCell align="right" sx={{ color: '#22c55e', fontWeight: 700, fontFamily: 'monospace', fontSize: '1.3rem' }}>
                  {formatMoney(results.monthly)}
                </TableCell>
                <TableCell sx={{ color: '#6b6f80', fontSize: '0.85rem' }}>每月稳定收入</TableCell>
              </TableRow>
              <TableRow sx={{ '& td': { borderColor: 'rgba(255,255,255,0.06)' } }}>
                <TableCell sx={{ color: '#a0a4b8' }}>Yearly Income</TableCell>
                <TableCell align="right" sx={{ color: '#22c55e', fontWeight: 700, fontFamily: 'monospace', fontSize: '1.1rem' }}>
                  {formatMoney(results.yearly)}
                </TableCell>
                <TableCell sx={{ color: '#6b6f80', fontSize: '0.85rem' }}>年化收入</TableCell>
              </TableRow>
              <TableRow sx={{ '& td': { borderColor: 'rgba(255,255,255,0.06)' }, bgcolor: 'rgba(255,255,255,0.02)' }}>
                <TableCell sx={{ color: '#a0a4b8' }}>Est. Lifetime Value</TableCell>
                <TableCell align="right" sx={{ color: '#f59e0b', fontWeight: 700, fontFamily: 'monospace', fontSize: '1.1rem' }}>
                  {formatMoney(results.lifetime)}
                </TableCell>
                <TableCell sx={{ color: '#6b6f80', fontSize: '0.85rem' }}>
                  {current.commissionType === 'one-time' ? '3年预估' : `基于 ${avgMonths} 月留存`}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>

        <Box mt={4} p={3} sx={{ bgcolor: 'rgba(167,139,250,0.06)', borderRadius: 3, border: '1px solid rgba(167,139,250,0.12)' }}>
          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            <TrendingUpIcon sx={{ color: '#a78bfa' }} />
            <Typography variant="subtitle1" sx={{ color: '#c4b5fd', fontWeight: 600 }}>
              Scale It Up
            </Typography>
          </Stack>
          <Typography variant="body2" sx={{ color: '#8b8fa8' }}>
            Write 20 quality review articles on Medium. Each article drives 1-5 conversions per month.
            With {monthlyUsers} conversions/month at {formatMoney(results.perConversion)} each,
            <strong style={{ color: '#e8e6f0' }}> that's {formatMoney(results.monthly)}/month passive income</strong>.
            The best part? Content ranks on Google for 2-3 years.
          </Typography>
        </Box>
      </Paper>
    </ToolLayout>
  )
}
