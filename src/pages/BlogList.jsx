import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Container, Typography, Box, Grid, Paper, Chip, Stack } from '@mui/material'
import { motion } from 'framer-motion'

const posts = [
  { slug: 'sql-explain-plan-guide', title: 'How to Read SQL Execution Plans — A Visual Guide', desc: 'Learn to interpret SQL execution plans with visual examples. Stop guessing and start optimizing.', cat: 'SQL', date: 'May 2026', tool: 'sql-formatter' },
  { slug: 'jwt-tokens-explained', title: 'JWT Tokens Explained: Header, Payload, Signature', desc: 'Understand JSON Web Tokens from the ground up. Visual guide with real token examples.', cat: 'Web', date: 'May 2026', tool: 'jwt-decoder' },
  { slug: 'cron-jobs-explained', title: 'Cron Jobs Explained: A Visual Guide to Cron Syntax', desc: 'Master cron scheduling with interactive examples. Never misconfigure a cron job again.', cat: 'DevOps', date: 'May 2026', tool: 'cron-visualizer' },
  { slug: 'mermaid-diagrams-guide', title: 'Mermaid Diagrams: The Complete Beginner Guide', desc: 'Create flowcharts, sequence diagrams, and more with Mermaid. Full syntax reference.', cat: 'Docs', date: 'May 2026', tool: 'mermaid-editor' },
  { slug: 'regex-cheat-sheet', title: 'Regex Cheat Sheet with Interactive Examples', desc: 'Master regular expressions with this visual guide. Common patterns and interactive testing.', cat: 'Coding', date: 'May 2026', tool: 'regex-visualizer' },
  { slug: 'http-headers-explained', title: 'HTTP Headers Explained: A Complete Reference', desc: 'Every HTTP header you need to know. Security, caching, CORS, and more explained simply.', cat: 'Web', date: 'May 2026', tool: 'http-headers' },
  { slug: 'browser-fingerprint-guide', title: 'Understanding Browser Fingerprints — How to Check Yours', desc: 'What browser fingerprinting is, how it works, and how to see your own fingerprint.', cat: 'Privacy', date: 'May 2026', tool: 'browser-fingerprint' },
  { slug: 'ip-subnetting-guide', title: 'IP Subnetting Made Simple — CIDR Calculator Guide', desc: 'Learn subnetting the easy way. Visual CIDR guide with interactive calculator examples.', cat: 'Networking', date: 'May 2026', tool: 'ip-calculator' },
]

export default function BlogList() {
  return (
    <>
      <Helmet>
        <title>Free Developer Tutorials & Guides | ToolFast Blog</title>
        <meta name="description" content="Free developer tutorials covering SQL, JWT, cron, regex, HTTP, and more. Interactive examples built in." />
      </Helmet>
      <Container maxWidth="xl" sx={{ pt: 6, pb: 10, position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Typography variant="h2" fontWeight={700} mb={1} fontSize={{ xs: '1.6rem', md: '2.2rem' }}>Developer Tutorials</Typography>
          <Typography variant="body1" color="text.secondary" mb={5}>Learn with interactive examples — every guide embeds the tool you are learning about</Typography>
        </motion.div>
        <Grid container spacing={3}>
          {posts.map((post, i) => (
            <Grid item xs={12} sm={6} md={4} key={post.slug}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Paper component={Link} to={`/blog/${post.slug}`} sx={{ p: 3, display: 'block', height: '100%', '&:hover': { borderColor: 'rgba(167,139,250,0.3)', transform: 'translateY(-2px)' } }}>
                  <Chip label={post.cat} size="small" sx={{ mb: 2, bgcolor: 'rgba(167,139,250,0.08)', color: '#a78bfa', fontWeight: 600 }} />
                  <Typography variant="h6" fontWeight={700} mb={1}>{post.title}</Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>{post.desc}</Typography>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="caption" color="#5a5f6e">{post.date}</Typography>
                    <Chip label={`Try Tool →`} size="small" variant="outlined" sx={{ fontSize: '0.65rem', borderColor: 'rgba(167,139,250,0.2)' }} />
                  </Stack>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}
