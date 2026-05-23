import { useState, useMemo } from 'react'
import {
  Typography, Box, Paper, Table, TableBody, TableCell, TableRow,
  TableHead, Stack, Chip, Button, Tabs, Tab, Rating, Tooltip,
} from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import ToolLayout from '../../components/ToolLayout'

const CATEGORIES = [
  { id: 'writing', label: 'AI Writing', icon: '✍️' },
  { id: 'seo', label: 'AI SEO', icon: '🔍' },
  { id: 'image', label: 'AI Image', icon: '🎨' },
  { id: 'coding', label: 'AI Coding', icon: '💻' },
  { id: 'video', label: 'AI Video', icon: '🎬' },
]

const TOOLS = [
  // AI Writing
  {
    id: 'jasper',
    name: 'Jasper',
    category: 'writing',
    description: 'Enterprise AI writing platform with brand voice, campaigns, and team collaboration.',
    pricing: '$49/mo',
    freeTrial: '7-day trial',
    bestFor: 'Marketing teams & enterprises',
    rating: 4.5,
    strengths: ['Brand voice', 'Campaigns', 'Templates', 'SEO mode'],
    link: 'https://www.jasper.ai',
    color: '#ec4899',
  },
  {
    id: 'writesonic',
    name: 'Writesonic',
    category: 'writing',
    description: 'All-in-one AI content platform with Chatsonic, article writer, and SEO tools.',
    pricing: '$20/mo',
    freeTrial: 'Free tier available',
    bestFor: 'Bloggers & small businesses',
    rating: 4.3,
    strengths: ['Chatsonic', 'Article writer', 'SEO checker', 'Sonic editor'],
    link: 'https://writesonic.com',
    color: '#8b5cf6',
  },
  {
    id: 'copyai',
    name: 'Copy.ai',
    category: 'writing',
    description: 'AI-powered GTM platform for sales and marketing workflows.',
    pricing: '$49/mo',
    freeTrial: 'Free tier available',
    bestFor: 'Sales & GTM teams',
    rating: 4.4,
    strengths: ['Workflows', 'Sales copy', 'Brand voice', 'API access'],
    link: 'https://www.copy.ai',
    color: '#06b6d4',
  },
  {
    id: 'rytr',
    name: 'Rytr',
    category: 'writing',
    description: 'Affordable AI writer with 40+ use cases and 30+ languages support.',
    pricing: '$9/mo',
    freeTrial: 'Free plan (10k chars)',
    bestFor: 'Freelancers & budget users',
    rating: 4.2,
    strengths: ['40+ use cases', '30+ languages', 'Plagiarism check', 'Tone controls'],
    link: 'https://rytr.me',
    color: '#f59e0b',
  },
  // AI SEO
  {
    id: 'surfer',
    name: 'Surfer SEO',
    category: 'seo',
    description: 'Data-driven SEO content optimization with NLP analysis and SERP insights.',
    pricing: '$89/mo',
    freeTrial: '7-day trial',
    bestFor: 'SEO professionals & agencies',
    rating: 4.6,
    strengths: ['Content Editor', 'SERP analyzer', 'NLP scoring', 'Audit tool'],
    link: 'https://surferseo.com',
    color: '#22c55e',
  },
  {
    id: 'frase',
    name: 'Frase',
    category: 'seo',
    description: 'AI-powered content research, writing, and optimization platform.',
    pricing: '$45/mo',
    freeTrial: '5-day trial ($1)',
    bestFor: 'Content marketers & bloggers',
    rating: 4.4,
    strengths: ['Content briefs', 'SERP research', 'AI writer', 'Analytics'],
    link: 'https://www.frase.io',
    color: '#3b82f6',
  },
  {
    id: 'marketmuse',
    name: 'MarketMuse',
    category: 'seo',
    description: 'Enterprise content strategy and optimization with AI topic modeling.',
    pricing: '$149/mo',
    freeTrial: 'Free plan available',
    bestFor: 'Enterprise content teams',
    rating: 4.3,
    strengths: ['Topic modeling', 'Content briefs', 'Competitive analysis', 'Inventory'],
    link: 'https://www.marketmuse.com',
    color: '#a78bfa',
  },
  // AI Image
  {
    id: 'midjourney',
    name: 'Midjourney',
    category: 'image',
    description: 'State-of-the-art AI image generation with stunning artistic quality.',
    pricing: '$10/mo',
    freeTrial: 'Limited free generations',
    bestFor: 'Artists & designers',
    rating: 4.8,
    strengths: ['Artistic quality', 'Style control', 'Variations', 'Upscaling'],
    link: 'https://www.midjourney.com',
    color: '#6366f1',
  },
  {
    id: 'leonardo',
    name: 'Leonardo AI',
    category: 'image',
    description: 'AI art generator with fine-tuned models, canvas editor, and real-time canvas.',
    pricing: '$12/mo',
    freeTrial: 'Free tier (150 credits)',
    bestFor: 'Game assets & concept art',
    rating: 4.5,
    strengths: ['Fine-tuned models', 'Canvas editor', 'Real-time gen', 'API access'],
    link: 'https://leonardo.ai',
    color: '#14b8a6',
  },
  {
    id: 'dalle',
    name: "DALL-E 3",
    category: 'image',
    description: "OpenAI's latest image generation model with exceptional prompt understanding.",
    pricing: '$20/mo (ChatGPT+)',
    freeTrial: 'Limited via Bing',
    bestFor: 'General purpose & precise prompts',
    rating: 4.4,
    strengths: ['Prompt accuracy', 'Text rendering', 'Safety filters', 'API via OpenAI'],
    link: 'https://openai.com/dall-e-3',
    color: '#10b981',
  },
  // AI Coding
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    category: 'coding',
    description: 'AI pair programmer integrated into VS Code, JetBrains, and Neovim.',
    pricing: '$10/mo',
    freeTrial: 'Free for OSS & students',
    bestFor: 'All developers',
    rating: 4.6,
    strengths: ['Code completion', 'Chat', 'Multi-file edits', 'Agent mode'],
    link: 'https://github.com/features/copilot',
    color: '#6e7681',
  },
  {
    id: 'cursor',
    name: 'Cursor',
    category: 'coding',
    description: 'AI-first code editor built on VS Code with powerful agent capabilities.',
    pricing: '$20/mo',
    freeTrial: 'Free hobby tier',
    bestFor: 'Power users & startups',
    rating: 4.7,
    strengths: ['Agent mode', 'Composer', 'Inline editing', 'Multi-model'],
    link: 'https://cursor.sh',
    color: '#000000',
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    category: 'coding',
    description: 'AI-powered IDE by Codeium with Cascade agent for autonomous coding.',
    pricing: '$15/mo',
    freeTrial: 'Free tier available',
    bestFor: 'Full-stack developers',
    rating: 4.5,
    strengths: ['Cascade agent', 'Multi-file', 'Supercomplete', 'Terminal AI'],
    link: 'https://codeium.com/windsurf',
    color: '#f97316',
  },
  // AI Video
  {
    id: 'runway',
    name: 'Runway',
    category: 'video',
    description: 'Professional AI video generation and editing suite for creators.',
    pricing: '$15/mo',
    freeTrial: 'Free tier (125 credits)',
    bestFor: 'Video creators & filmmakers',
    rating: 4.3,
    strengths: ['Gen-3 Alpha', 'Video-to-video', 'Motion brush', 'Green screen'],
    link: 'https://runwayml.com',
    color: '#ef4444',
  },
  {
    id: 'pika',
    name: 'Pika',
    category: 'video',
    description: 'Fast and creative AI video generator with unique styles and effects.',
    pricing: '$10/mo',
    freeTrial: 'Free tier (250 credits)',
    bestFor: 'Social media creators',
    rating: 4.2,
    strengths: ['Lip sync', 'Sound effects', 'Style transfer', 'Fast generation'],
    link: 'https://pika.art',
    color: '#ec4899',
  },
  {
    id: 'synthesia',
    name: 'Synthesia',
    category: 'video',
    description: 'AI avatar video creation platform for training, marketing, and sales.',
    pricing: '$29/mo',
    freeTrial: 'Free demo video',
    bestFor: 'Corporate training & marketing',
    rating: 4.5,
    strengths: ['140+ avatars', '120+ languages', 'Templates', 'Custom avatar'],
    link: 'https://www.synthesia.io',
    color: '#2563eb',
  },
]

const COLOR_MAP = {
  writing: '#ec4899',
  seo: '#22c55e',
  image: '#8b5cf6',
  coding: '#f97316',
  video: '#ef4444',
}

export default function AIToolComparator() {
  const [category, setCategory] = useState('writing')
  const [selected, setSelected] = useState(['jasper', 'writesonic', 'surfer'])

  const filtered = useMemo(() => TOOLS.filter(t => t.category === category), [category])
  const compared = useMemo(() => {
    const s = new Set(selected)
    return TOOLS.filter(t => s.has(t.id))
  }, [selected])

  const toggleSelect = (id) => {
    setSelected(prev => {
      if (prev.includes(id)) {
        if (prev.length <= 1) return prev
        return prev.filter(x => x !== id)
      }
      if (prev.length >= 4) return [...prev.slice(1), id]
      return [...prev, id]
    })
  }

  const allIds = useMemo(() => filtered.map(t => t.id), [filtered])

  return (
    <ToolLayout
      title="AI Tool Comparator"
      description="Compare the best AI tools side by side. Find the right tool for your needs with pricing, features, and ratings."
      category="Developer Tools"
    >
      <Paper sx={{ p: { xs: 2, sm: 4 }, borderRadius: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#e8e6f0' }}>
          Select Category & Tools to Compare
        </Typography>
        <Typography variant="body2" sx={{ color: '#8b8fa8', mb: 2 }}>
          Pick a category, then click tools to compare them side by side (max 4).
        </Typography>

        <Tabs
          value={category}
          onChange={(_, v) => { setCategory(v); setSelected(filtered.filter(t => allIds.includes(t.id)).slice(0, 3).map(t => t.id)) }}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 2, '& .MuiTab-root': { minWidth: 'auto', px: 2, py: 1 } }}
        >
          {CATEGORIES.map(c => (
            <Tab
              key={c.id}
              value={c.id}
              label={`${c.icon} ${c.label}`}
              sx={{
                color: '#8b8fa8',
                '&.Mui-selected': { color: COLOR_MAP[c.id] },
              }}
            />
          ))}
        </Tabs>

        <Stack direction="row" flexWrap="wrap" gap={1} mb={3}>
          {filtered.map(t => (
            <Chip
              key={t.id}
              label={t.name}
              onClick={() => toggleSelect(t.id)}
              variant={selected.includes(t.id) ? 'filled' : 'outlined'}
              sx={{
                cursor: 'pointer',
                ...(selected.includes(t.id) && {
                  bgcolor: t.color + '22',
                  color: t.color,
                  borderColor: t.color + '44',
                  fontWeight: 700,
                }),
              }}
            />
          ))}
          <Chip
            label={`${compared.length}/4 selected`}
            variant="outlined"
            sx={{ borderColor: 'rgba(255,255,255,0.08)', color: '#6b6f80' }}
          />
        </Stack>

        {compared.length === 0 && (
          <Typography sx={{ color: '#6b6f80', textAlign: 'center', py: 4 }}>
            Select at least one tool to compare
          </Typography>
        )}

        {compared.length > 0 && (
          <Box sx={{ overflowX: 'auto' }}>
            <Table sx={{ minWidth: 600 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#a78bfa', fontWeight: 600, borderColor: 'rgba(255,255,255,0.06)', minWidth: 140 }}>
                    Feature
                  </TableCell>
                  {compared.map(t => (
                    <TableCell
                      key={t.id}
                      align="center"
                      sx={{ color: t.color, fontWeight: 700, borderColor: 'rgba(255,255,255,0.06)', minWidth: 180 }}
                    >
                      {t.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ color: '#a0a4b8', fontWeight: 500, borderColor: 'rgba(255,255,255,0.06)' }}>
                    Rating
                  </TableCell>
                  {compared.map(t => (
                    <TableCell key={t.id} align="center" sx={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                      <Stack direction="row" spacing={0.5} justifyContent="center" alignItems="center">
                        <Rating value={t.rating} precision={0.1} readOnly size="small" />
                        <Typography sx={{ color: '#e8e6f0', fontSize: '0.85rem', fontWeight: 600 }}>
                          {t.rating}
                        </Typography>
                      </Stack>
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow sx={{ bgcolor: 'rgba(255,255,255,0.02)' }}>
                  <TableCell sx={{ color: '#a0a4b8', fontWeight: 500, borderColor: 'rgba(255,255,255,0.06)' }}>
                    Pricing
                  </TableCell>
                  {compared.map(t => (
                    <TableCell key={t.id} align="center" sx={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                      <Typography sx={{ color: '#e8e6f0', fontWeight: 700, fontFamily: 'monospace' }}>
                        {t.pricing}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell sx={{ color: '#a0a4b8', fontWeight: 500, borderColor: 'rgba(255,255,255,0.06)' }}>
                    Free Tier
                  </TableCell>
                  {compared.map(t => (
                    <TableCell key={t.id} align="center" sx={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                      <Typography sx={{ color: '#22c55e', fontSize: '0.85rem' }}>
                        {t.freeTrial}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow sx={{ bgcolor: 'rgba(255,255,255,0.02)' }}>
                  <TableCell sx={{ color: '#a0a4b8', fontWeight: 500, borderColor: 'rgba(255,255,255,0.06)' }}>
                    Best For
                  </TableCell>
                  {compared.map(t => (
                    <TableCell key={t.id} align="center" sx={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                      <Typography sx={{ color: '#e8e6f0', fontSize: '0.85rem' }}>{t.bestFor}</Typography>
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell sx={{ color: '#a0a4b8', fontWeight: 500, borderColor: 'rgba(255,255,255,0.06)' }}>
                    Key Strengths
                  </TableCell>
                  {compared.map(t => (
                    <TableCell key={t.id} align="center" sx={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                      <Stack spacing={0.5} alignItems="center">
                        {t.strengths.map(s => (
                          <Chip
                            key={s}
                            label={s}
                            size="small"
                            sx={{
                              bgcolor: t.color + '15',
                              color: t.color,
                              fontSize: '0.7rem',
                              height: 22,
                            }}
                          />
                        ))}
                      </Stack>
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow sx={{ bgcolor: 'rgba(255,255,255,0.02)' }}>
                  <TableCell sx={{ color: '#a0a4b8', fontWeight: 500, borderColor: 'rgba(255,255,255,0.06)' }}>
                    Description
                  </TableCell>
                  {compared.map(t => (
                    <TableCell key={t.id} align="center" sx={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                      <Typography sx={{ color: '#8b8fa8', fontSize: '0.8rem', lineHeight: 1.6 }}>
                        {t.description}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell sx={{ color: '#a0a4b8', fontWeight: 500, borderColor: 'rgba(255,255,255,0.06)' }}>
                    Link
                  </TableCell>
                  {compared.map(t => (
                    <TableCell key={t.id} align="center" sx={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                      <Button
                        variant="outlined"
                        size="small"
                        endIcon={<OpenInNewIcon />}
                        href={t.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ borderColor: t.color + '44', color: t.color, '&:hover': { borderColor: t.color, bgcolor: t.color + '10' } }}
                      >
                        Visit
                      </Button>
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        )}

        <Box mt={4} p={3} sx={{ bgcolor: 'rgba(167,139,250,0.06)', borderRadius: 3, border: '1px solid rgba(167,139,250,0.12)' }}>
          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            <CompareArrowsIcon sx={{ color: '#a78bfa' }} />
            <Typography variant="subtitle1" sx={{ color: '#c4b5fd', fontWeight: 600 }}>
              Want to earn from AI tool reviews?
            </Typography>
          </Stack>
          <Typography variant="body2" sx={{ color: '#8b8fa8' }}>
            Many of these tools offer affiliate programs with 20-30% recurring commissions.
            Write a detailed comparison article, add your referral links, and earn passive income.
            Check our{' '}
            <Box component="span" sx={{ color: '#a78bfa', cursor: 'pointer', textDecoration: 'underline' }}>
              Commission Calculator
            </Box>
            {' '}to see how much you could make.
          </Typography>
        </Box>
      </Paper>
    </ToolLayout>
  )
}
