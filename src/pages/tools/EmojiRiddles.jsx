import { useState } from 'react'
import { Typography, Box, Paper, Button, TextField, Chip } from '@mui/material'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import ToolLayout from '../../components/ToolLayout'

const PUZZLES = [
  { emoji: '🍎📱', answer: 'iPhone' },
  { emoji: '🧊🧸', answer: 'Ice Bear' },
  { emoji: '🔥🐶', answer: 'Hot Dog' },
  { emoji: '🌙🌙', answer: 'Twice' },
  { emoji: '🕷️🧑', answer: 'Spiderman' },
  { emoji: '🤴🦁', answer: 'Lion King' },
  { emoji: '⚡🧑', answer: 'Flash' },
  { emoji: '🌧️🌧️', answer: 'Rain' },
  { emoji: '👻🏡', answer: 'Haunted House' },
  { emoji: '🦇🧑', answer: 'Batman' },
  { emoji: '⭐⭐', answer: 'Starlight' },
  { emoji: '😴💤', answer: 'Sleepy' },
  { emoji: '📚🐛', answer: 'Bookworm' },
  { emoji: '🦈🌪️', answer: 'Sharknado' },
  { emoji: '👁️🐯', answer: 'Eye of the Tiger' },
  { emoji: '🕰️💣', answer: 'Time Bomb' },
  { emoji: '🥜🧈', answer: 'Peanut Butter' },
  { emoji: '🐝🐝', answer: 'Spelling Bee' },
  { emoji: '🌍🔥', answer: 'Global Warming' },
  { emoji: '💎💍', answer: 'Diamond Ring' },
]

export default function EmojiRiddles() {
  const [current, setCurrent] = useState(0)
  const [guess, setGuess] = useState('')
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [result, setResult] = useState(null) // 'correct' | 'wrong' | null
  const [finished, setFinished] = useState(false)

  const check = () => {
    if (!guess.trim()) return
    const correct = guess.toLowerCase().trim() === PUZZLES[current].answer.toLowerCase()
    if (correct) {
      setScore(s => s + 10)
      setResult('correct')
    } else {
      setResult('wrong')
    }
    setAttempts(a => {
      const na = a + 1
      setTimeout(() => {
        if (current + 1 < PUZZLES.length) { setCurrent(c => c + 1); setResult(null); setGuess('') }
        else { setFinished(true) }
      }, 1000)
      return na
    })
  }

  const reset = () => {
    setCurrent(0); setGuess(''); setScore(0); setAttempts(0); setResult(null); setFinished(false)
  }

  if (finished) return (
    <ToolLayout title="Emoji Riddles" description="Guess the phrase from emoji clues! Timed rounds and increasing difficulty." category="Fun Generators">
      <Paper sx={{ p: 6, borderRadius: 4, textAlign: 'center' }}>
        <Typography variant="h1" fontWeight={800} color="primary.main" sx={{ fontSize: '4rem' }}>{score}</Typography>
        <Typography variant="h6" mb={3}>Points!</Typography>
        <Typography color="text.secondary" mb={4}>{PUZZLES.length} riddles completed</Typography>
        <Button variant="contained" onClick={reset} startIcon={<ShuffleIcon />}>Play Again</Button>
      </Paper>
    </ToolLayout>
  )

  return (
    <ToolLayout title="Emoji Riddles" description="Guess the phrase from emoji clues! Timed rounds and increasing difficulty." category="Fun Generators">
      <Paper sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Chip label={`${current + 1}/${PUZZLES.length}`} size="small" />
          <Chip label={`Score: ${score}`} color="primary" size="small" />
        </Box>
        <Typography variant="h2" sx={{ fontSize: '4rem', mb: 4 }}>{PUZZLES[current].emoji}</Typography>
        <TextField
          value={guess}
          onChange={e => { if (!result) setGuess(e.target.value) }}
          onKeyDown={e => e.key === 'Enter' && check()}
          placeholder="What' the phrase?"
          fullWidth
          sx={{ mb: 2, maxWidth: 400, mx: 'auto', display: 'block' }}
        />
        {result && (
          <Chip
            label={result === 'correct' ? `Correct! "${PUZZLES[current].answer}"` : `Wrong! It was "${PUZZLES[current].answer}"`}
            color={result === 'correct' ? 'success' : 'error'}
            sx={{ mb: 2, fontWeight: 600 }}
          />
        )}
        <Button variant="contained" onClick={check} disabled={!!result || !guess.trim()} sx={{ px: 4 }}>
          Submit Guess
        </Button>
      </Paper>
    </ToolLayout>
  )
}
