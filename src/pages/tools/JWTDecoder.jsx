import { useState } from 'react'
import { Typography, Box, Paper, Button, TextField, Chip, Stack } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ToolLayout from '../../components/ToolLayout'

function decodeBase64(str) {
  try { return JSON.parse(atob(str.replace(/-/g,'+').replace(/_/g,'/'))) }
  catch { try { return JSON.parse(atob(str)) } catch { return null } }
}

export default function JWTDecoder() {
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3MTYyNDI2MjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c')
  const [parts, setParts] = useState({ header: null, payload: null, valid: false })
  const [message, setMessage] = useState('')

  const decode = () => {
    const p = token.split('.')
    if (p.length !== 3) { setMessage('Invalid JWT format'); return }
    const header = decodeBase64(p[0])
    const payload = decodeBase64(p[1])
    if (!header || !payload) { setMessage('Failed to decode'); return }
    setParts({ header, payload, valid: true })
    setMessage('')

    // Calculate expiry
    if (payload.exp) {
      const expDate = new Date(payload.exp * 1000)
      const now = new Date()
      if (expDate < now) setMessage('⚠ Token has expired')
    }
  }

  return (
    <ToolLayout title="JWT Decoder" description="Decode and inspect JWT tokens. View header, payload, and signature details." category="Developer Tools">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <TextField value={token} onChange={e => setToken(e.target.value)} placeholder="Paste JWT token..." fullWidth multiline rows={4} InputProps={{ sx: { fontFamily: 'monospace', fontSize: '0.85rem' } }} sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Button variant="contained" onClick={decode}>Decode</Button>
          <Button variant="outlined" onClick={() => { setToken(''); setParts({ header: null, payload: null, valid: false }); setMessage('') }}>Clear</Button>
        </Box>
        {message && <Chip label={message} color="warning" sx={{ mb: 2 }} />}
        {parts.valid && (
          <Stack spacing={3}>
            <Box><Typography variant="subtitle2" color="primary" fontWeight={600} mb={1}>HEADER: ALGORITHM & TOKEN TYPE</Typography><Paper variant="outlined" sx={{ p: 2, borderRadius: 2, fontFamily: 'monospace', whiteSpace: 'pre-wrap', bgcolor: '#1e1e2e', color: '#cdd6f4' }}>{JSON.stringify(parts.header, null, 2)}</Paper></Box>
            <Box><Typography variant="subtitle2" color="secondary.main" fontWeight={600} mb={1}>PAYLOAD: DATA & CLAIMS</Typography><Paper variant="outlined" sx={{ p: 2, borderRadius: 2, fontFamily: 'monospace', whiteSpace: 'pre-wrap', bgcolor: '#1e1e2e', color: '#cdd6f4' }}>{JSON.stringify(parts.payload, null, 2)}</Paper>
              {parts.payload.iat && <Typography variant="caption" color="text.secondary" mt={1}>Issued at: {new Date(parts.payload.iat * 1000).toLocaleString()}</Typography>}
              {parts.payload.exp && <Typography variant="caption" color="text.secondary" display="block">Expires: {new Date(parts.payload.exp * 1000).toLocaleString()}</Typography>}
            </Box>
            <Box><Typography variant="subtitle2" color="text.secondary" fontWeight={600}>SIGNATURE (VERIFY)</Typography><Paper variant="outlined" sx={{ p: 2, borderRadius: 2, fontFamily: 'monospace', fontSize: '0.75rem', overflow: 'hidden', textOverflow: 'ellipsis', bgcolor: '#1e1e2e', color: '#6c7086' }}>{token.split('.')[2]?.slice(0, 50)}...</Paper></Box>
          </Stack>
        )}
      </Paper>
    </ToolLayout>
  )
}
