'use client'
import { useCallback, useContext, useEffect, useState } from 'react'
import { StateContext } from '@/providers/StateProvider'
import { useRoutineStore } from '@/lib/routine/routine-stores'
import {
  getCategoryIDByFocusArea,
  getTagsIDByTargets,
  getTrainerIDToExclude,
} from '@/lib/routine/routine-utils'
import { fetchRoutine } from '@/lib/routine/routine-actions'
import { getNewData } from '@/services/api-content'

export const useNutritionPostsHook = () => {
  const [nutritionPosts, setNutritionPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const { apiCategories } = useContext(StateContext)

  const callback = useCallback(async () => {
    try {
      const categories = apiCategories
        .filter((category) => category.slug === 'nutrition')
        .map((item) => item.id)
        .join(',')

      const slug = `/posts?per_page=6&categories=${categories}`

      const response = await getNewData(slug)

      setNutritionPosts(response.data)
    } catch (error) {
      setLoading(false)
    }

    setLoading(false)
  }, [apiCategories])

  useEffect(() => {
    callback()
  }, [callback])

  return { nutritionPosts, loading }
}

export const useRoutineWeek = () => {
  const { weekRoutine, profile, updateRoutineExercises } = useRoutineStore()
  const [loading, setLoading] = useState(false)
  const { apiCategories, apiTags } = useContext(StateContext)

  const tags = getTagsIDByTargets(apiTags, profile.target)
  const tagsExclude = getTrainerIDToExclude(apiTags, profile.trainer)
  const levelSelected = profile.levels
    .find((level) => level.active)
    ?.name.toLowerCase()

  const category = getCategoryIDByFocusArea(apiCategories, profile.focusAreas)

  const callback = useCallback(async () => {
    setLoading(true)

    let tagsFetch = '',
      tagsExcludeFetch = ''

    if (levelSelected === 'beginner') {
      tagsFetch = tags
      const tagsIDExcluded = getTagsIDByTargets(apiTags, [
        { tag: 'intermediate' },
        { tag: 'advanced' },
      ])
      tagsExcludeFetch = `${tagsExclude},${tagsIDExcluded}`
    }

    if (levelSelected === 'intermediate') {
      const tagsIDIncluded = getTagsIDByTargets(apiTags, [
        { tag: 'intermediate' },
      ])
      tagsFetch = `${tagsIDIncluded},${tags}`
      // const tagsIDExcluded = getTagsIDByTargets(apiTags, [{ tag: 'advanced' }])
      // tagsExcludeFetch = `${tagsExclude},${tagsIDExcluded}`
      tagsExcludeFetch = `${tagsExclude}`
    }

    if (levelSelected === 'advanced') {
      const tagsIDIncluded = getTagsIDByTargets(apiTags, [{ tag: 'advanced' }])
      tagsFetch = `${tagsIDIncluded},${tags}`
      // const tagsIDExcluded = getTagsIDByTargets(apiTags, [
      //   { tag: 'intermediate' },
      // ])
      // tagsExcludeFetch = `${tagsExclude},${tagsIDExcluded}`
      tagsExcludeFetch = `${tagsExclude}`
    }

    const routine = await fetchRoutine(tagsFetch, category, tagsExcludeFetch)

    updateRoutineExercises(routine)

    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [tags, category, tagsExclude])

  return { weekRoutine, loading, callback }
}
