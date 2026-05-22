import { useState } from 'react'
import { Typography, Box, Paper, Button, TextField, Stack, IconButton, Snackbar } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import ToolLayout from '../../components/ToolLayout'

export default function FakeReceipt() {
  const [storeName, setStoreName] = useState('SuperMart Express')
  const [date] = useState(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }))
  const [items, setItems] = useState([
    { name: 'Organic Milk', qty: 2, price: 3.99 },
    { name: 'Sourdough Bread', qty: 1, price: 4.50 },
    { name: 'Free Range Eggs (12pk)', qty: 1, price: 5.99 },
    { name: 'Avocado', qty: 3, price: 1.50 },
    { name: 'Dark Chocolate Bar', qty: 1, price: 2.99 },
  ])
  const [newName, setNewName] = useState('')
  const [newPrice, setNewPrice] = useState('')

  const addItem = () => {
    if (!newName.trim() || !newPrice) return
    setItems([...items, { name: newName, qty: 1, price: parseFloat(newPrice) || 0 }])
    setNewName(''); setNewPrice('')
  }

  const removeItem = (idx) => setItems(items.filter((_, i) => i !== idx))

  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0)
  const tax = subtotal * 0.08875
  const total = subtotal + tax

  return (
    <ToolLayout title="Fake Receipt Generator" description="Generate custom fake receipts for pranks. Customize store, items, and prices." category="Fun Generators">
      <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
        {/* Receipt Preview */}
        <Paper sx={{ p: 0, borderRadius: 3, overflow: 'hidden', flex: 1, bgcolor: '#faf8f5', fontFamily: '"Courier New", monospace', border: '1px dashed #ccc' }}>
          <Box sx={{ p: 2, textAlign: 'center', borderBottom: '2px dashed #ccc' }}>
            <Typography variant="h6" sx={{ fontFamily: 'monospace', fontWeight: 700 }}>{storeName}</Typography>
            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>123 Main Street, Anytown</Typography>
            <Typography variant="caption" display="block" sx={{ fontFamily: 'monospace' }}>{date}</Typography>
          </Box>
          <Box sx={{ p: 2, borderBottom: '1px dashed #ccc' }}>
            <Box sx={{ display: 'flex', borderBottom: '1px solid #ddd', pb: 0.5, mb: 1 }}>
              <Typography variant="caption" fontWeight={700} sx={{ flex: 2, fontFamily: 'monospace' }}>Item</Typography>
              <Typography variant="caption" fontWeight={700} sx={{ flex: 0.5, textAlign: 'center', fontFamily: 'monospace' }}>Qty</Typography>
              <Typography variant="caption" fontWeight={700} sx={{ flex: 1, textAlign: 'right', fontFamily: 'monospace' }}>Price</Typography>
            </Box>
            {items.map((item, i) => (
              <Box key={i} sx={{ display: 'flex' }}>
                <Typography variant="caption" sx={{ flex: 2, fontFamily: 'monospace' }}>{item.name}</Typography>
                <Typography variant="caption" sx={{ flex: 0.5, textAlign: 'center', fontFamily: 'monospace' }}>{item.qty}</Typography>
                <Typography variant="caption" sx={{ flex: 1, textAlign: 'right', fontFamily: 'monospace' }}>${(item.qty * item.price).toFixed(2)}</Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex' }}><Typography variant="caption" sx={{ flex: 2, fontFamily: 'monospace' }}>Subtotal</Typography><Typography variant="caption" sx={{ flex: 1, textAlign: 'right', fontFamily: 'monospace' }}>${subtotal.toFixed(2)}</Typography></Box>
            <Box sx={{ display: 'flex' }}><Typography variant="caption" sx={{ flex: 2, fontFamily: 'monospace' }}>Tax (8.875%)</Typography><Typography variant="caption" sx={{ flex: 1, textAlign: 'right', fontFamily: 'monospace' }}>${tax.toFixed(2)}</Typography></Box>
            <Box sx={{ display: 'flex', mt: 1, pt: 1, borderTop: '2px solid #333' }}><Typography variant="subtitle2" fontWeight={700} sx={{ flex: 2, fontFamily: 'monospace' }}>TOTAL</Typography><Typography variant="subtitle2" fontWeight={700} sx={{ flex: 1, textAlign: 'right', fontFamily: 'monospace' }}>${total.toFixed(2)}</Typography></Box>
          </Box>
          <Box sx={{ p: 2, textAlign: 'center', borderTop: '2px dashed #ccc' }}>
            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>Thank you for shopping!</Typography>
          </Box>
        </Paper>

        {/* Editor */}
        <Paper sx={{ p: 3, borderRadius: 4, flex: 0.8 }}>
          <Typography variant="h6" fontWeight={700} mb={2}>Customize</Typography>
          <TextField value={storeName} onChange={e => setStoreName(e.target.value)} label="Store Name" size="small" fullWidth sx={{ mb: 3 }} />

          <Stack direction="row" spacing={1} mb={2}>
            <TextField value={newName} onChange={e => setNewName(e.target.value)} placeholder="Item name" size="small" sx={{ flex: 2 }} />
            <TextField value={newPrice} onChange={e => setNewPrice(e.target.value)} type="number" placeholder="Price" size="small" sx={{ width: 100 }} />
            <IconButton color="primary" onClick={addItem} disabled={!newName || !newPrice}><AddIcon /></IconButton>
          </Stack>

          {items.map((item, i) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'center', py: 0.5 }}>
              <Typography variant="body2" sx={{ flex: 1 }}>{item.name} × {item.qty} (${item.price})</Typography>
              <IconButton size="small" onClick={() => removeItem(i)}><DeleteIcon fontSize="small" /></IconButton>
            </Box>
          ))}
        </Paper>
      </Stack>
    </ToolLayout>
  )
}
