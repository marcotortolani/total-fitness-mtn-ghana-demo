import shuffle from 'array-shuffle'
import { getNewData } from '@/services/api-content'
import {
  getCategoryIDByFocusArea,
  getTagsIDByTargets,
  getWeekRoutine,
} from '@/lib/routine/routine-utils'

export const fetchFullBodyData = async (tags = '', tagsExclude = '') => {
  let slugLowerBody = `/posts?per_page=${50}&categories=84`
  let slugUpperBody = `/posts?per_page=${50}&categories=83`

  if (tags.length) {
    slugLowerBody = slugLowerBody + '&tags=' + tags
    slugUpperBody = slugUpperBody + '&tags=' + tags
  }
  if (tagsExclude.length) {
    slugLowerBody = slugLowerBody + '&tags_exclude=' + tagsExclude
    slugUpperBody = slugUpperBody + '&tags_exclude=' + tagsExclude
  }

  let lowerBodyExercises
  let upperBodyExercises
  try {
    lowerBodyExercises = await getNewData(slugLowerBody)
    upperBodyExercises = await getNewData(slugUpperBody)
  } catch (e) {
    throw e
  }

  return [
    ...shuffle(lowerBodyExercises.data),
    ...shuffle(upperBodyExercises.data),
  ]
}

export const fetchNotFullBodyData = async (slug) => {
  let response

  try {
    response = await getNewData(slug)
  } catch (e) {
    throw e
  }

  return response.data
}

export const fetchRoutine = async (tags = '', category, tagsExclude = '') => {
  let slug = `/posts?per_page=${50}&categories=${category}`
  if (tags.length) {
    slug = slug + '&tags=' + tags
  }
  if (tagsExclude.length) {
    slug = slug + '&tags_exclude=' + tagsExclude
  }

  let routines
  try {
    if (category === 82) {
      routines = await fetchFullBodyData(tags, tagsExclude)
    } else {
      routines = await fetchNotFullBodyData(slug)
    }
  } catch (e) {
    console.log({ e })
  }

  return getWeekRoutine(routines)
}
