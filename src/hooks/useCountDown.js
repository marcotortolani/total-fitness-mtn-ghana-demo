import { useState, useEffect, useCallback } from 'react'
// export default function useCountdown(countInitial = 0) {
//   const [secondsLeft, setSecondsLeft] = useState(countInitial)
//   const [isActive, setIsActive] = useState(countInitial > 0)

//   useEffect(() => {
//     if (!isActive || secondsLeft <= 0) return

//     const timeout = setTimeout(() => {
//       if (secondsLeft > 0) {
//         setSecondsLeft((prev) => prev - 1)
//       } else {
//         setIsActive(false)
//       }
//     }, 1000)
//     return () => clearTimeout(timeout)
//   }, [secondsLeft, isActive])

//   function startCountdown(seconds) {
//     if (seconds > 0) {
//       setSecondsLeft(seconds)
//       setIsActive(true)
//       return
//     }
//     setIsActive(false)
//   }

//   return { secondsLeft, startCountdown }
// }

export default function useCountdown(countInitial = 0) {
  const [secondsLeft, setSecondsLeft] = useState(countInitial)
  const [isRunning, setIsRunning] = useState(countInitial > 0)

  const countdown = useCallback(() => {
    if (secondsLeft > 0) {
      setSecondsLeft((prev) => prev - 1)
    } else {
      setIsRunning(false)
    }
  }, [secondsLeft])

  useEffect(() => {
    let interval

    if (isRunning && secondsLeft > 0) {
      interval = setInterval(countdown, 1000)
    }

    return () => clearInterval(interval)
  }, [isRunning, secondsLeft, countdown])

  const startCountdown = useCallback((seconds) => {
    if (seconds > 0) {
      setSecondsLeft(seconds)
      setIsRunning(true)
    } else {
      setIsRunning(false)
    }
  }, [])

  const pauseTimer = useCallback(() => {
    setIsRunning(false)
  }, [])

  const resumeTimer = useCallback(() => {
    if (secondsLeft > 0) {
      setIsRunning(true)
    }
  }, [secondsLeft])

  return { secondsLeft, startCountdown, pauseTimer, resumeTimer, isRunning }
}
