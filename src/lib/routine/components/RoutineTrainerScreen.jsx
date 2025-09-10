'use client'

import { useRoutineStore } from '@/lib/routine/routine-stores'
import PropTypes from 'prop-types'
import { useRoutineWeek } from '@/lib/routine/routine-hooks'

import { TAGS } from '@/lib/constants'

import dictionary from '@/dictionary/lang.json'

export const RoutineTrainerScreen = ({ onHandleBack, onHandleSuccess }) => {
  const { profile, updateTrainer, completedForm, onCanUpdate } =
    useRoutineStore()
  const { callback } = useRoutineWeek()

  const trainers = [
    { id: TAGS['trainer-male'], name: 'trainer-male' },
    { id: TAGS['trainer-female'], name: 'trainer-female' },
  ]

  return (
    <section
      className={`overflow-hidden w-full px-4 pt-0 relative top-0 h-[90dvh] min-h-[400px] flex flex-col items-center justify-center gap-6 md:gap-10 bg-DarkGray overflow-y-scroll md:overflow-hidden transition-all duration-150 ease-in-out`}
    >
      <div className=" w-[90%] max-w-[400px] h-fit flex flex-col items-center gap-4 ">
        <h2 className=" text-White uppercase text-3xl lg:text-4xl font-oswaldSemBold leading-8 text-center">
          {dictionary['Choose your']}{' '}
          <span className=" text-Primary">{dictionary['Trainer']}</span>:
        </h2>
        <p className=" text-White font-oswaldLight uppercase text-xl lg:text-2xl leading-6 text-center">
          {
            dictionary[
              'Do you prefer to work out with a male or female trainer?'
            ]
          }
        </p>
      </div>
      <div className=" w-full h-fit grid grid-cols-1 gap-3">
        {trainers
          ? trainers?.map((trainer) => {
              const active = profile?.trainer === trainer?.id
              return (
                <button
                  key={trainer.id}
                  className={`${
                    active
                      ? ' bg-Primary font-oswaldSemBold '
                      : ' bg-White font-oswaldLight '
                  } w-full flex items-center gap-4 py-4 pl-4 uppercase  text-DarkGray text-lg rounded-xl transition-all duration-200 ease-in-out`}
                  type="button"
                  onClick={() => updateTrainer(trainer?.id)}
                >
                  <div
                    className={` ${
                      active ? '  ' : 'bg-DarkGray'
                    }  w-6 h-6 border-DarkGray border-4 rounded-full transition-all duration-150 ease-in-out`}
                  ></div>
                  {trainer?.name.includes('female')
                    ? dictionary['trainer (female)']
                    : dictionary['trainer (male)']}
                </button>
              )
            })
          : null}
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
          disabled={!profile.trainer}
          className={` disabled:bg-LightGray disabled:text-DarkGray/80 bg-Primary uppercase font-oswaldSemBold tracking-widest text-xl text-center py-2 rounded-full transition`}
          onClick={() => {
            onHandleSuccess()
            completedForm()
            callback()
            onCanUpdate(false)
          }}
        >
          {dictionary['Continue']}
        </button>
      </div>
    </section>
  )
}

RoutineTrainerScreen.propTypes = {
  onHandleSuccess: PropTypes.func.isRequired,
  onHandleBack: PropTypes.func.isRequired,
}
