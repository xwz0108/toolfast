import { useState, useEffect } from 'react'
import { Typography, Box, Paper, Button, Table, TableBody, TableCell, TableRow, Stack, Chip } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ToolLayout from '../../components/ToolLayout'

export default function HTTPHeaders() {
  const [headers, setHeaders] = useState({})

  const fetchHeaders = async () => {
    const h = {}
    h['User-Agent'] = navigator.userAgent
    h['Language'] = navigator.language
    h['Platform'] = navigator.platform
    h['Cookies Enabled'] = navigator.cookieEnabled ? 'Yes' : 'No'
    h['Online'] = navigator.onLine ? 'Yes' : 'No'
    h['Screen'] = `${window.screen.width}x${window.screen.height}`
    h['Timezone'] = Intl.DateTimeFormat().resolvedOptions().timeZone
    h['Touch Support'] = 'ontouchstart' in window ? `${navigator.maxTouchPoints} points` : 'No'
    h['Hardware Concurrency'] = navigator.hardwareConcurrency || 'Unknown'
    h['Device Memory'] = navigator.deviceMemory ? `${navigator.deviceMemory}GB` : 'Unknown'
    try {
      const res = await fetch('https://httpbin.org/headers')
      const data = await res.json()
      h['Accept'] = data.headers?.Accept || 'N/A'
      h['Accept-Language'] = data.headers?.['Accept-Language'] || navigator.language
      h['Host'] = data.headers?.Host || 'N/A'
    } catch {}
    setHeaders(h)
  }

  useEffect(() => { fetchHeaders() }, [])

  return (
    <ToolLayout title="HTTP Headers Analyzer" description="See what HTTP headers your browser sends to every website." category="Developer Tools">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Stack direction="row" spacing={2} mb={3}>
          <Button variant="contained" startIcon={<RefreshIcon />} onClick={fetchHeaders}>Refresh</Button>
          <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={() => navigator.clipboard.writeText(JSON.stringify(headers, null, 2))}>Copy JSON</Button>
        </Stack>
        {Object.keys(headers).length > 0 && (
          <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <Table size="small">
              <TableBody>
                {Object.entries(headers).map(([k, v]) => (
                  <TableRow key={k} sx={{ '&:nth-of-type(odd)': { bgcolor: 'rgba(255,255,255,0.02)' } }}>
                    <TableCell sx={{ fontWeight: 600, color: '#a78bfa', fontFamily: 'monospace', fontSize: '0.85rem', borderColor: 'rgba(255,255,255,0.06)' }}>{k}</TableCell>
                    <TableCell sx={{ color: '#cdd6f4', fontFamily: 'monospace', fontSize: '0.85rem', borderColor: 'rgba(255,255,255,0.06)' }}>{String(v)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Paper>
    </ToolLayout>
  )
}
