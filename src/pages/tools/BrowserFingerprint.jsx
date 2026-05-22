import { useState, useEffect, useRef } from 'react'
import { Typography, Box, Paper, Chip, Stack, LinearProgress } from '@mui/material'
import FingerprintIcon from '@mui/icons-material/Fingerprint'
import CopyAllIcon from '@mui/icons-material/ContentCopy'
import ToolLayout from '../../components/ToolLayout'

export default function BrowserFingerprint() {
  const [fingerprint, setFingerprint] = useState({})
  const [hash, setHash] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const collect = async () => {
      const fp = {}
      fp['User Agent'] = navigator.userAgent
      fp['Platform'] = navigator.platform
      fp['Language'] = navigator.language
      fp['Timezone'] = Intl.DateTimeFormat().resolvedOptions().timeZone
      fp['Screen Resolution'] = `${screen.width}x${screen.height}`
      fp['Color Depth'] = `${screen.colorDepth} bits`
      fp['Pixel Ratio'] = window.devicePixelRatio
      fp['Hardware Concurrency'] = navigator.hardwareConcurrency || 'N/A'
      fp['Device Memory'] = navigator.deviceMemory ? `${navigator.deviceMemory} GB` : 'N/A'
      fp['Touch Points'] = navigator.maxTouchPoints || 0
      fp['Plugins Count'] = navigator.plugins?.length || 0
      fp['WebGL Vendor'] = 'N/A'
      fp['Do Not Track'] = navigator.doNotTrack || 'unspecified'

      // Canvas fingerprint
      try {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = 200; canvas.height = 50
        ctx.textBaseline = 'top'; ctx.font = '14px Arial'
        ctx.fillStyle = '#f60'; ctx.fillRect(10, 10, 50, 30)
        ctx.fillStyle = '#069'; ctx.font = '12px Arial'
        ctx.fillText('Browser Fingerprint 🖐️', 2, 15)
        ctx.fillStyle = 'rgba(102,204,0,0.4)'; ctx.fillText('Browser Fingerprint 🖐️', 4, 17)
        fp['Canvas Hash'] = canvas.toDataURL().slice(-40)
      } catch {}

      // WebGL
      try {
        const gl = document.createElement('canvas').getContext('webgl')
        if (gl) {
          const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
          fp['WebGL Vendor'] = debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : 'N/A'
          fp['WebGL Renderer'] = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'N/A'
        }
      } catch {}

      // Fonts detection
      const testFonts = ['Arial','Verdana','Times New Roman','Courier New','Georgia','Comic Sans MS','Impact','Trebuchet MS']
      const detected = []
      try {
        const span = document.createElement('span')
        span.style.fontSize = '72px'; span.innerHTML = 'mmmmmmmmmmlli'
        document.body.appendChild(span)
        const baseWidth = span.offsetWidth
        testFonts.forEach(font => {
          span.style.fontFamily = `'${font}'`
          if (span.offsetWidth !== baseWidth) detected.push(font)
        })
        document.body.removeChild(span)
      } catch {}
      fp['Detected Fonts'] = detected.join(', ') || 'Basic fonts'

      setFingerprint(fp)
      setHash(btoa(JSON.stringify(fp)).slice(0, 32))
      setLoading(false)
    }
    collect()
  }, [])

  return (
    <ToolLayout title="Browser Fingerprint" description="See your unique browser fingerprint and understand what data websites can detect." category="Developer Tools">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        {loading ? <LinearProgress sx={{ mb: 3 }} /> : (
          <>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <FingerprintIcon sx={{ fontSize: 64, color: '#a78bfa', mb: 1 }} />
              <Typography variant="h3" fontFamily="monospace" fontWeight={800} sx={{ color: '#a78bfa', wordBreak: 'break-all' }}>{hash}</Typography>
              <Typography variant="body2">Your unique fingerprint ID</Typography>
            </Box>

            <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
              {Object.entries(fingerprint).map(([k, v], i) => (
                <Box key={k} sx={{ p: 1.5, borderBottom: i < Object.keys(fingerprint).length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="#8b8fa8">{k}</Typography>
                  <Typography variant="body2" fontFamily="monospace" sx={{ color: '#cdd6f4', maxWidth: '60%', textAlign: 'right', wordBreak: 'break-all' }}>{String(v)}</Typography>
                </Box>
              ))}
            </Paper>

            <Typography variant="caption" color="text.secondary" mt={2} display="block">
              This data is what websites can detect about your browser. It varies based on your device and settings.
            </Typography>
          </>
        )}
      </Paper>
    </ToolLayout>
  )
}
