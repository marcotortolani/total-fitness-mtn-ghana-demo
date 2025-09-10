'use client'
import { useRoutineStore } from '@/lib/routine/routine-stores'
import PropTypes from 'prop-types'
import { ButtonDay } from '@/lib/routine/components/ButtonDay'
import { DAYS } from '@/lib/routine/routine-constants'

import dictionary from '@/dictionary/lang.json'

export const RoutineTargetTrainingFocusAreaScreen = ({
  onHandleBack,
  onHandleSuccess,
}) => {
  const { profile, updateDays, updateFocusArea } = useRoutineStore()

  return (
    <section
      className={`overflow-hidden w-full px-4 pt-0 relative top-0  mb-4 h-[90dvh] min-h-[650px] flex flex-col items-center justify-center md:gap-10 gap-6 bg-DarkGray overflow-y-scroll md:overflow-hidden transition-all duration-150 ease-in-out`}
    >
      <div className=" w-[95%] max-w-[400px] h-fit flex flex-col items-center gap-4 ">
        <h2 className=" text-White uppercase text-3xl lg:text-4xl font-oswaldSemBold leading-8 text-center">
          {dictionary['I want']}{' '}
          <span className=" text-Primary">{dictionary['to focus on']}</span>
        </h2>
        <p className=" text-White font-oswaldLight uppercase text-xl lg:text-2xl leading-6 text-center">
          {
            dictionary[
              'Select which part of the body you want to focus your exercises on'
            ]
          }
        </p>
      </div>
      <div className=" w-full h-fit grid grid-cols-1 gap-3">
        {profile.focusAreas.map((focusArea) => (
          <button
            key={focusArea.id}
            className={`${
              focusArea.active
                ? ' bg-Primary font-oswaldSemBold '
                : ' bg-White font-oswaldLight '
            } w-full flex items-center gap-4 py-4 pl-4 uppercase  text-DarkGray text-lg rounded-xl transition-all duration-200 ease-in-out`}
            type="button"
            onClick={() => updateFocusArea(focusArea)}
          >
            <div
              className={` ${
                focusArea.active ? '  ' : 'bg-DarkGray'
              }  w-6 h-6 border-DarkGray border-4 rounded-full transition-all duration-150 ease-in-out`}
            ></div>
            {focusArea?.name}
          </button>
        ))}
      </div>

      <div className=" w-full ">
        <h4 className=" text-center mb-4 text-White text-lg lg:text-xl uppercase">
          {dictionary['Which days of the week do you prefer to work out?']}
        </h4>
        <div className=" w-full grid grid-cols-7 gap-2 ">
          {DAYS.map((day) => (
            <ButtonDay
              key={day}
              day={day}
              active={profile.days.includes(day)}
              onClick={() => updateDays(day)}
            />
          ))}
        </div>
      </div>

      <div className=" w-full grid grid-cols-2 gap-3">
        <button
          type="button"
          className={` bg-Primary uppercase font-oswaldSemBold tracking-widest text-xl text-center py-2 rounded-full transition`}
          onClick={onHandleBack}
        >
          {dictionary['Go back']}
        </button>
        <button
          type="button"
          disabled={
            profile.focusAreas.every((target) => !target.active) ||
            !profile.days?.length
          }
          className={` disabled:bg-LightGray disabled:text-DarkGray/80 bg-Primary uppercase font-oswaldSemBold tracking-widest text-xl text-center py-2 rounded-full transition`}
          onClick={() => {
            onHandleSuccess()
          }}
        >
          {dictionary['Continue']}
        </button>
      </div>
    </section>
  )
}

RoutineTargetTrainingFocusAreaScreen.propTypes = {
  onHandleSuccess: PropTypes.func.isRequired,
  onHandleBack: PropTypes.func.isRequired,
}
