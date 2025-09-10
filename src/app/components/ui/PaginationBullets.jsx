import React from 'react'

const colorSet = {
  white: {
    bg: 'bg-white',
    border: 'border-Secondary',
  },
  default: {
    bg: 'bg-DarkGray',
    border: 'border-DarkGray',
  },
  primary: {
    bg: 'bg-Primary',
    border: 'border-Primary',
  },
  secondary: {
    bg: 'bg-Secondary',
    border: 'border-Secondary',
  },
  secondaryDark: {
    bg: 'bg-SecondaryDark',
    border: 'border-SecondaryDark',
  },
  gray: {
    bg: 'bg-slate-300 opacity-50',
    border: 'border-slate-300 opacity-50',
  },
}

const sizeSet = {
  sm: {
    circle: 'w-2 h-2 md:w-4 md:h-4 lg:w-3 lg:h-3',
    ellipse: 'w-4 h-2 md:w-8 md:h-4 lg:w-6 lg:h-3',
  },
  default: {
    circle: 'w-3 h-3',
    ellipse: 'w-6 h-3',
  },
}

export default function PaginationBullets({
  color = 'default',
  size = 'default',
  qtyBullets,
  index,
  vertical = false,
}) {
  return (
    <div
      className={` w-full h-fit ${size === 'sm' ? 'py-2' : 'py-4'} ${
        vertical ? 'flex-col' : 'flex-row'
      } flex items-center justify-center gap-2 transition-all duration-150 ease-in-out`}
    >
      {[...Array(qtyBullets)].map((bullet, i) =>
        i + 1 === index ? (
          <span
            key={i}
            className={`${sizeSet[size].ellipse} ${
              vertical ? 'rotate-90 my-1' : ''
            } bg-transparent border-solid ${
              colorSet[color].border
            } border-2 line-clamp-1 content-normal rounded-full`}
          />
        ) : (
          <span
            key={i}
            className={`${sizeSet[size].circle} ${colorSet[color].bg} line-clamp-1 content-normal rounded-full`}
          />
        )
      )}
    </div>
  )
}
