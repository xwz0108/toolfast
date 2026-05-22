import { useState, useRef, useEffect } from 'react'
import { Typography, Box, Paper, Button, TextField, Stack, IconButton, Snackbar, Chip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import DownloadIcon from '@mui/icons-material/Download'
import ChatIcon from '@mui/icons-material/Chat'
import ToolLayout from '../../components/ToolLayout'

export default function FakeChat() {
  const [sender, setSender] = useState('Alice')
  const [receiver, setReceiver] = useState('Bob')
  const [messages, setMessages] = useState([
    { from: 'sender', text: 'Hey! Are you coming tonight?' },
    { from: 'receiver', text: 'Yeah! What time?' },
    { from: 'sender', text: '8pm. Dont be late!' },
    { from: 'receiver', text: 'Haha I wont 😂' },
  ])
  const [newMsg, setNewMsg] = useState('')
  const [side, setSide] = useState('sender')
  const [snack, setSnack] = useState(false)
  const canvasRef = useRef(null)

  const addMsg = () => {
    if (newMsg.trim()) {
      setMessages([...messages, { from: side, text: newMsg.trim() }])
      setNewMsg('')
    }
  }

  const removeMsg = (idx) => setMessages(messages.filter((_, i) => i !== idx))

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = 400, H = Math.max(300, messages.length * 70 + 120)
    canvas.width = W
    canvas.height = H
    ctx.fillStyle = '#f2f2f7'
    ctx.fillRect(0, 0, W, H)
    ctx.fillStyle = '#1a1a2e'
    ctx.font = 'bold 16px sans-serif'
    ctx.fillText(sender, 16, 40)
    ctx.font = '14px sans-serif'
    ctx.fillStyle = '#94a3b8'
    ctx.fillText('iMessage', 16, 60)

    messages.forEach((msg, i) => {
      const y = 90 + i * 65
      const textW = Math.min(ctx.measureText(msg.text).width + 30, W - 100)
      const isSender = msg.from === 'sender'
      const x = isSender ? W - textW - 20 : 20
      ctx.fillStyle = isSender ? '#4361ee' : '#e2e8f0'
      ctx.beginPath()
      ctx.roundRect(x, y, textW, 40, 20)
      ctx.fill()
      ctx.fillStyle = isSender ? '#ffffff' : '#1a1a2e'
      ctx.font = '14px sans-serif'
      ctx.fillText(msg.text, x + 15, y + 28)
    })
  }, [messages, sender, receiver])

  const download = () => {
    const link = document.createElement('a')
    link.download = 'fake-chat.png'
    link.href = canvasRef.current.toDataURL()
    link.click()
  }

  return (
    <ToolLayout title="Fake Chat Generator" description="Create realistic fake messaging screenshots. Customize names, messages, and export as image." category="Fun Generators">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          <Box flex={1}>
            <canvas ref={canvasRef} style={{ width: '100%', borderRadius: 12, border: '1px solid #e2e8f0' }} />
            <Button variant="contained" onClick={download} startIcon={<DownloadIcon />} fullWidth sx={{ mt: 2 }}>
              Download as Image
            </Button>
          </Box>

          <Box flex={1}>
            <Typography variant="h6" fontWeight={700} mb={2}>Customize</Typography>
            <Stack spacing={2} mb={3}>
              <TextField label="Your Name" value={sender} onChange={e => setSender(e.target.value)} size="small" />
              <TextField label="Contact Name" value={receiver} onChange={e => setReceiver(e.target.value)} size="small" />
            </Stack>

            {messages.map((msg, i) => (
              <Stack key={i} direction="row" spacing={1} mb={1} alignItems="center">
                <Box
                  sx={{
                    px: 2, py: 1, borderRadius: 3, maxWidth: '70%',
                    bgcolor: msg.from === 'sender' ? '#4361ee' : '#f1f5f9',
                    color: msg.from === 'sender' ? '#fff' : '#1a1a2e',
                  }}
                >
                  <Typography variant="body2">{msg.text}</Typography>
                </Box>
                <IconButton size="small" onClick={() => removeMsg(i)} sx={{ ml: 'auto' }}><DeleteIcon fontSize="small" /></IconButton>
              </Stack>
            ))}

            <Stack direction="row" spacing={1} mt={2}>
              <TextField
                value={newMsg}
                onChange={e => setNewMsg(e.target.value)}
                placeholder="Type a message..."
                size="small"
                fullWidth
                onKeyDown={e => e.key === 'Enter' && addMsg()}
              />
              <Chip
                label={side === 'sender' ? sender : receiver}
                onClick={() => setSide(s => s === 'sender' ? 'receiver' : 'sender')}
                color={side === 'sender' ? 'primary' : 'default'}
                size="small"
              />
              <IconButton onClick={addMsg} color="primary" disabled={!newMsg.trim()}><AddIcon /></IconButton>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </ToolLayout>
  )
}
