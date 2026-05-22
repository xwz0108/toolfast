import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Divider,
} from '@mui/material';
import {
  ContentCopy as CopyIcon,
  Refresh as RefreshIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  Work as WorkIcon,
  Language as WebIcon,
  CreditCard as CardIcon,
} from '@mui/icons-material';
import ToolLayout from '../../components/ToolLayout';

const FIRST_NAMES_MALE = ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua', 'Kenneth', 'Kevin', 'Brian', 'George', 'Edward', 'Ronald'];
const FIRST_NAMES_FEMALE = ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Barbara', 'Elizabeth', 'Susan', 'Jessica', 'Sarah', 'Karen', 'Nancy', 'Lisa', 'Betty', 'Margaret', 'Sandra', 'Ashley', 'Dorothy', 'Kimberly', 'Emily', 'Donna', 'Michelle', 'Carol', 'Amanda', 'Melissa', 'Deborah'];
const LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris'];

const STREETS = ['Main St', 'Oak Ave', 'Maple Dr', 'Cedar Ln', 'Pine Rd', 'Elm St', 'Washington Blvd', 'Park Ave', 'Lake Dr', 'Hill Rd', 'Sunset Blvd', 'Broadway', 'River Rd', 'Forest Ave', 'Meadow Ln'];
const CITIES = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'Austin', 'Jacksonville', 'San Jose', 'Fort Worth', 'Columbus', 'Charlotte'];
const STATES = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'FL', 'OH', 'NC', 'MI', 'GA', 'WA', 'CO', 'MA', 'VA'];
const DOMAINS = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com', 'protonmail.com', 'aol.com', 'mail.com'];

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomBool = () => Math.random() > 0.5;
const pad = (n, len) => String(n).padStart(len, '0');

const generators = {
  name: () => {
    const firstName = randomItem(randomBool() ? FIRST_NAMES_MALE : FIRST_NAMES_FEMALE);
    const lastName = randomItem(LAST_NAMES);
    return `${firstName} ${lastName}`;
  },
  firstName: () => randomItem(randomBool() ? FIRST_NAMES_MALE : FIRST_NAMES_FEMALE),
  lastName: () => randomItem(LAST_NAMES),
  email: () => {
    const firstName = randomItem(randomBool() ? FIRST_NAMES_MALE : FIRST_NAMES_FEMALE);
    const lastName = randomItem(LAST_NAMES);
    const sep = randomItem(['.', '_', '']);
    const num = Math.random() > 0.7 ? randomInt(1, 999) : '';
    return `${firstName.toLowerCase()}${sep}${lastName.toLowerCase()}${num}@${randomItem(DOMAINS)}`;
  },
  phone: () => {
    const area = randomInt(200, 999);
    const prefix = randomInt(200, 999);
    const line = randomInt(1000, 9999);
    return `(${area}) ${prefix}-${line}`;
  },
  address: () => {
    const num = randomInt(100, 9999);
    return `${num} ${randomItem(STREETS)}, ${randomItem(CITIES)}, ${randomItem(STATES)} ${pad(randomInt(1, 99999), 5)}`;
  },
  zipCode: () => pad(randomInt(10000, 99999), 5),
  city: () => randomItem(CITIES),
  state: () => randomItem(STATES),
  company: () => {
    const prefixes = ['Tech', 'Global', 'United', 'American', 'National', 'Pacific', 'Atlantic', 'Summit', 'Pinnacle', 'Apex', 'Nova', 'Quantum', 'Vertex', 'Horizon', 'Prime'];
    const suffixes = ['Corporation', 'Industries', 'Group', 'Solutions', 'Technologies', 'Enterprises', 'Holdings', 'Partners', 'Systems', 'Dynamics'];
    return `${randomItem(prefixes)} ${randomItem(suffixes)}`;
  },
  jobTitle: () => {
    const titles = ['Software Engineer', 'Product Manager', 'Data Scientist', 'Marketing Director', 'Sales Manager', 'Financial Analyst', 'HR Specialist', 'Operations Manager', 'UX Designer', 'DevOps Engineer', 'Business Analyst', 'Project Manager', 'Account Executive', 'Research Scientist', 'Creative Director'];
    return randomItem(titles);
  },
  website: () => {
    const words = ['tech', 'global', 'digital', 'cloud', 'data', 'web', 'app', 'smart', 'next', 'future', 'prime', 'nova', 'apex', 'core', 'hub'];
    const tlds = ['.com', '.io', '.co', '.net', '.org', '.app', '.tech'];
    return `https://www.${randomItem(words)}${randomItem(words)}${randomItem(tlds)}`;
  },
  creditCard: () => {
    return `${pad(randomInt(1000, 9999), 4)} ${pad(randomInt(1000, 9999), 4)} ${pad(randomInt(1000, 9999), 4)} ${pad(randomInt(1000, 9999), 4)}`;
  },
  username: () => {
    const adj = ['cool', 'super', 'mega', 'ultra', 'epic', 'wild', 'dark', 'gold', 'blue', 'red'];
    const noun = ['wolf', 'eagle', 'tiger', 'dragon', 'phoenix', 'ninja', 'pirate', 'knight', 'wizard', 'hero'];
    return `${randomItem(adj)}_${randomItem(noun)}${randomInt(1, 999)}`;
  },
  ssn: () => `${pad(randomInt(100, 999), 3)}-${pad(randomInt(10, 99), 2)}-${pad(randomInt(1000, 9999), 4)}`,
  ipv4: () => `${randomInt(1, 255)}.${randomInt(0, 255)}.${randomInt(0, 255)}.${randomInt(1, 254)}`,
  color: () => `#${pad(randomInt(0, 0xFFFFFF).toString(16), 6)}`,
  uuid: () => {
    const hex = '0123456789abcdef';
    const gen = (n) => Array.from({ length: n }, () => hex[randomInt(0, 15)]).join('');
    return `${gen(8)}-${gen(4)}-4${gen(3)}-${randomItem('89ab')}${gen(3)}-${gen(12)}`;
  },
};

const typeMeta = {
  name: { icon: <PersonIcon />, label: '姓名' },
  firstName: { icon: <PersonIcon />, label: '名' },
  lastName: { icon: <PersonIcon />, label: '姓' },
  email: { icon: <EmailIcon />, label: '邮箱' },
  phone: { icon: <PhoneIcon />, label: '电话' },
  address: { icon: <HomeIcon />, label: '地址' },
  zipCode: { icon: <HomeIcon />, label: '邮编' },
  city: { icon: <HomeIcon />, label: '城市' },
  state: { icon: <HomeIcon />, label: '州' },
  company: { icon: <WorkIcon />, label: '公司' },
  jobTitle: { icon: <WorkIcon />, label: '职位' },
  website: { icon: <WebIcon />, label: '网站' },
  creditCard: { icon: <CardIcon />, label: '信用卡号' },
  username: { icon: <PersonIcon />, label: '用户名' },
  ssn: { icon: <PersonIcon />, label: 'SSN' },
  ipv4: { icon: <WebIcon />, label: 'IPv4' },
  color: { icon: <WebIcon />, label: '颜色' },
  uuid: { icon: <WebIcon />, label: 'UUID' },
};

const FakeData = () => {
  const [selectedType, setSelectedType] = useState('name');
  const [count, setCount] = useState(5);
  const [data, setData] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const generate = useCallback(() => {
    const results = [];
    for (let i = 0; i < count; i++) {
      results.push(generators[selectedType]());
    }
    setData(results);
  }, [selectedType, count]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setSnackbar({ open: true, message: '已复制到剪贴板' });
    });
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(data.join('\n')).then(() => {
      setSnackbar({ open: true, message: `已复制 ${data.length} 条数据` });
    });
  };

  const typeKeys = Object.keys(generators);

  return (
    <>
      <Helmet>
        <title>Fake Data Generator - ToolFast</title>
        <meta name="description" content="Generate fake names, emails, addresses, phone numbers, and more." />
      </Helmet>

      <ToolLayout title="Fake Data Generator" description="生成随机虚假数据，用于测试和开发">
        <Box sx={{ maxWidth: 900, mx: 'auto' }}>
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              数据类型
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              {typeKeys.map((key) => (
                <Button
                  key={key}
                  variant={selectedType === key ? 'contained' : 'outlined'}
                  size="small"
                  onClick={() => { setSelectedType(key); setData([]); }}
                  startIcon={typeMeta[key]?.icon}
                >
                  {typeMeta[key]?.label || key}
                </Button>
              ))}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2} alignItems="center">
              <Grid item xs={6} sm={3}>
                <TextField
                  label="生成数量"
                  type="number"
                  value={count}
                  onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value))))}
                  fullWidth
                  inputProps={{ min: 1, max: 100 }}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <Button
                  variant="contained"
                  onClick={generate}
                  fullWidth
                  startIcon={<RefreshIcon />}
                >
                  生成
                </Button>
              </Grid>
              {data.length > 0 && (
                <Grid item xs={12} sm={6} sx={{ textAlign: { sm: 'right' } }}>
                  <Button
                    variant="outlined"
                    onClick={handleCopyAll}
                    startIcon={<CopyIcon />}
                  >
                    复制全部
                  </Button>
                </Grid>
              )}
            </Grid>
          </Paper>

          {data.length > 0 && (
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {typeMeta[selectedType]?.label || selectedType} &times; {data.length}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {data.map((item, idx) => (
                  <Paper
                    key={idx}
                    variant="outlined"
                    sx={{
                      p: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ minWidth: 30 }}>
                        #{idx + 1}
                      </Typography>
                      <Typography
                        variant="body2"
                        fontFamily="monospace"
                        sx={{
                          color: selectedType === 'color' ? item : 'inherit',
                          bgcolor: selectedType === 'color' ? item : 'transparent',
                          px: selectedType === 'color' ? 1 : 0,
                          borderRadius: selectedType === 'color' ? 0.5 : 0,
                        }}
                      >
                        {item}
                      </Typography>
                    </Box>
                    <Tooltip title="复制">
                      <IconButton size="small" onClick={() => handleCopy(item)}>
                        <CopyIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Paper>
                ))}
              </Box>
            </Paper>
          )}
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

export default FakeData;
