'use client'
import { useParams } from 'next/navigation'
import { useRoutineStore } from '@/lib/routine/routine-stores'
import { RoutineExerciseSectionItem } from '@/lib/routine/components/RoutineExerciseSectionItem'

export const RoutineExerciseSections = () => {
  const params = useParams()
  const { week, day, level } = params

  const { routine } = useRoutineStore()

  const currentRoutine = routine
    .find((a) => a.week === parseInt(week))
    ?.days.find((_days) => _days.day === parseInt(day))

  return (
    currentRoutine &&
    currentRoutine?.sections.map((section, index) => {
      return (
        <RoutineExerciseSectionItem
          section={section}
          key={index}
          routine={currentRoutine}
          level={level}
        />
      )
    })
  )
}
