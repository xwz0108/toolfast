import { useState, useRef, useEffect } from 'react'
import { Typography, Box, Paper, Button, TextField, Stack, IconButton, Snackbar, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DownloadIcon from '@mui/icons-material/Download'
import AddIcon from '@mui/icons-material/Add'
import ToolLayout from '../../components/ToolLayout'

const TEMPLATES = [
  { name: 'Drake', top: 'Hotline Bling', bottom: 'Views', topY: 20, bottomY: 380 },
  { name: 'Distracted Boyfriend', top: 'New Framework', bottom: 'Current Project', topY: 20, bottomY: 380 },
  { name: 'Two Buttons', top: 'Sweaty Choice A', bottom: 'Sweaty Choice B', topY: 20, bottomY: 380 },
  { name: 'Change My Mind', top: 'Hot Take Here', bottom: '', topY: 20, bottomY: 380 },
  { name: 'Expanding Brain', top: 'Step 1', bottom: 'Step 2', topY: 20, bottomY: 380 },
]

const CANVAS_W = 500
const CANVAS_H = 450

export default function MemeMaker() {
  const [topText, setTopText] = useState('When You Finally')
  const [bottomText, setBottomText] = useState('Ship The Feature')
  const [snack, setSnack] = useState(false)
  const canvasRef = useRef(null)

  const draw = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#1a1a2e'
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)
    ctx.fillStyle = '#ffffff'
    const drawText = (text, y) => {
      ctx.font = `bold ${Math.min(40, Math.floor(700 / Math.max(text.length, 1)))}px "Impact", sans-serif`
      ctx.textAlign = 'center'
      ctx.fillStyle = '#ffffff'
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 3
      ctx.strokeText(text.toUpperCase(), CANVAS_W / 2, y)
      ctx.fillText(text.toUpperCase(), CANVAS_W / 2, y)
    }
    drawText(topText, 80)
    drawText(bottomText, CANVAS_H - 30)
    // Emoji placeholder
    ctx.font = '120px sans-serif'
    ctx.fillText('😂', CANVAS_W / 2, CANVAS_H / 2 + 10)
  }

  useEffect(() => { draw() }, [topText, bottomText])

  const download = () => {
    const canvas = canvasRef.current
    const link = document.createElement('a')
    link.download = 'meme.png'
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <ToolLayout title="Meme Maker" description="Create custom memes instantly. Add text and download as image." category="Creative">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H} style={{ width: '100%', borderRadius: 12, mb: 3, background: '#1a1a2e' }} />

        <Stack spacing={2} mb={3}>
          <TextField
            label="Top Text"
            value={topText}
            onChange={e => setTopText(e.target.value)}
            size="small"
            fullWidth
          />
          <TextField
            label="Bottom Text"
            value={bottomText}
            onChange={e => setBottomText(e.target.value)}
            size="small"
            fullWidth
          />
        </Stack>

        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="contained" onClick={download} startIcon={<DownloadIcon />}>Download</Button>
          <Button variant="outlined" onClick={() => { setTopText('When You'); setBottomText('Do Something') }}>Reset</Button>
        </Stack>
      </Paper>
      <Snackbar open={snack} autoHideDuration={1500} onClose={() => setSnack(false)} message="Copied!" />
    </ToolLayout>
  )
}
