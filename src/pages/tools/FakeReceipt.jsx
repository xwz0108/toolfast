import React, { useState, useMemo, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  IconButton,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Snackbar,
  Alert,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  ContentCopy as CopyIcon,
  Print as PrintIcon,
  Receipt as ReceiptIcon,
} from '@mui/icons-material';
import ToolLayout from '../../components/ToolLayout';

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const STORE_NAMES = ['FreshMart Supermarket', 'QuickStop Convenience', 'MegaBuy Wholesale', 'CityGrocer', 'PrimeFoods', 'ValueMart', 'GreenLeaf Organics', 'MetroShop', 'Sunrise Foods', 'Harvest Market'];
const ITEM_POOL = [
  { name: 'Organic Milk 1L', price: 4.99 },
  { name: 'Whole Wheat Bread', price: 3.49 },
  { name: 'Free Range Eggs (12)', price: 5.99 },
  { name: 'Banana (1 lb)', price: 1.29 },
  { name: 'Chicken Breast (1 lb)', price: 7.99 },
  { name: 'Rice (2 lb bag)', price: 4.49 },
  { name: 'Pasta Sauce', price: 3.29 },
  { name: 'Cheddar Cheese', price: 5.49 },
  { name: 'Greek Yogurt', price: 3.99 },
  { name: 'Orange Juice 1L', price: 3.79 },
  { name: 'Coffee Beans 12oz', price: 8.99 },
  { name: 'Toilet Paper (6 rolls)', price: 6.49 },
  { name: 'Dish Soap', price: 2.99 },
  { name: 'Potato Chips', price: 3.49 },
  { name: 'Chocolate Bar', price: 2.49 },
  { name: 'Bottled Water (24 pack)', price: 5.99 },
  { name: 'Cereal Box', price: 4.29 },
  { name: 'Peanut Butter', price: 4.49 },
  { name: 'Strawberry Jam', price: 3.99 },
  { name: 'Frozen Pizza', price: 6.99 },
  { name: 'Ice Cream Tub', price: 5.49 },
  { name: 'Cooking Oil 1L', price: 5.99 },
  { name: 'Salt & Pepper Set', price: 4.99 },
  { name: 'Paper Towels (2 rolls)', price: 4.49 },
  { name: 'Hand Sanitizer', price: 3.99 },
];

const formatDate = (date) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const d = new Date(date);
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};

const formatTime = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

const generateReceiptNumber = () => {
  const digits = '0123456789';
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let num = '';
  for (let i = 0; i < 3; i++) num += letters[randomInt(0, 25)];
  num += '-';
  for (let i = 0; i < 8; i++) num += digits[randomInt(0, 9)];
  return num;
};

const FakeReceipt = () => {
  const [storeName, setStoreName] = useState(randomItem(STORE_NAMES));
  const [receiptDate, setReceiptDate] = useState(formatDate(new Date()));
  const [receiptNumber, setReceiptNumber] = useState(generateReceiptNumber());
  const [items, setItems] = useState(() => {
    const count = randomInt(3, 6);
    const pool = [...ITEM_POOL].sort(() => Math.random() - 0.5);
    return pool.slice(0, count).map((item, idx) => ({
      id: idx,
      name: item.name,
      price: item.price,
      quantity: randomInt(1, 3),
    }));
  });
  const [taxRate, setTaxRate] = useState(8.5);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const receiptRef = useRef(null);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );
  const tax = useMemo(() => (subtotal * taxRate) / 100, [subtotal, taxRate]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  const handleAddItem = () => {
    const poolItem = randomItem(ITEM_POOL);
    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: poolItem.name,
        price: poolItem.price,
        quantity: 1,
      },
    ]);
  };

  const handleRemoveItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleItemChange = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: field === 'quantity' ? Math.max(1, Number(value) || 1) : value } : item
      )
    );
  };

  const handleItemPriceChange = (id, value) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, price: Math.max(0, Number(value) || 0) } : item
      )
    );
  };

  const handleRandomize = () => {
    setStoreName(randomItem(STORE_NAMES));
    setReceiptDate(formatDate(new Date(Date.now() - randomInt(0, 30) * 86400000)));
    setReceiptNumber(generateReceiptNumber());
    const count = randomInt(3, 6);
    const pool = [...ITEM_POOL].sort(() => Math.random() - 0.5);
    setItems(
      pool.slice(0, count).map((item, idx) => ({
        id: Date.now() + idx,
        name: item.name,
        price: item.price,
        quantity: randomInt(1, 3),
      }))
    );
    setTaxRate(randomItem([5, 7, 8.5, 10, 12]));
    setPaymentMethod(randomItem(['Credit Card', 'Debit Card', 'Cash', 'Mobile Pay']));
  };

  const handleCopyReceipt = () => {
    const lines = [
      storeName.toUpperCase(),
      '='.repeat(32),
      `Receipt #: ${receiptNumber}`,
      `Date: ${receiptDate}  ${formatTime()}`,
      '-'.repeat(32),
      'ITEM                  QTY    PRICE',
    ];
    items.forEach((item) => {
      const name = item.name.padEnd(20).substring(0, 20);
      const qty = String(item.quantity).padStart(3);
      const price = item.price.toFixed(2).padStart(8);
      lines.push(`${name} x${qty} $${price}`);
    });
    lines.push('-'.repeat(32));
    lines.push(`Subtotal:${' '.repeat(22)}$${subtotal.toFixed(2)}`);
    lines.push(`Tax (${taxRate}%):${' '.repeat(19)}$${tax.toFixed(2)}`);
    lines.push(`TOTAL:${' '.repeat(25)}$${total.toFixed(2)}`);
    lines.push('='.repeat(32));
    lines.push(`Payment: ${paymentMethod}`);
    lines.push('Thank you for your purchase!');

    navigator.clipboard.writeText(lines.join('\n')).then(() => {
      setSnackbar({ open: true, message: '收据已复制到剪贴板' });
    });
  };

  return (
    <>
      <Helmet>
        <title>Fake Receipt Generator - ToolFast</title>
        <meta name="description" content="Generate realistic fake receipts for fun and pranks." />
      </Helmet>

      <ToolLayout title="Fake Receipt Generator" description="生成逼真的模拟购物收据">
        <Box sx={{ maxWidth: 900, mx: 'auto' }}>
          <Grid container spacing={3}>
            {/* Editor Panel */}
            <Grid item xs={12} md={5}>
              <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  收据设置
                </Typography>

                <TextField
                  label="商店名称"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  fullWidth
                  size="small"
                  sx={{ mb: 2 }}
                />

                <Grid container spacing={1} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <TextField
                      label="日期"
                      value={receiptDate}
                      onChange={(e) => setReceiptDate(e.target.value)}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="收据编号"
                      value={receiptNumber}
                      onChange={(e) => setReceiptNumber(e.target.value)}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                </Grid>

                <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                  <InputLabel>支付方式</InputLabel>
                  <Select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    label="支付方式"
                  >
                    <MenuItem value="Credit Card">Credit Card</MenuItem>
                    <MenuItem value="Debit Card">Debit Card</MenuItem>
                    <MenuItem value="Cash">Cash</MenuItem>
                    <MenuItem value="Mobile Pay">Mobile Pay</MenuItem>
                    <MenuItem value="Gift Card">Gift Card</MenuItem>
                  </Select>
                </FormControl>

                <Typography variant="body2" gutterBottom>
                  税率: {taxRate}%
                </Typography>
                <Slider
                  value={taxRate}
                  onChange={(e, val) => setTaxRate(val)}
                  min={0}
                  max={20}
                  step={0.5}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(v) => `${v}%`}
                  sx={{ mb: 2 }}
                />
              </Paper>

              <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">商品列表</Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={handleAddItem}
                  >
                    添加商品
                  </Button>
                </Box>

                {items.map((item, idx) => (
                  <Box key={item.id} sx={{ mb: 1.5 }}>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs={5}>
                        <TextField
                          size="small"
                          value={item.name}
                          onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                          placeholder="商品名"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          size="small"
                          type="number"
                          value={item.price}
                          onChange={(e) => handleItemPriceChange(item.id, e.target.value)}
                          inputProps={{ min: 0, step: 0.01 }}
                          placeholder="价格"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          size="small"
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(item.id, 'quantity', Number(e.target.value))}
                          inputProps={{ min: 1 }}
                          placeholder="数量"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={items.length <= 1}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Paper>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="contained" startIcon={<RefreshIcon />} onClick={handleRandomize} fullWidth>
                  随机生成
                </Button>
                <Button variant="outlined" startIcon={<CopyIcon />} onClick={handleCopyReceipt} fullWidth>
                  复制文本
                </Button>
              </Box>
            </Grid>

            {/* Receipt Preview */}
            <Grid item xs={12} md={7}>
              <Paper
                elevation={3}
                ref={receiptRef}
                sx={{
                  p: 4,
                  maxWidth: 380,
                  mx: 'auto',
                  fontFamily: '"Courier New", Courier, monospace',
                  bgcolor: '#faf8f5',
                  border: '1px dashed #ccc',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    right: 8,
                    bottom: 8,
                    border: '1px solid #e0e0e0',
                    pointerEvents: 'none',
                  },
                }}
              >
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <ReceiptIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    fontFamily="inherit"
                    letterSpacing={1}
                  >
                    {storeName.toUpperCase()}
                  </Typography>
                  <Box
                    sx={{
                      borderTop: '2px dashed #999',
                      borderBottom: '2px dashed #999',
                      py: 0.5,
                      my: 1,
                    }}
                  >
                    <Typography variant="body2" fontFamily="inherit">
                      Receipt #: {receiptNumber}
                    </Typography>
                    <Typography variant="body2" fontFamily="inherit">
                      {receiptDate}  {formatTime()}
                    </Typography>
                  </Box>
                </Box>

                {/* Column Headers */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #ccc',
                    pb: 0.5,
                    mb: 1,
                  }}
                >
                  <Typography variant="caption" fontFamily="inherit" fontWeight="bold" sx={{ flex: 2 }}>
                    ITEM
                  </Typography>
                  <Typography variant="caption" fontFamily="inherit" fontWeight="bold" sx={{ flex: 0.5, textAlign: 'center' }}>
                    QTY
                  </Typography>
                  <Typography variant="caption" fontFamily="inherit" fontWeight="bold" sx={{ flex: 1, textAlign: 'right' }}>
                    PRICE
                  </Typography>
                </Box>

                {/* Items */}
                {items.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 0.5,
                    }}
                  >
                    <Typography variant="body2" fontFamily="inherit" sx={{ flex: 2 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" fontFamily="inherit" sx={{ flex: 0.5, textAlign: 'center' }}>
                      x{item.quantity}
                    </Typography>
                    <Typography variant="body2" fontFamily="inherit" sx={{ flex: 1, textAlign: 'right' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                ))}

                <Box sx={{ borderTop: '1px solid #999', mt: 2, pt: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" fontFamily="inherit">Subtotal:</Typography>
                    <Typography variant="body2" fontFamily="inherit">${subtotal.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" fontFamily="inherit">Tax ({taxRate}%):</Typography>
                    <Typography variant="body2" fontFamily="inherit">${tax.toFixed(2)}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      borderTop: '2px solid #333',
                      borderBottom: '2px solid #333',
                      py: 0.5,
                      mt: 0.5,
                    }}
                  >
                    <Typography variant="body1" fontFamily="inherit" fontWeight="bold">TOTAL:</Typography>
                    <Typography variant="body1" fontFamily="inherit" fontWeight="bold">${total.toFixed(2)}</Typography>
                  </Box>
                </Box>

                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Typography variant="body2" fontFamily="inherit">
                    Payment: {paymentMethod}
                  </Typography>
                  <Typography variant="body2" fontFamily="inherit" sx={{ mt: 0.5 }}>
                    Items: {items.reduce((s, i) => s + i.quantity, 0)}
                  </Typography>
                </Box>

                <Box sx={{ textAlign: 'center', mt: 2, borderTop: '1px solid #ccc', pt: 1 }}>
                  <Typography variant="body2" fontFamily="inherit" fontStyle="italic">
                    Thank you for your purchase!
                  </Typography>
                  <Typography variant="caption" fontFamily="inherit" color="text.secondary">
                    Have a great day!
                  </Typography>
                </Box>
              </Paper>

              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 2 }}>
                此收据仅供娱乐用途，不代表真实交易
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={2000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </ToolLayout>
    </>
  );
};

export default FakeReceipt;
