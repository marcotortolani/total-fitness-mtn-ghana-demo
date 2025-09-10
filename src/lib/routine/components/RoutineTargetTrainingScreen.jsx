'use client'
import { useRoutineStore } from '@/lib/routine/routine-stores'
import PropTypes from 'prop-types'

import dictionary from '@/dictionary/lang.json'

export const RoutineTargetTrainingScreen = ({
  onHandleBack,
  onHandleSuccess,
}) => {
  const { profile, updateTarget } = useRoutineStore()

  return (
    <section
      className={`overflow-hidden w-full px-4 pt-0 relative top-0  mb-4 h-[90dvh] min-h-[650px] flex flex-col items-center justify-center md:gap-10 gap-6 bg-DarkGray overflow-y-scroll md:overflow-hidden transition-all duration-150 ease-in-out`}
    >
      <h2 className=" w-4/5 min-w-[260px] max-w-[450px] h-fit text-White uppercase text-3xl lg:text-4xl font-oswaldSemBold leading-8 text-center">
        {dictionary['What are your']}{' '}
        <span className=" text-Primary">{dictionary['training goals']}</span>?
      </h2>

      <div className=" w-full h-fit grid grid-cols-1 gap-3">
        {profile.target.map((target) => (
          <button
            key={target.id}
            className={`${
              target.active
                ? ' bg-Primary font-oswaldSemBold '
                : ' bg-White font-oswaldLight '
            } w-full h-fit flex items-center gap-4 py-4 pl-4 uppercase  text-DarkGray text-lg rounded-xl transition-all duration-200 ease-in-out`}
            type="button"
            onClick={() => updateTarget(target.id)}
          >
            <div
              className={` ${
                target.active ? '  ' : 'bg-DarkGray'
              }  w-6 h-6 border-DarkGray border-4 rounded-full transition-all duration-150 ease-in-out`}
            ></div>
            {target.name}
          </button>
        ))}
      </div>

      <div className=" w-full h-fit grid grid-cols-2 gap-3">
        <button
          type="button"
          className={` bg-Primary uppercase font-oswaldSemBold tracking-widest text-xl text-center py-3 rounded-full transition`}
          onClick={onHandleBack}
        >
          {dictionary['Go back']}
        </button>
        <button
          type="button"
          disabled={profile.target.every((target) => !target.active)}
          className={` disabled:bg-LightGray disabled:text-DarkGray/80 bg-Primary uppercase font-oswaldSemBold tracking-widest text-xl text-center py-2 rounded-full transition`}
          onClick={onHandleSuccess}
        >
          {dictionary['Continue']}
        </button>
      </div>
    </section>
  )
}

RoutineTargetTrainingScreen.propTypes = {
  onHandleSuccess: PropTypes.func.isRequired,
  onHandleBack: PropTypes.func.isRequired,
}
