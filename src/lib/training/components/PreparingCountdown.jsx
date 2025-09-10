'use client'
import useCountdown from '@/hooks/useCountDown'
import { useEffect } from 'react'
import PropTypes from 'prop-types'

export const PreparingCountdown = ({ initialTime = 3, start, onReady }) => {
  const { secondsLeft, startCountdown, pauseTimer, resumeTimer } =
    useCountdown(0)

  useEffect(() => {
    if (start) {
      startCountdown(initialTime)
      resumeTimer()
    }
  }, [start])

  useEffect(() => {
    if (secondsLeft === 0 && start) {
      pauseTimer()
      onReady()
    }
  }, [secondsLeft])

  return (
    <div
      className={` ${
        secondsLeft === 0 ? 'hidden' : ' '
      } w-1/4 aspect-square flex items-center justify-center animate-ping rounded-full border-Primary border-2`}
    >
      <span className=" font-oswaldBold text-Primary  text-8xl">
        {secondsLeft}
      </span>
    </div>
  )
}

PreparingCountdown.propTypes = {
  initialTime: PropTypes.number,
  start: PropTypes.bool,
  onReady: PropTypes.func,
}
