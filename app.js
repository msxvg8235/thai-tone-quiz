const { useState, useEffect, createElement: h } = React;
const { Shuffle, Check, X, RotateCcw, Trophy } = lucide;

const TONE_INFO = {
  'L': { name: 'Low', color: 'bg-blue-500', emoji: '↘️' },
  'M': { name: 'Mid', color: 'bg-gray-500', emoji: '→' },
  'R': { name: 'Rising', color: 'bg-green-500', emoji: '↗️' },
  'F': { name: 'Falling', color: 'bg-red-500', emoji: '↘️' },
  'H': { name: 'High', color: 'bg-purple-500', emoji: '↑' }
};

const FEEDBACK_MESSAGES = {
  poor: {
    title: "Keep Practicing! 💪",
    message: "Don't give up! Learning Thai tones takes time and practice.",
    color: "bg-orange-100 border-orange-300 text-orange-800"
  },
  good: {
    title: "Good Progress! 👍",
    message: "You're getting better! Keep up the good work.",
    color: "bg-blue-100 border-blue-300 text-blue-800"
  },
  great: {
    title: "Great Job! 🌟",
    message: "You're doing really well! Your tone recognition is improving.",
    color: "bg-green-100 border-green-300 text-green-800"
  },
  brilliant: {
    title: "Brilliant! 🎉",
    message: "Exceptional performance! You've mastered these tones!",
    color: "bg-purple-100 border-purple-300 text-purple-800"
  }
};

function getFeedbackLevel(correctCount, totalCount) {
  const percentage = (correctCount / totalCount) * 100;
  if (percentage <= 40) return 'poor';
  if (percentage <= 70) return 'good';
  if (percentage <= 90) return 'great';
  return 'brilliant';
}

function ThaiToneQuiz() {
  const [vocabulary, setVocabulary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availableWords, setAvailableWords] = useState([]);
  const [usedWords, setUsedWords] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [recentResults, setRecentResults] = useState([]);
  const [totalScore, setTotalScore] = useState({ correct: 0, total: 0 });
  const [showFeedback, setShowFeedback] = useState(false);

  // Load vocabulary from JSON file
  useEffect(() => {
    fetch('data/vocabulary.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load vocabulary');
        }
        return response.json();
      })
      .then(data => {
        setVocabulary(data.vocab);
        setAvailableWords([...data.vocab]);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Load first word when vocabulary is ready
  useEffect(() => {
    if (vocabulary.length > 0 && !currentWord) {
      loadNewWord();
    }
  }, [vocabulary]);

  const loadNewWord = () => {
    // If no words available, refill from used words
    if (availableWords.length === 0) {
      setAvailableWords([...usedWords]);
      setUsedWords([]);
    }

    const words = availableWords.length > 0 ? availableWords : [...vocabulary];
    if (words.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * words.length);
    const word = words[randomIndex];
    
    // Remove word from available and add to used
    const newAvailable = words.filter((_, idx) => idx !== randomIndex);
    setAvailableWords(newAvailable);
    setUsedWords(prev => [...prev, word]);
    
    setCurrentWord(word);
    setUserAnswers(new Array(word.syllables.length).fill(null));
    setShowResult(false);
    setShowFeedback(false);
  };

  const handleToneSelect = (syllableIndex, tone) => {
    if (showResult) return;
    const newAnswers = [...userAnswers];
    newAnswers[syllableIndex] = tone;
    setUserAnswers(newAnswers);
  };

  const checkAnswers = () => {
    const allAnswered = userAnswers.every(answer => answer !== null);
    if (!allAnswered) {
      alert('Please select a tone for all syllables!');
      return;
    }

    const correct = userAnswers.every((answer, index) => 
      answer === currentWord.syllables[index].tone
    );

    // Update recent results (keep last 20)
    const newRecentResults = [...recentResults, correct];
    if (newRecentResults.length > 20) {
      newRecentResults.shift();
    }
    setRecentResults(newRecentResults);

    // Update total score
    setTotalScore({
      correct: totalScore.correct + (correct ? 1 : 0),
      total: totalScore.total + 1
    });

    setShowResult(true);

    // Show feedback every 20 questions
    if ((totalScore.total + 1) % 20 === 0) {
      setShowFeedback(true);
    }
  };

  const nextWord = () => {
    loadNewWord();
  };

  const resetQuiz = () => {
    setAvailableWords([...vocabulary]);
    setUsedWords([]);
    setRecentResults([]);
    setTotalScore({ correct: 0, total: 0 });
    setShowFeedback(false);
    loadNewWord();
  };

  if (loading) {
    return h('div', {
      className: 'flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100'
    }, h('div', { className: 'text-center' },
      h('div', { className: 'loader mx-auto mb-4' }),
      h('p', { className: 'text-gray-600' }, 'Loading vocabulary...')
    ));
  }

  if (error) {
    return h('div', {
      className: 'flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100'
    }, h('div', { className: 'text-center bg-white p-8 rounded-lg shadow-lg' },
      h(X, { className: 'w-16 h-16 text-red-500 mx-auto mb-4' }),
      h('h2', { className: 'text-2xl font-bold text-gray-800 mb-2' }, 'Error Loading App'),
      h('p', { className: 'text-gray-600' }, error)
    ));
  }

  if (!currentWord) {
    return h('div', {
      className: 'flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100'
    }, h('div', { className: 'text-center' },
      h('div', { className: 'loader mx-auto mb-4' }),
      h('p', { className: 'text-gray-600' }, 'Preparing quiz...')
    ));
  }

  const isCorrect = showResult && userAnswers.every((answer, index) => 
    answer === currentWord.syllables[index].tone
  );

  const recentCorrectCount = recentResults.filter(r => r).length;
  const feedbackLevel = getFeedbackLevel(recentCorrectCount, recentResults.length);
  const feedback = FEEDBACK_MESSAGES[feedbackLevel];

  return h('div', {
    className: 'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8'
  },
    h('div', { className: 'max-w-3xl mx-auto' },
      // Header
      h('div', { className: 'bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6' },
        h('div', { className: 'flex items-center justify-between flex-wrap gap-4' },
          h('h1', { className: 'text-2xl sm:text-3xl font-bold text-gray-800' }, 'Thai Tone Quiz'),
          h('div', { className: 'flex gap-4' },
            h('div', { className: 'text-right' },
              h('div', { className: 'text-sm text-gray-600' }, 'Total Score'),
              h('div', { className: 'text-2xl font-bold text-indigo-600' },
                `${totalScore.correct} / ${totalScore.total}`
              )
            ),
            h('div', { className: 'text-right' },
              h('div', { className: 'text-sm text-gray-600' }, 'Remaining'),
              h('div', { className: 'text-2xl font-bold text-green-600' },
                availableWords.length
              )
            )
          )
        ),
        recentResults.length > 0 && h('div', { className: 'mt-4' },
          h('div', { className: 'text-sm text-gray-600 mb-2' },
            `Last 20 questions: ${recentCorrectCount}/${recentResults.length} correct`
          ),
          h('div', { className: 'flex gap-1 flex-wrap' },
            recentResults.map((result, idx) =>
              h('div', {
                key: idx,
                className: `w-4 h-4 rounded ${result ? 'bg-green-500' : 'bg-red-500'}`,
                title: result ? 'Correct' : 'Incorrect'
              })
            )
          )
        )
      ),

      // Feedback Message
      showFeedback && recentResults.length === 20 && h('div', {
        className: `${feedback.color} border-2 rounded-lg p-6 mb-6 shadow-lg`
      },
        h('div', { className: 'flex items-center gap-3 mb-2' },
          h(Trophy, { className: 'w-8 h-8' }),
          h('h2', { className: 'text-2xl font-bold' }, feedback.title)
        ),
        h('p', { className: 'text-lg mb-3' }, feedback.message),
        h('p', { className: 'text-sm font-semibold' },
          `Based on the last 20 questions: ${recentCorrectCount}/20 correct (${Math.round((recentCorrectCount/20)*100)}%)`
        )
      ),

      // Main Quiz Card
      h('div', { className: 'bg-white rounded-lg shadow-xl p-4 sm:p-8' },
        // Thai Word Display
        h('div', { className: 'text-center mb-8' },
          h('div', { className: 'text-4xl sm:text-6xl font-bold mb-4 text-gray-800' },
            currentWord.thai
          ),
          h('div', { className: 'text-gray-600 italic text-base sm:text-lg' },
            currentWord.meaning
          )
        ),

        // Syllables with Tone Selection
        h('div', { className: 'space-y-6' },
          currentWord.syllables.map((syllable, index) => {

            return h('div', {
              key: index,
              className: 'border-2 border-gray-200 rounded-lg p-4 sm:p-6'
            },
              h('div', { className: 'flex items-center justify-between mb-4' },
                h('div', null,
                  h('span', { className: 'text-sm text-gray-500 font-medium' },
                    `Syllable ${index + 1}`
                  ),
                  h('div', { className: 'text-xl sm:text-2xl font-semibold text-gray-800 mt-1' },
                    syllable.romanization
                  )
                ),
                showResult && h('div', { className: 'flex items-center gap-2' },
                  userAnswers[index] === syllable.tone
                    ? h(Check, { className: 'text-green-500', size: 32 })
                    : h(X, { className: 'text-red-500', size: 32 })
                )
              ),

              // Tone Buttons
              h('div', { className: 'grid grid-cols-5 gap-2' },
                Object.entries(TONE_INFO).map(([tone, info]) => {
                  const isSelectedTone = userAnswers[index] === tone;
                  const isCorrectTone = showResult && syllable.tone === tone;
                  const isWrongTone = showResult && isSelectedTone && syllable.tone !== tone;
                  
                  let toneButtonClassName = 'py-2 sm:py-3 px-2 rounded-lg font-semibold transition-all text-sm sm:text-base ';
                  if (isSelectedTone && !showResult) {
                    toneButtonClassName += info.color + ' text-white scale-105';
                  } else if (!isSelectedTone && !showResult) {
                    toneButtonClassName += 'bg-gray-100 hover:bg-gray-200 text-gray-700';
                  } else if (isCorrectTone) {
                    toneButtonClassName += 'bg-green-500 text-white';
                  } else if (isWrongTone) {
                    toneButtonClassName += 'bg-red-500 text-white';
                  } else if (showResult && !isCorrectTone && !isWrongTone) {
                    toneButtonClassName += 'bg-gray-100 text-gray-400';
                  }
                  toneButtonClassName += ' disabled:cursor-not-allowed';

                  return h('button', {
                    key: tone,
                    onClick: () => handleToneSelect(index, tone),
                    disabled: showResult,
                    className: toneButtonClassName
                  },
                    h('div', { className: 'text-sm' }, info.emoji),
                    h('div', { className: 'text-xs mt-1' }, tone)
                  );
                })
              ),

              showResult && userAnswers[index] !== syllable.tone && h('div', {
                className: 'mt-3 text-sm text-gray-600'
              },
                'Correct: ',
                h('span', { className: 'font-semibold' },
                  `${TONE_INFO[syllable.tone].name} (${syllable.tone})`
                )
              )
            );
          })
        ),

        // Action Buttons
        h('div', { className: 'mt-8 flex gap-4' },
          !showResult
            ? h('button', {
                onClick: checkAnswers,
                className: 'flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-colors flex items-center justify-center gap-2'
              },
                h(Check, { size: 24 }),
                ' Check Answers'
              )
            : h('button', {
                onClick: nextWord,
                className: 'flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-colors flex items-center justify-center gap-2'
              },
                h(Shuffle, { size: 24 }),
                ' Next Word'
              ),
          h('button', {
            onClick: resetQuiz,
            className: 'bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-colors flex items-center justify-center gap-2'
          },
            h(RotateCcw, { size: 24 }),
            h('span', { className: 'hidden sm:inline' }, 'Reset')
          )
        ),

        // Result Message
        showResult && h('div', {
          className: `mt-6 p-4 rounded-lg text-center font-semibold ${
            isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`
        },
          isCorrect ? '🎉 Correct! Well done!' : '❌ Incorrect. Try the next one!'
        )
      ),

      // Legend
      h('div', { className: 'mt-6 bg-white rounded-lg shadow-lg p-4 sm:p-6' },
        h('h3', { className: 'font-bold text-gray-700 mb-3' }, 'Tone Legend:'),
        h('div', { className: 'grid grid-cols-5 gap-2 sm:gap-3' },
          Object.entries(TONE_INFO).map(([tone, info]) =>
            h('div', { key: tone, className: 'flex flex-col items-center' },
              h('div', {
                className: `${info.color} text-white w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center font-bold mb-1`
              }, tone),
              h('div', { className: 'text-xs text-gray-600 text-center' }, info.name)
            )
          )
        )
      ),

      // Footer
      h('div', { className: 'mt-6 text-center text-sm text-gray-600' },
        h('p', null, `Total vocabulary: ${vocabulary.length} words`)
      )
    )
  );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(h(ThaiToneQuiz));
