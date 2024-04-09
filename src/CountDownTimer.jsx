import React, { useState, useEffect } from "react";
import "./App.css";
import { Link } from "react-router-dom";

const CountDowmTimer = () => {
  const [time, setTime] = useState(300); 
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    let intervalId;
    if (timerOn && time > 0) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [timerOn, time]);

  const startTimer = () => {
    setTimerOn(true);
  };

  const stopTimer = () => {
    setTimerOn(false);
  };

  const resetTimer = () => {
    setTime(300); 
    setTimerOn(false);
  };

  const handleTimeChange = (event) => {
    setTime(parseInt(event.target.value, 10));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>COUNT DOWN TIMER</h1>
            <div>
              <p>Time remaining: {formatTime(time)}</p>
            </div>
            <div className="count">
              <input
                type="number"
                value={time}
                onChange={handleTimeChange}
                disabled={timerOn}
              />
              <button onClick={startTimer} disabled={timerOn}>
                Start 
              </button> 
              <button onClick={stopTimer} disabled={!timerOn}>
                Stop
              </button>
              <button onClick={resetTimer}>Reset</button>
            </div>
            <p className="second">For 2nd Assesment</p>
              <Link to={"/user"}><button>Click Here </button></Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountDowmTimer;
