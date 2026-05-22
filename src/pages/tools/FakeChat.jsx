import { useState } from 'react'
import { Typography, Box, Paper, Button, TextField, Stack, Chip, IconButton, Snackbar } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ToolLayout from '../../components/ToolLayout'

const DEFAULT_MESSAGES = [
  { sender: 'Alex', text: 'Hey! Are you coming to the party tonight?', side: 'left', color: '#4361ee' },
  { sender: 'You', text: 'Yeah absolutely! What time does it start?', side: 'right', color: '#2ecc71' },
  { sender: 'Alex', text: 'Around 8pm. Bring snacks if you can! 🎉', side: 'left', color: '#4361ee' },
  { sender: 'You', text: 'Will do! See you there 🙌', side: 'right', color: '#2ecc71' },
]

export default function FakeChat() {
  const [messages, setMessages] = useState(DEFAULT_MESSAGES)
  const [newSender, setNewSender] = useState('Alex')
  const [newText, setNewText] = useState('')
  const [snack, setSnack] = useState(false)

  const addMessage = (side) => {
    if (!newText.trim()) return
    setMessages([...messages, {
      sender: side === 'right' ? 'You' : newSender || 'Friend',
      text: newText, side, color: side === 'right' ? '#2ecc71' : '#4361ee',
    }])
    setNewText('')
  }

  const removeMsg = (idx) => setMessages(messages.filter((_, i) => i !== idx))

  return (
    <ToolLayout title="Fake Chat Generator" description="Create realistic fake messaging screenshots. Customize avatars, messages, and share." category="Fun Generators">
      <Stack spacing={3}>
        {/* Chat Preview */}
        <Paper sx={{ p: 2, borderRadius: 4, bgcolor: '#f0f0f5', maxWidth: 400, mx: 'auto', minHeight: 300, maxHeight: 500, overflow: 'auto' }}>
          {messages.map((msg, i) => (
            <Box key={i} sx={{ display: 'flex', flexDirection: msg.side === 'right' ? 'row-reverse' : 'row', mb: 1.5, gap: 1 }}>
              <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: msg.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>
                {msg.sender[0]}
              </Box>
              <Box>
                <Typography variant="caption" fontWeight={700} color="text.secondary">{msg.sender}</Typography>
                <Paper sx={{ p: 1.5, borderRadius: msg.side === 'right' ? '16px 16px 4px 16px' : '16px 16px 16px 4px', bgcolor: 'white', maxWidth: 240, fontSize: '0.9rem' }}>
                  {msg.text}
                </Paper>
                <IconButton size="small" onClick={() => removeMsg(i)} sx={{ visibility: 'hidden', '.MuiPaper-root:hover &': { visibility: 'visible' } }}>×</IconButton>
              </Box>
            </Box>
          ))}
        </Paper>

        {/* Editor */}
        <Paper sx={{ p: 3, borderRadius: 4 }}>
          <Typography variant="h6" fontWeight={700} mb={2}>Add Message</Typography>
          <Stack direction="row" spacing={1} mb={2}>
            <TextField value={newSender} onChange={e => setNewSender(e.target.value)} label="Sender Name" size="small" sx={{ flex: 1 }} />
          </Stack>
          <TextField value={newText} onChange={e => setNewText(e.target.value)} placeholder="Message text..." fullWidth multiline rows={2} size="small" sx={{ mb: 2 }} />
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" onClick={() => addMessage('left')} sx={{ flex: 1 }}>Add Left</Button>
            <Button variant="outlined" onClick={() => addMessage('right')} sx={{ flex: 1 }}>Add Right</Button>
            <Button variant="contained" onClick={() => { setMessages(DEFAULT_MESSAGES) }} size="small">Reset</Button>
          </Stack>
        </Paper>
      </Stack>
    </ToolLayout>
  )
}
