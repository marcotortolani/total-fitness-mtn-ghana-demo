import React from 'react'
import PropTypes from 'prop-types'


export const ButtonDay = ({ day, active, onClick }) => {
  return (
    <button
      type="button"
      className={`${
        active
          ? ' bg-Primary font-oswaldSemBold  '
          : ' bg-LightGray font-oswaldLight '
      }  w-full flex items-center justify-center gap-4 py-4 uppercase text-DarkGray  text-sm lg:text-base rounded-lg transition-all duration-200 ease-in-out`}
      onClick={onClick}
    >
      {day}
    </button>
  )
}

ButtonDay.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
  day: PropTypes.string,
}
