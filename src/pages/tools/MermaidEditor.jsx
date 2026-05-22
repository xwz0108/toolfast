import { useState, useEffect, useRef } from 'react'
import { Typography, Box, Paper, Button, TextField, Stack, Snackbar } from '@mui/material'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DownloadIcon from '@mui/icons-material/Download'
import ToolLayout from '../../components/ToolLayout'
import { motion } from 'framer-motion'

const DEFAULT_DIAGRAM = `graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Success]
    B -->|No| D[Failure]
    C --> E[Complete]
    D --> E`

export default function MermaidEditor() {
  const [code, setCode] = useState(DEFAULT_DIAGRAM)
  const [error, setError] = useState('')
  const [snack, setSnack] = useState(false)
  const containerRef = useRef(null)
  const mermaidRef = useRef(null)

  useEffect(() => {
    if (!window.mermaid) {
      const script = document.createElement('script')
      script.src = 'https://unpkg.com/mermaid@10/dist/mermaid.min.js'
      script.onload = () => {
        window.mermaid.initialize({ startOnLoad: false, theme: 'dark', securityLevel: 'loose' })
        renderDiagram(code)
      }
      document.head.appendChild(script)
    } else {
      renderDiagram(code)
    }
  }, [])

  const renderDiagram = async (diagramCode) => {
    if (!window.mermaid) return
    if (!containerRef.current) return
    try {
      setError('')
      const id = 'mermaid-' + Date.now()
      const { svg } = await window.mermaid.render(id, diagramCode)
      containerRef.current.innerHTML = svg
    } catch (e) {
      setError(e.message || 'Invalid diagram syntax')
      containerRef.current.innerHTML = ''
    }
  }

  const handleChange = (e) => {
    setCode(e.target.value)
    setTimeout(() => renderDiagram(e.target.value), 300)
  }

  const download = () => {
    const svg = containerRef.current?.innerHTML
    if (!svg) return
    const blob = new Blob([svg], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'diagram.svg'; a.click()
  }

  return (
    <ToolLayout title="Mermaid Diagram Editor" description="Live-preview Mermaid.js diagrams directly in the browser. Flowcharts, sequence diagrams, and more." category="Developer Tools">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          <Box flex={1}>
            <Typography fontWeight={600} mb={1} color="text.secondary" variant="body2">Mermaid Code</Typography>
            <TextField value={code} onChange={handleChange} fullWidth multiline rows={12}
              InputProps={{ sx: { fontFamily: 'monospace', fontSize: '0.85rem' } }}
              sx={{ mb: 2 }}
            />
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" size="small" startIcon={<ContentCopyIcon />}
                onClick={() => { navigator.clipboard.writeText(code); setSnack(true) }}>Copy Code</Button>
              <Button variant="outlined" size="small" startIcon={<DownloadIcon />} onClick={download}>Download SVG</Button>
            </Stack>
          </Box>
          <Box flex={1}>
            <Typography fontWeight={600} mb={1} color="text.secondary" variant="body2">Preview</Typography>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
              {error ? (
                <Typography color="error" variant="body2">{error}</Typography>
              ) : (
                <Box ref={containerRef} sx={{ '& svg': { maxWidth: '100%', height: 'auto' } }} />
              )}
            </Paper>
          </Box>
        </Stack>
      </Paper>
      <Snackbar open={snack} autoHideDuration={1500} onClose={() => setSnack(false)} message="Copied!" />
    </ToolLayout>
  )
}
