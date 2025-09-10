'use client'
import { useRoutineStore } from '@/lib/routine/routine-stores'
import PropTypes from 'prop-types'

import dictionary from '@/dictionary/lang.json'

export const RoutineTargetTrainingLevelScreen = ({
  onHandleBack,
  onHandleSuccess,
}) => {
  const { profile, range, updateRange } = useRoutineStore()

  return (
    <section
      className={`overflow-hidden w-full px-4 pt-0 relative top-0 h-[90dvh] min-h-[400px] flex flex-col items-center justify-center gap-6 md:gap-10 bg-DarkGray overflow-y-scroll md:overflow-hidden transition-all duration-150 ease-in-out`}
    >
      <h2 className=" w-4/5 max-w-[450px] h-fit text-White uppercase text-3xl lg:text-4xl font-oswaldSemBold leading-8 text-center">
        {dictionary['How would you describe your']}{' '}
        <span className=" text-Primary">
          {dictionary['physical condition']}
        </span>
        ?
      </h2>

      <div className=" w-full h-fit px-4 flex flex-col items-center gap-10 ">
        <div className=" z-0 relative w-full h-fit ">
          <p className=" text-White absolute left-0 -translate-x-1/4 top-8 font-oswaldLight uppercase text-xs md:text-sm xl:text-base leading-4">
            {dictionary["I'm out"]} <br /> {dictionary['of shape']}
          </p>
          <p className=" text-White absolute right-0 translate-x-1/4 top-8 font-oswaldLight uppercase text-xs md:text-sm xl:text-base leading-4">
            {dictionary['Very']} <br /> {dictionary['fit']}
          </p>
          <input
            type="range"
            min="0"
            max="100"
            value={range}
            onChange={(e) => updateRange(e.target.value)}
            className={`z-20 w-full rounded-full transition-all duration-100 ease-in-out 
                ${
                  range <= 100 / 3
                    ? 'accent-red-600 '
                    : range <= (100 / 3) * 2
                    ? 'accent-yellow-400'
                    : 'accent-lime-500'
                } `}
          />
          <div
            className=" absolute left-0 mr-2 top-0 w-[96%] h-full z-50 bg-transparent pointer-events-none"
            style={{
              transform: `translateX(${range}%)`,
              touchAction: 'none',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <div
              className={` ${
                range <= 100 / 3
                  ? 'bg-red-600'
                  : range <= (100 / 3) * 2
                  ? 'bg-yellow-400'
                  : 'bg-lime-500'
              } absolute left-1 -translate-y-1/4 w-2 h-10 rounded-full cursor-pointer `}
            ></div>
          </div>
        </div>

        <p className=" w-1/2 text-center py-3 bg-LightGray rounded-xl text-xl text-Primary font-oswaldSemBold uppercase">
          {dictionary[profile.levels.find((level) => level.active)?.name]}
        </p>
      </div>

      <div className=" w-full h-fit grid grid-cols-2 gap-3">
        <button
          type="button"
          className={` bg-Primary uppercase font-oswaldSemBold tracking-widest text-xl text-center py-2 rounded-full transition`}
          onClick={onHandleBack}
        >
          {dictionary['Go back']}
        </button>
        <button
          type="button"
          className={` bg-Primary uppercase font-oswaldSemBold tracking-widest text-xl text-center py-2 rounded-full transition`}
          onClick={onHandleSuccess}
        >
          {dictionary['Continue']}
        </button>
      </div>
    </section>
  )
}

RoutineTargetTrainingLevelScreen.propTypes = {
  onHandleSuccess: PropTypes.func.isRequired,
  onHandleBack: PropTypes.func.isRequired,
}
