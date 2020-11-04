import React, { useRef, useState } from 'react';
import './App.css';

function padTime(time) {
  return time.toString().padStart(2, '0')
}

function App() {

  const [title, setTitle] = useState('Let the countdown begin')

  const [timeLeft, setTimeLeft] = useState(10)

  const [isRunning, setIsRunning] = useState(false)

  let intervalRef = useRef(null)

  const startTimer = () => {
    if(intervalRef.current !== null) return
    setTitle(`You're doing great!`)
    setIsRunning(!isRunning)
    intervalRef.current = setInterval(() => {
      setTimeLeft(timeLeft => {
        if(timeLeft >= 1) {
         return timeLeft - 1
        }
        resetTimer()
         return 0
      })
    }, 1000);
  }

  const stopTimer = () => {
    if(intervalRef.current === null) return
    clearInterval(intervalRef.current)
    intervalRef.current = null
    setTitle('Keep it up!')
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = null
    setTitle('Ready to go another round?')
    setTimeLeft(10)
    setIsRunning(!isRunning)
  }

  let minutes = padTime(Math.floor(timeLeft / 60))
  let seconds = padTime(timeLeft - minutes * 60)

  return (
    <div className="App">
      <h2>{title}</h2>
      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>
      <div className="buttons">
        { !isRunning && <button onClick={startTimer}>Start</button>}
        { isRunning &&<button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}

export default App;
