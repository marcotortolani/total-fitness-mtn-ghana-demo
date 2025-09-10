'use client'
import { ChevronDown } from 'lucide-react'
import { ButtonExercise } from '@/lib/training/components/ButtonExercise'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useRoutineExerciseStore } from '@/lib/routine/routine-stores'

import dictionary from '@/dictionary/lang.json'

export const RoutineExerciseSectionItem = ({ section, routine, level }) => {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (section.completed) setOpen(false)
  }, [section.completed])

  const { onOpen } = useRoutineExerciseStore()

  return (
    <div
      key={`block-${section.id}`}
      className={` routineBlock  w-full flex flex-col items-center gap-3`}
    >
      <button
        type="button"
        onClick={() => {
          return section.completed && setOpen(!open)
        }}
        className=" w-full h-fit flex items-center justify-between mb-0"
      >
        <h4
          className={` ${
            !section.completed ? 'text-White' : 'text-Primary'
          } w-2/5 flex flew-nowrap items-end gap-1 uppercase font-oswaldSemBold text-xl md:text-2xl`}
        >
          {dictionary['Block']} {section.id}
        </h4>
        {!section.completed ? (
          <div className=" w-3/5 xsm:w-4/5 sm:w-full h-[1px] bg-White/80"></div>
        ) : (
          <div className="relative w-3/5 xsm:w-4/5 sm:w-full h-[1.5px] bg-Primary/80">
            <div className="absolute left-0 top-0 -translate-y-1/2 w-full h-fit flex justify-center">
              <span className=" w-fit bg-DarkGray font-oswaldLight text-sm md:text-base mb-0.5 uppercase text-Primary">
                ({dictionary['Completed']})
              </span>
            </div>
          </div>
        )}
        <span
          className={` ${open ? '-rotate-180' : 'rotate-0'} ${
            !section.completed ? 'opacity-0' : ''
          } ml-6 mr-2 text-xl text-Primary transition-all duration-150 ease-in-out `}
        >
          <ChevronDown />
        </span>
      </button>
      {open &&
        section?.exercises?.map((exercise, i) => {
          const prevExerciseCompleted = i
            ? section?.exercises[i - 1].completed
            : false
          const sectionCompleted = routine.sections.filter(
            (section) => section.completed,
          )

          return (
            <ButtonExercise
              key={exercise.id}
              name={exercise?.title?.rendered}
              time={60 + (level - 1) * 15}
              state={
                (!i || exercise.completed || prevExerciseCompleted) &&
                section.id <= sectionCompleted.length + 1
                  ? 'enabled'
                  : 'disabled'
              }
              completed={exercise.completed}
              onClick={() => {
                onOpen(exercise, section)
              }}
            />
          )
        })}
    </div>
  )
}

RoutineExerciseSectionItem.protoType = {
  section: PropTypes.object.isRequired,
  routine: PropTypes.object.isRequired,
  level: PropTypes.number.isRequired,
}
