'use client'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import dictionary from '@/dictionary/lang.json'

export const MotivationalMessages = ({ active, totalTime, secondsLeft }) => {
  const MESSAGES = {
    initial: {
      highlight: dictionary['Here we go!'],
      white: dictionary["Let's get started"],
    },
    inter1: {
      highlight: dictionary['Very good!'],
      white: dictionary["You're doing great!"],
    },
    inter2: {
      highlight: dictionary['Keep it up!'],
      white: dictionary["You've got this"],
    },
    prefinal: {
      highlight: dictionary["That's it!"],
      white: dictionary['Just a little more!'],
    },
    final: {
      highlight: dictionary['Congratulations!'],
      white: dictionary['You did it!'],
    },
  }

  const [message, setMessage] = useState(MESSAGES.initial)

  useEffect(() => {
    if (secondsLeft === totalTime || secondsLeft > totalTime * 0.75) {
      setMessage(MESSAGES.initial)
    } else if (
      secondsLeft <= totalTime * 0.75 &&
      secondsLeft > totalTime * 0.5
    ) {
      setMessage(MESSAGES.inter1)
    } else if (
      secondsLeft <= totalTime * 0.5 &&
      secondsLeft > totalTime * 0.25
    ) {
      setMessage(MESSAGES.inter2)
    } else if (secondsLeft <= totalTime * 0.25 && secondsLeft > 0) {
      setMessage(MESSAGES.prefinal)
    } else if (secondsLeft === 0) {
      setMessage(MESSAGES.final)
    }
  }, [secondsLeft, totalTime])

  return (
    <div
      className={` ${
        active ? ' scale-100 ' : ' scale-0 hidden '
      } w-full h-full my-6 transition-all duration-500 ease-in-out`}
    >
      <p className=" mx-auto w-5/6 text-center font-oswaldBold uppercase text-White text-4xl transition-all duration-200 ease-in-out tracking-wide">
        <span className=" mr-2 text-Primary">{message.highlight}</span>
        {message.white}
      </p>
    </div>
  )
}

MotivationalMessages.propTypes = {
  active: PropTypes.bool,
  totalTime: PropTypes.number,
  secondsLeft: PropTypes.number,
}
