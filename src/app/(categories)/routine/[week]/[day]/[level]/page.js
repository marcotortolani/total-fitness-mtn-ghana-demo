'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { timeToString } from '@/lib/routine/routine-utils'
import { RoutineExerciseSections } from '@/lib/routine/components/RoutineExerciseSections'
import { useRoutineExerciseStore } from '@/lib/routine/routine-stores'
import { totalTime } from '@/lib/training/training-utils'
import { RoutineExerciseSectionDialog } from '@/lib/routine/components/RoutineExerciseSectionDialog'

import dictionary from '@/dictionary/lang.json'

export default function Page() {
  const params = useParams()
  const { week, day, level } = params
  const { exercise } = useRoutineExerciseStore()

  return (
    <main className=" relative w-screen top-8  h-[90dvh] md:h-[90dvh] lg:h-[96dvh] xl:h-[94dvh] flex flex-col items-center overflow-y-scroll md:overflow-hidden">
      <div
        className={` ${
          exercise && ' hidden '
        }  relative mt-0 lg:mt-0 w-full h-full flex justify-center `}
      >
        <header
          className={` z-50 fixed -top-1 w-full max-w-screen-md bg-DarkGray py-4 px-2 md:px-12 mt-16 lg:mt-20 flex items-center shadow-md shadow-black/80 transition-all duration-200 ease-in-out`}
        >
          <Link href={`/routine`} className=" text-White text-2xl px-2">
            <ChevronLeft />
          </Link>
          <div className=" px-4 mb-1 flex flex-col items-start gap-2">
            <h1 className="  text-White uppercase font-oswaldSemBold text-2xl lg:text-3xl">
              {dictionary['Week']} {week} - {dictionary['Day']} {day}
            </h1>
            <p className=" text-left w-full text-White font-oswaldLight uppercase text-xs lg:text-sm">
              {dictionary['Routine time']}: {timeToString(totalTime(level))}
            </p>
          </div>
        </header>
        <section
          className={`${
            exercise
              ? ' translate-y-[200%] scale-y-0 hidden '
              : ' translate-y-0 scale-100 '
          }  w-full max-w-screen-md h-full overflow-x-hidden overflow-y-scroll px-4 pt-4 lg:pt-6 mt-24 md:mt-24 lg:mt-28 mb-0 pb-44 flex flex-col items-center gap-8 transition-all duration-200 ease-in-out`}
        >
          <RoutineExerciseSections />
        </section>
      </div>
      <RoutineExerciseSectionDialog />
    </main>
  )
}
