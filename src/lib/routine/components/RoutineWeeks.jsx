'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { useRoutineStore } from '@/lib/routine/routine-stores'
import {
  getExercisesPercentage,
  getSortedDays,
  isCompletedWeek,
} from '@/lib/routine/routine-utils'

import dictionary from '@/dictionary/lang.json'

export const RoutineWeeks = () => {
  const { profile, routine } = useRoutineStore()
  const sortedDays = getSortedDays(profile.days)

  // Mantenemos el estado de apertura para cada semana en un array
  const [openWeeks, setOpenWeeks] = useState([])

  // Inicializa el estado abierto de las semanas cuando el componente se monta
  useEffect(() => {
    if (routine) {
      setOpenWeeks(
        routine.map(({ days }) => !days.every((day) => day.completed)),
      )
    }
  }, [routine])

  // Función para alternar el estado de una semana
  const toggleWeek = (index, weekCompleted) => {
    if (weekCompleted) {
      setOpenWeeks((prev) => {
        const updated = [...prev]
        updated[index] = !updated[index]
        return updated
      })
    }
  }

  return (
    <div className=" h-fit pb-4">
      {routine?.map(({ week, days }, weekIndex) => {
        const weekCompleted = routine[weekIndex].days.every(
          (day) => day.completed,
        )
        const open = openWeeks[weekIndex]

        return (
          <div key={`${dictionary['Week']}-${week}`} className=" h-fit my-4">
            <div className=" w-full h-fit flex items-center justify-between mb-2">
              <button
                type="button"
                onClick={() => toggleWeek(weekIndex, weekCompleted)}
                className=" w-full h-fit flex items-center justify-between mb-0"
              >
                <h4
                  className={` ${
                    !weekCompleted ? 'text-White' : 'text-Primary'
                  } w-2/5 flex flew-nowrap items-end gap-1 uppercase font-oswaldSemBold text-xl md:text-2xl`}
                >
                  {dictionary['Week']} {week}
                </h4>
                {!weekCompleted ? (
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
                  className={` ${
                    open && weekCompleted ? '-rotate-180' : 'rotate-0'
                  } ${
                    !weekCompleted ? 'opacity-0' : ''
                  } ml-6 mr-2 text-xl text-Primary transition-all duration-150 ease-in-out `}
                >
                  <ChevronDown />
                </span>
              </button>
            </div>

            {open && (
              <div className=" w-full grid grid-cols-1 gap-3">
                {sortedDays?.map((day, i) => {
                  const percentage = getExercisesPercentage(days[i]?.sections)

                  const prevExerciseCompleted = i
                    ? getExercisesPercentage(days[i - 1]?.sections) >= 100
                    : false
                  const prevWeek = weekIndex
                    ? isCompletedWeek(routine[weekIndex - 1].days)
                    : false
                  const level = profile?.levels?.find(
                    (level) => level.active,
                  )?.id
                  const isActive =
                    (!i || prevExerciseCompleted) && (!weekIndex || prevWeek)

                  return (
                    <Link
                      key={day}
                      href={
                        isActive ? `/routine/${week}/${i + 1}/${level}` : ''
                      }
                      className={` ${
                        isActive ? ' bg-White ' : ' bg-LightGray '
                      } row-span-1 relative z-0 w-full h-full min-h-[60px] flex items-center justify-between px-6 py-4 overflow-hidden uppercase text-white text-sm rounded-lg transition-all duration-200 ease-in-out`}
                    >
                      <div
                        className={` z-0 absolute top-0 left-0 bg-Primary h-full`}
                        style={{
                          width: `${percentage}%`,
                        }}
                      ></div>
                      <div className=" h-fit z-20 flex items-center gap-3">
                        <p className=" font-oswaldLight text-DarkGray text-lg ">
                          {dictionary['Day']} {i + 1}
                        </p>
                        <span
                          className={`${
                            percentage >= 32 && isActive && 'text-White'
                          } ${
                            percentage < 32 && isActive && 'text-DarkGray/80'
                          } ${
                            percentage < 32 && !isActive && 'text-White/30'
                          } font-oswaldSemBold  text-2xl`}
                        >
                          {day}
                        </span>
                      </div>
                      {percentage ? (
                        <span className="z-20 text-DarkGray font-oswaldBold text-xl">
                          {percentage}%
                        </span>
                      ) : (
                        <ChevronRight
                          className={` ${
                            isActive ? ' text-DarkGray ' : ' text-White/30 '
                          }`}
                        />
                      )}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
