'use client'
import { useParams } from 'next/navigation'
import { useContext } from 'react'
import { StateContext } from '@/providers/StateProvider'
import PropTypes from 'prop-types'
import { ButtonExercise } from '@/lib/training/components/ButtonExercise'
import { totalTime } from '@/lib/training/training-utils'

export const Routine = ({
  index,
  exercise,
  dayRoutine,
  currentBlock,
  level,
  onSelectedVideo,
  onVideo,
  currentBlockIndex,
}) => {
  const params = useParams()
  const { group } = params
  const { stateDayTraining } = useContext(StateContext)

  const state = stateDayTraining[group]?.block[index]?.exercises?.includes(
    exercise?.id,
  )

  const prevState = stateDayTraining[group]?.block[index]?.exercises?.includes(
    dayRoutine[i - 1]?.id,
  )

  const notClickable = state === 'disabled' || index < currentBlock - 1

  return (
    <ButtonExercise
      key={exercise.id}
      name={exercise?.title?.rendered}
      time={totalTime(level)}
      state={
        currentBlock - 1 < currentBlockIndex
          ? 'disabled'
          : state
          ? 'didit'
          : i === 0
          ? 'enabled'
          : prevState
          ? 'enabled'
          : 'disabled'
      }
      onClick={() => {
        if (notClickable) return
        const extractedVideo =
          exercise?.content?.rendered
            ?.match(/<iframe.*?src="(.*?)"/s)?.[1]
            .replaceAll('&amp;', '&')
            .replace('autopause=0', 'autoplay=1&controls=0&loop=1') ?? ''

        onSelectedVideo(exercise)
        onVideo(extractedVideo)
      }}
    />
  )
}

Routine.propTypes = {
  index: PropTypes.number,
  level: PropTypes.number,
  exercise: PropTypes.object,
  dayRoutine: PropTypes.object,
  currentBlock: PropTypes.number,
  currentBlockIndex: PropTypes.number,
  onVideo: PropTypes.func,
  onSelectedVideo: PropTypes.func,
}
