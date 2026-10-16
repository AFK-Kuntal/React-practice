import { useEffect } from "react";

function Timer({ dispatch, seconds }) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  useEffect(() => {
    const interval = setInterval(() => dispatch({ type: "tick" }), 1000);

    return () => clearInterval(interval);
  }, [dispatch]);
  return (
    <div className="timer">
      {min < 10 && "0"}
      {min} : {sec < 10 && "0"} {sec}
    </div>
  );
}

export default Timer;
