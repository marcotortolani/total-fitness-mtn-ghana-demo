'use client'
import Image from 'next/image'
import weightIcon from '../../../../public/assets/icons/perfilado/peso-icon.webp'
import heightIcon from '../../../../public/assets/icons/perfilado/altura-icon.webp'
import PropTypes from 'prop-types'
import { useUserStore } from '@/lib/user/user-stores'

import dictionary from '@/dictionary/lang.json'

export const RoutineUserScreenTwo = ({ onHandleBack, onHandleSuccess }) => {
  const { user, update } = useUserStore()

  return (
    <section
      className={`overflow-hidden w-full px-4 pt-0 pb-14 bg-DarkGray`}
      style={{ height: '90vh' }}
    >
      <div
        className={`px-4 w-full h-full pb-10 flex flex-col items-center justify-evenly`}
      >
        <div className=" w-2/3 flex flex-col items-center gap-5 ">
          <h2 className=" text-White uppercase text-3xl font-oswaldSemBold leading-8 text-center">
            {dictionary['Hi']}{' '}
            <span className=" text-Primary">
              {user?.name ? user?.name : ''}
            </span>
            !
          </h2>
          <p className=" px-2 text-White font-oswaldLight uppercase text-xl leading-5 text-center">
            {
              dictionary[
                'Enter your height and weight to receive the best personalized routine'
              ]
            }
          </p>
        </div>
        <form className=" grid grid-cols-2 gap-2">
          <div className=" relative p-2 bg-White rounded-xl flex items-center ">
            <Image
              className=" w-10 h-10 md:w-14 md:h-12 border-r-[1px] border-r-Primary pr-1 md:pr-2"
              src={weightIcon}
              alt="icon"
            />
            <input
              className=" w-full h-full focus:ring-0 pl-2 md:pl-6 uppercase font-oswaldReg text-sm md:text-base placeholder:font-oswaldLight placeholder:text-LightGray border-none"
              type="number"
              name="weight"
              placeholder={dictionary['Weight (kg)']}
              value={user?.weight}
              onChange={(e) => update({ weight: e.target.value })}
            />
          </div>
          <div className=" relative p-2 bg-White rounded-xl flex items-center ">
            <Image
              className=" w-10 h-10 md:w-14 md:h-12 border-r-[1px] border-r-Primary pr-1 md:pr-2"
              src={heightIcon}
              alt="icon"
            />
            <input
              className=" w-full h-full focus:ring-0 pl-2 md:pl-6 uppercase font-oswaldReg text-sm md:text-base placeholder:font-oswaldLight placeholder:text-LightGray border-none"
              type="number"
              name="height"
              placeholder={dictionary['Height (cm)']}
              value={user?.height}
              onChange={(e) => update({ height: e.target.value })}
            />
          </div>
        </form>

        <div className=" w-full grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled={!user?.name?.length}
            className={` disabled:bg-LightGray disabled:text-DarkGray bg-Primary uppercase font-oswaldSemBold tracking-widest text-xl text-center py-3 rounded-full transition`}
            onClick={onHandleBack}
          >
            {dictionary['Go back']}
          </button>
          <button
            type="button"
            disabled={!user?.name?.length}
            className={` disabled:bg-LightGray disabled:text-DarkGray bg-Primary uppercase font-oswaldSemBold tracking-widest text-xl text-center py-3 rounded-full transition`}
            onClick={() => {
              onHandleSuccess()
              update({ dataAccepted: true })
            }}
          >
            {dictionary['Continue']}
          </button>
        </div>
      </div>
    </section>
  )
}

RoutineUserScreenTwo.propTypes = {
  onHandleSuccess: PropTypes.func.isRequired,
  onHandleBack: PropTypes.func.isRequired,
}
