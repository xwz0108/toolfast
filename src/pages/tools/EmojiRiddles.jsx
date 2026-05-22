import { useState, useEffect } from 'react'
import { Typography, Box, Paper, Button, TextField, Stack, Chip, LinearProgress } from '@mui/material'
import ToolLayout from '../../components/ToolLayout'

const PUZZLES = [
  { e: '🌧️🐱🐶', a: 'Raining Cats and Dogs', h: 'Weather idiom' },
  { e: '🍎👁️', a: 'Apple of My Eye', h: 'Something precious' },
  { e: '🔨⏰', a: 'Hammer Time', h: 'MC Hammer' },
  { e: '🔥💡', a: 'Lightbulb Moment', h: 'Sudden idea' },
  { e: '🐝🦵', a: 'Busy Bee', h: 'Hard worker' },
  { e: '📖🐛', a: 'Bookworm', h: 'Loves reading' },
  { e: '🎂🕯️', a: 'Birthday Cake', h: 'Celebration' },
  { e: '💔', a: 'Heartbreak', h: 'Sadness' },
  { e: '🧊☕', a: 'Iced Coffee', h: 'Chilled drink' },
  { e: '👻🏠', a: 'Haunted House', h: 'Spooky' },
  { e: '🐟🌊', a: 'Big Fish', h: 'Important person' },
  { e: '⭐🎬', a: 'Movie Star', h: 'Celebrity' },
]

export default function EmojiRiddles() {
  const [current, setCurrent] = useState(null)
  const [input, setInput] = useState('')
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(0)
  const [timer, setTimer] = useState(30)
  const [active, setActive] = useState(false)
  const [hint, setHint] = useState(false)
  const [msg, setMsg] = useState('')
  const [finished, setFinished] = useState(false)

  const start = () => {
    setScore(0); setRound(1); setActive(true); setFinished(false)
    setInput(''); setHint(false); setMsg(''); setTimer(30)
    setCurrent(PUZZLES[Math.floor(Math.random() * PUZZLES.length)])
  }

  useEffect(() => {
    if (!active) return
    if (timer <= 0) { setFinished(true); setActive(false); return }
    const t = setTimeout(() => setTimer(s => s - 1), 1000)
    return () => clearTimeout(t)
  }, [timer, active])

  const check = () => {
    if (!current) return
    if (input.toLowerCase().trim() === current.a.toLowerCase()) {
      setScore(s => s + 1); setMsg('Correct!')
      setTimeout(() => { setRound(r => r + 1); setInput(''); setHint(false); setMsg('')
        setCurrent(PUZZLES[Math.floor(Math.random() * PUZZLES.length)]); setTimer(30) }, 1000)
    } else setMsg('Try again')
  }

  return (
    <ToolLayout title="Emoji Riddles" description="Guess the phrase from emoji clues! Timed rounds with hints." category="Fun Generators">
      <Paper sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
        {!active && !finished ? (
          <Box>
            <Typography variant="h5" fontWeight={700} mb={2}>Emoji Riddles</Typography>
            <Typography color="text.secondary" mb={4}>Guess words and phrases from emoji clues</Typography>
            <Button variant="contained" size="large" onClick={start}>Start Game</Button>
          </Box>
        ) : finished ? (
          <Box>
            <Typography variant="h4" fontWeight={800} color="primary.main">Game Over!</Typography>
            <Typography variant="h5" mt={2}>Score: {score}</Typography>
            <Button variant="contained" onClick={start} sx={{ mt: 3 }}>Play Again</Button>
          </Box>
        ) : (
          <>
            <Stack direction="row" justifyContent="space-between" mb={2}>
              <Chip label={`Round ${round}`} size="small" />
              <Chip label={`Score: ${score}`} color="primary" size="small" />
              <Chip label={`${timer}s`} color={timer < 10 ? 'error' : 'default'} size="small" />
            </Stack>
            <LinearProgress variant="determinate" value={(timer / 30) * 100} sx={{ mb: 4, height: 8, borderRadius: 4 }} />
            <Typography variant="h1" sx={{ fontSize: '5rem', mb: 4 }}>{current?.e}</Typography>
            <Stack direction="row" spacing={2} mb={2}>
              <TextField value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && check()}
                placeholder="Your guess..." size="small" sx={{ flex: 1 }} error={msg === 'Try again'} />
              <Button variant="contained" onClick={check}>Guess</Button>
            </Stack>
            {hint ? <Typography variant="body2" color="text.secondary">Hint: {current?.h}</Typography> :
              <Button size="small" onClick={() => setHint(true)}>Show Hint</Button>}
            {msg === 'Correct!' && <Chip label="Correct!" color="success" sx={{ mt: 2 }} />}
          </>
        )}
      </Paper>
    </ToolLayout>
  )
}
