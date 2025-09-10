'use client'
import PropTypes from 'prop-types'
import { useTrainingRefreshStore } from '@/lib/training/training-stores'

import dictionary from '@/dictionary/lang.json'

export const RefreshDialog = ({ onSuccess }) => {
  const { onClose, open } = useTrainingRefreshStore()

  return (
    <div
      className={`${
        open ? ' scale-100 bg-Black/0 ' : ' scale-0 bg-Black/0 '
      } absolute z-50 top-0 w-screen h-full overflow-hidden pointer-events-none flex items-center justify-center backdrop-blur-sm backdrop-brightness-50  transition-all duration-200 ease-in-out`}
    >
      <div className=" w-4/5 max-w-[400px] aspect-video flex flex-col items-center justify-evenly px-4 bg-Primary text-DarkGray rounded-xl">
        <p className=" text-center text-DarkGray uppercase font-oswaldReg ">
          {
            dictionary[
              'The current routine will be deleted and a new one will be created'
            ]
          }
        </p>
        <p className=" text-center text-DarkGray uppercase font-oswaldReg ">
          {dictionary['Do yo want to continue?']}
        </p>
        <div className=" w-full grid grid-cols-2 justify-between pointer-events-auto">
          <button
            type="button"
            onClick={onClose}
            className=" uppercase text-xl font-oswaldSemBold text-DarkGray hover:text-DarkGray/80 hover:scale-105 transition-all duration-200 ease-in-out"
          >
            {dictionary['Cancel']}
          </button>
          <button
            type="button"
            onClick={onSuccess}
            className=" uppercase text-xl font-oswaldSemBold text-DarkGray hover:text-DarkGray/80 hover:scale-105 transition-all duration-200 ease-in-out"
          >
            {dictionary['Confirm']}
          </button>
        </div>
      </div>
    </div>
  )
}

RefreshDialog.propTypes = {
  onSuccess: PropTypes.func,
}
