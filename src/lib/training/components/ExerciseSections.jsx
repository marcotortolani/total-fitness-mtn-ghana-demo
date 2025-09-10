'use client'
import { useTrainingStore } from '@/lib/training/training-stores'
import { useParams } from 'next/navigation'
import { ExerciseSectionItem } from '@/lib/training/components/ExerciseSectionItem'

export const ExerciseSections = () => {
  const { training } = useTrainingStore()
  const params = useParams()

  const currentTraining = training[params.group]

  return (
    currentTraining &&
    currentTraining?.sections.map((section, index) => {
      return (
        <ExerciseSectionItem
          section={section}
          key={index}
          training={currentTraining}
        />
      )
    })
  )
}
