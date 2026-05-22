import { useState, useMemo } from 'react'
import { Typography, Box, Paper, TextField, Table, TableBody, TableRow, TableCell, Stack } from '@mui/material'
import ToolLayout from '../../components/ToolLayout'

export default function IPCalculator() {
  const [cidr, setCidr] = useState('192.168.1.0/24')

  const result = useMemo(() => {
    try {
      const [ip, prefix] = cidr.split('/')
      const prefixLen = parseInt(prefix)
      if (isNaN(prefixLen) || prefixLen < 0 || prefixLen > 32) return { error: 'Invalid prefix (0-32)' }
      const octets = ip.split('.').map(Number)
      if (octets.length !== 4 || octets.some(o => o < 0 || o > 255)) return { error: 'Invalid IP address' }

      const ipNum = octets.reduce((a, b) => (a << 8) + b, 0) >>> 0
      const mask = (~0 << (32 - prefixLen)) >>> 0
      const network = ipNum & mask
      const broadcast = network | (~mask >>> 0)
      const hostCount = Math.pow(2, 32 - prefixLen) - 2

      const toIp = n => [(n >> 24) & 255, (n >> 16) & 255, (n >> 8) & 255, n & 255].join('.')
      const toBin = n => n.toString(2).padStart(8, '0')

      return {
        ip: toIp(ipNum), mask: toIp(mask), maskBin: octets.map(toBin).join('.'),
        network: toIp(network), broadcast: toIp(broadcast),
        firstHost: toIp(network + 1), lastHost: toIp(broadcast - 1),
        hostCount: Math.max(0, hostCount), totalAddresses: Math.pow(2, 32 - prefixLen),
        prefixLen, class: octets[0] < 128 ? 'A' : octets[0] < 192 ? 'B' : octets[0] < 224 ? 'C' : octets[0] < 240 ? 'D' : 'E',
      }
    } catch { return { error: 'Invalid format. Use: 192.168.1.0/24' } }
  }, [cidr])

  return (
    <ToolLayout title="IP / CIDR Calculator" description="Calculate subnet masks, network addresses, and IP ranges." category="Developer Tools">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <TextField value={cidr} onChange={e => setCidr(e.target.value)} placeholder="e.g. 192.168.1.0/24" label="CIDR Notation" size="small" sx={{ mb: 3, maxWidth: 300 }} error={!!result.error} helperText={result.error} />
        {!result.error && (
          <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <Table size="small">
              <TableBody>
                {[
                  ['IP Address', result.ip], ['Network Mask', result.mask + ' = /' + result.prefixLen],
                  ['Mask (Binary)', <tt key="b">{result.maskBin}</tt>],
                  ['Network Address', result.network], ['Broadcast', result.broadcast],
                  ['First Usable Host', result.firstHost], ['Last Usable Host', result.lastHost],
                  ['Usable Hosts', result.hostCount.toLocaleString()], ['Total Addresses', result.totalAddresses.toLocaleString()],
                  ['IP Class', `Class ${result.class}`],
                ].map(([label, value]) => (
                  <TableRow key={label} sx={{ '&:nth-of-type(odd)': { bgcolor: 'rgba(255,255,255,0.02)' } }}>
                    <TableCell sx={{ fontWeight: 600, color: '#8b8fa8', borderColor: 'rgba(255,255,255,0.06)', width: '40%' }}>{label}</TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', color: '#cdd6f4', borderColor: 'rgba(255,255,255,0.06)' }}>{value}</TableCell>
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
