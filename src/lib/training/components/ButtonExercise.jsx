'use client'
import { formatTime } from '@/utils/util'
import Image from 'next/image'
import videoIcon from '../../../../public/assets/icons/elementos-perfilado/video-icon.svg'
import React from 'react'
import PropTypes from 'prop-types'

export const ButtonExercise = ({
  name,
  time,
  state = 'disabled',
  onClick,
  completed = false,
}) => {
  let stateStyle

  if (state === 'enabled' && completed) {
    stateStyle = 'bg-Primary active:bg-PrimaryDark text-Black/60'
  } else if (state === 'disabled' && !completed) {
    stateStyle = ' bg-LightGray text-White/50 '
  } else if (state === 'enabled' && !completed) {
    stateStyle = ' bg-White active:bg-White/80 '
  }

  return (
    <button
      disabled={state === 'disabled'}
      className={`${
        completed ? 'bg-Primary active:bg-PrimaryDark text-Black/60' : ''
      } ${stateStyle}   transition-all duration-200 ease-in-out font-oswaldLight uppercase text-sm rounded-lg shadow-md  pl-6 pr-2 py-2 xl:py-3 w-full flex items-center gap-1 justify-between`}
      type="button"
      onClick={onClick}
    >
      <span className=" w-2/3 text-left line-clamp-2 md:text-base xl:text-lg">
        {name}
      </span>
      <span className=" w-1/3 flex items-center justify-between md:text-base">
        {formatTime(time)}
        <Image
          className=" w-auto h-10 xl:h-11 "
          src={videoIcon}
          alt="Video icon"
        />
      </span>
    </button>
  )
}

ButtonExercise.propTypes = {
  name: PropTypes.string,
  time: PropTypes.number,
  state: PropTypes.string,
  onClick: PropTypes.func,
  completed: PropTypes.bool,
}
