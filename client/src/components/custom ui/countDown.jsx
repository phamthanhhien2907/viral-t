import { CountdownCircleTimer } from "react-countdown-circle-timer";

const renderTime = ({ remainingTime }) => {
  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;

  return (
    <div
      role="timer"
      aria-live="assertive"
    >{`${hours}:${minutes}:${seconds}`}</div>
  );
};

export const CountDown = () => {
  return (
    <div className="App">
      <CountdownCircleTimer
        isPlaying
        duration={180}
        colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
        onComplete={() => [true, 1000]}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
};
