import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  CheckCircle as CorrectIcon,
  Cancel as WrongIcon,
  Lightbulb as HintIcon,
  EmojiEmotions as EmojiIcon,
} from '@mui/icons-material';
import ToolLayout from '../../components/ToolLayout';

const RIDDLES = [
  { emoji: '🌧️🐱🐶', answer: 'rain cats and dogs', hint: '下大雨的英语习语' },
  { emoji: '🍎👁️', answer: 'apple of my eye', hint: '掌上明珠' },
  { emoji: '🧊🧊👶', answer: 'ice ice baby', hint: '90年代名曲' },
  { emoji: '👻🌶️', answer: 'ghost pepper', hint: '超辣的辣椒' },
  { emoji: '🐝🍀', answer: 'lucky bee', hint: '幸运的蜜蜂' },
  { emoji: '🌍🌎🌏', answer: 'world wide web', hint: '互联网的另一种说法' },
  { emoji: '👑🦁', answer: 'lion king', hint: '迪士尼经典动画' },
  { emoji: '🦇👨', answer: 'batman', hint: 'DC超级英雄' },
  { emoji: '🕷️👨', answer: 'spider man', hint: '漫威超级英雄' },
  { emoji: '⚡🧔', answer: 'lightning mcqueen', hint: '赛车总动员主角' },
  { emoji: '🧊❄️👸', answer: 'frozen', hint: '迪士尼冰雪魔法' },
  { emoji: '🐢🥷', answer: 'ninja turtles', hint: '忍者神龟' },
  { emoji: '🔴🐼', answer: 'red panda', hint: '可爱的小熊猫' },
  { emoji: '💍👑', answer: 'lord of the rings', hint: '魔戒' },
  { emoji: '🎮👑', answer: 'game of thrones', hint: '权力的游戏' },
  { emoji: '🚢⚡', answer: 'titanic', hint: '那艘不会沉的船' },
  { emoji: '🦈👶', answer: 'baby shark', hint: '儿童神曲' },
  { emoji: '💎🐶', answer: 'diamond dog', hint: '闪亮的狗' },
  { emoji: '🌙🧍', answer: 'moon walk', hint: '迈克尔杰克逊的标志性舞步' },
  { emoji: '🔥🧊', answer: 'fire and ice', hint: '冰与火' },
  { emoji: '🎹👨', answer: 'piano man', hint: 'Billy Joel 名曲' },
  { emoji: '🐉🏠', answer: 'dragon house', hint: '前传系列' },
  { emoji: '🔫🌹', answer: 'guns and roses', hint: '著名摇滚乐队' },
  { emoji: '🍌🍞', answer: 'banana bread', hint: '受欢迎的烘焙食品' },
  { emoji: '🎄🏠', answer: 'home alone', hint: '小鬼当家' },
  { emoji: '🤫🐑', answer: 'silence of the lambs', hint: '沉默的羔羊' },
  { emoji: '🪐🌎', answer: 'planet earth', hint: '我们居住的星球' },
  { emoji: '🐍✈️', answer: 'snakes on a plane', hint: '飞机上的蛇' },
  { emoji: '🦁🧙‍♀️🚪', answer: 'lion witch wardrobe', hint: '纳尼亚传奇' },
  { emoji: '✨🦖', answer: 'sparkle dinosaur', hint: '闪闪发光的恐龙' },
];

const EmojiRiddle = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [feedback, setFeedback] = useState(null); // null | 'correct' | 'wrong'
  const [showHint, setShowHint] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const currentRiddle = RIDDLES[currentIndex];
  const progress = Math.round(((currentIndex + (feedback ? 1 : 0)) / RIDDLES.length) * 100);

  const handleSubmit = useCallback(() => {
    if (!guess.trim() || feedback) return;

    const userAnswer = guess.trim().toLowerCase();
    const correctAnswer = currentRiddle.answer.toLowerCase();

    if (userAnswer === correctAnswer) {
      setFeedback('correct');
      setScore((s) => s + 1);
    } else {
      setFeedback('wrong');
    }
    setTotal((t) => t + 1);
  }, [guess, feedback, currentRiddle]);

  const handleNext = () => {
    if (currentIndex + 1 >= RIDDLES.length) {
      setGameOver(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setGuess('');
      setFeedback(null);
      setShowHint(false);
    }
  };

  const handleSkip = () => {
    setTotal((t) => t + 1);
    handleNext();
  };

  const handleReset = () => {
    const shuffled = [...RIDDLES].sort(() => Math.random() - 0.5);
    // In a real app, you'd store shuffled in state
    setCurrentIndex(0);
    setGuess('');
    setScore(0);
    setTotal(0);
    setFeedback(null);
    setShowHint(false);
    setGameOver(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (feedback) {
        handleNext();
      } else {
        handleSubmit();
      }
    }
  };

  if (gameOver) {
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    return (
      <>
        <Helmet>
          <title>Emoji Riddles - ToolFast</title>
          <meta name="description" content="Guess words and phrases from emoji combinations." />
        </Helmet>

        <ToolLayout title="Emoji Riddles" description="根据 Emoji 组合猜词语或短语">
          <Box sx={{ maxWidth: 600, mx: 'auto', textAlign: 'center' }}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <EmojiIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4" gutterBottom>
                游戏结束!
              </Typography>
              <Typography variant="h2" color="primary" fontWeight="bold" gutterBottom>
                {score} / {total}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                正确率 {pct}%
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {pct === 100 ? '太厉害了，全部答对!' : pct >= 80 ? '非常棒！' : pct >= 60 ? '不错，继续加油！' : '再多练练吧!'}
              </Typography>
              <Button variant="contained" size="large" onClick={handleReset} startIcon={<RefreshIcon />}>
                再来一局
              </Button>
            </Paper>
          </Box>
        </ToolLayout>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Emoji Riddles - ToolFast</title>
        <meta name="description" content="Guess words and phrases from emoji combinations." />
      </Helmet>

      <ToolLayout title="Emoji Riddles" description="根据 Emoji 组合猜词语或短语">
        <Box sx={{ maxWidth: 600, mx: 'auto' }}>
          <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={4}>
                <Chip label={`${currentIndex + 1} / ${RIDDLES.length}`} size="small" />
              </Grid>
              <Grid item xs={4} sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  得分: {score}/{total}
                </Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: 'right' }}>
                <Tooltip title="重新开始">
                  <IconButton size="small" onClick={handleReset}>
                    <RefreshIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            <LinearProgress variant="determinate" value={progress} sx={{ mt: 1, height: 6, borderRadius: 3 }} />
          </Paper>

          <Paper elevation={3} sx={{ p: 4, mb: 3, textAlign: 'center' }}>
            <Typography variant="h2" sx={{ mb: 3, letterSpacing: 2 }}>
              {currentRiddle.emoji}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', alignItems: 'center', mb: 3 }}>
              <TextField
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="输入你的答案..."
                disabled={!!feedback}
                fullWidth
                autoFocus
                InputProps={{
                  endAdornment: feedback === 'correct' ? (
                    <CorrectIcon color="success" />
                  ) : feedback === 'wrong' ? (
                    <WrongIcon color="error" />
                  ) : null,
                }}
              />
            </Box>

            {feedback && (
              <Box sx={{ mb: 2 }}>
                {feedback === 'correct' ? (
                  <Chip icon={<CorrectIcon />} label="正确!" color="success" />
                ) : (
                  <Box>
                    <Chip icon={<WrongIcon />} label="错误" color="error" sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      正确答案: <strong>{currentRiddle.answer}</strong>
                    </Typography>
                  </Box>
                )}
              </Box>
            )}

            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
              {!feedback ? (
                <>
                  <Button variant="contained" onClick={handleSubmit} disabled={!guess.trim()}>
                    提交
                  </Button>
                  <Button variant="text" onClick={() => setShowHint(!showHint)} startIcon={<HintIcon />}>
                    提示
                  </Button>
                  <Button variant="text" color="secondary" onClick={handleSkip}>
                    跳过
                  </Button>
                </>
              ) : (
                <Button variant="contained" onClick={handleNext}>
                  下一题
                </Button>
              )}
            </Box>

            {showHint && !feedback && (
              <Paper variant="outlined" sx={{ p: 1.5, mt: 2, bgcolor: 'info.light' }}>
                <Typography variant="body2">
                  <HintIcon sx={{ mr: 0.5, verticalAlign: 'middle', fontSize: 'small' }} />
                  {currentRiddle.hint}
                </Typography>
              </Paper>
            )}
          </Paper>
        </Box>
      </ToolLayout>
    </>
  );
};

export default EmojiRiddle;
