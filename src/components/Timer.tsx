import { useState, useEffect, useCallback } from 'react'

const Timer = ({ targetDate, eventName } : { targetDate: Date, eventName: string }) => {
  const calculateTimeRemaining = useCallback(() => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();
    return difference > 0 ? Math.floor(difference / 1000) : 0;
  }, [targetDate]);


  const [time, setTime] = useState<number>(calculateTimeRemaining)


  useEffect(() => {
    setTime(calculateTimeRemaining());

    const timer = setInterval(() => {
      setTime(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeRemaining]);

  const formatTime = () => {
    const days = Math.floor(time / (24 * 3600));
    const hours = Math.floor((time % (24 * 3600)) / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`
  }


  return (
  <div className="color-white bg-white/10 p-9 text-white text-center hover:bg-white/20 rounded-full border-white">
    <h3 className="text-2xl font-bold">
      {formatTime()}
    </h3>
    until
    <h2 className="text-xl font-bold">
       {eventName}
    </h2>
  </div>
  )
}

export default Timer
