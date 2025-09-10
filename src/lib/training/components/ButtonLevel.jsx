'use client'
import PropTypes from 'prop-types'

export const ButtonLevel = ({ name, active, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={` ${
        active
          ? 'bg-Primary border-PrimaryDark text-DarkGray shadow-black/60 '
          : ' bg-transparent border-LightGray text-LightGray shadow-black/0 '
      }  transition-all duration-200 ease-in-out font-oswaldLight border-[0.5px] uppercase text-sm md:text-lg lg:text-xl rounded-lg shadow-md  px-4 py-2`}
    >
      {name}
    </button>
  )
}

ButtonLevel.propTypes = {
  name: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
}
