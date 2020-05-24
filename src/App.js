import React, { useState, useEffect, useRef } from 'react';
import './App.scss';

function App() {
  const REMAINING_TIME = 5

  const [text, setText] = useState('')
  const [timeRemaining, setTimeRemaining] = useState(REMAINING_TIME)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [totalWords, setTotalWords] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining(prevTime => prevTime - 1)
      }, 1000)
    } 
    if (timeRemaining === 0) {
      endGame()
    }
  }, [isTimeRunning, timeRemaining])

  function handleChange(e) {
    setText(e.target.value)
  }

  function startGame() {
    setIsTimeRunning(true)
    setTimeRemaining(REMAINING_TIME)
    setText('')
    inputRef.current.disabled = false
    inputRef.current.focus()
  }

  function endGame() {
    setIsTimeRunning(false)
    setTotalWords(wordCount(text))
  }

  function wordCount(text) {
    const totalWords = text.trim().split(' ')
    return totalWords.filter(word => word !== "").length
  }

  return (
    <div className="app">
      <div className="app__container">
        <h2 className="title">How fast can you type?</h2>
        <textarea 
          ref={inputRef}
          onChange={handleChange}
          value={text}
          disabled={!isTimeRunning}
        />
        <button 
          onClick={startGame}
          disabled={isTimeRunning}
        >Start</button>
        <h3 className="time">Time remaining: {timeRemaining}</h3>
        <h3 className="count">Total word count: {totalWords}</h3>
      </div>
    </div>
  );
}

export default App;
