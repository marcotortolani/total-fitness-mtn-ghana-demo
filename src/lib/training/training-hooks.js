'use client'
import { useCallback, useContext, useEffect, useState } from 'react'
import { StateContext } from '@/providers/StateProvider'
import { useParams } from 'next/navigation'
import { fetchPosts } from '@/lib/training/training-actions'
import { getCategoryID } from '@/utils/util'
import {
  getRoutine,
  getTagsAndTagsExcludedByLevel,
  getTrainerIDToExclude,
} from '@/lib/training/training-utils'
import { useTrainingStore } from '@/lib/training/training-stores'

/**
 * Hook for load training info
 * 1: Beginner
 * 2: Intermediate
 * 3: Advanced
 */
export const useTraining = () => {
  const { apiTags, apiCategories } = useContext(StateContext)

  const params = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const { training, createTraining } = useTrainingStore()
  const currentTraining = training[params.group]
  const [currentTrainer, setCurrentTrainer] = useState(currentTraining?.trainer)

  const callPosts = useCallback(
    async (level = 1, trainer = '', tags = '', tagsExclude = '') => {
      setIsLoading(true)

      const trainerToExclude = getTrainerIDToExclude(apiTags, trainer)
      const tagsToExlude = tagsExclude.length
        ? `${tagsExclude},${trainerToExclude}`
        : trainerToExclude

      const tagsToFetch = tags.length ? `${tags},${trainer}` : trainer

      try {
        const category = getCategoryID(apiCategories, params.group)
        const exercises = await fetchPosts(category, tagsToFetch, tagsToExlude)

        const data = getRoutine(exercises, level, apiTags)

        const timer = setTimeout(() => {
          createTraining(data, level, trainer, params.group)
          setIsLoading(false)
        }, 3000)
        return () => clearTimeout(timer)
      } catch (e) {
        setIsLoading(false)
      }
    },

    [],
  )

  useEffect(() => {
    if (currentTrainer === currentTraining?.trainer) return

    if (params && params.group && !currentTraining) {
      callPosts()
    }
    return () => {
      setIsLoading(false)
    }
  }, [currentTraining])

  const changeLevel = (level) => {
    const { tags, tagsExclude } = getTagsAndTagsExcludedByLevel({
      level,
      apiTags,
    })

    callPosts(level, currentTrainer, tags, tagsExclude)
  }

  const changeTrainer = (trainer) => {
    if (trainer === currentTrainer) return

    setCurrentTrainer(trainer)

    const { tags, tagsExclude } = getTagsAndTagsExcludedByLevel({
      level: currentTraining?.level,
      apiTags,
    })

    callPosts(currentTraining?.level, trainer, tags, tagsExclude)
  }

  const refreshRoutine = () => {
    callPosts(currentTraining?.level, currentTrainer, '', '')
  }

  return {
    changeLevel,
    changeTrainer,
    isLoading,
    callPosts,
    refreshRoutine,
  }
}
