import { getTagBySlug } from '@/utils/util'
import shuffle from 'array-shuffle'

export const mappingTrainingOptions = (tags = [], selectedOptions = []) => {
  return tags
    .filter((tag) => selectedOptions.includes(tag.id))
    .map((tag) => ({
      value: tag.id,
      label: tag.name,
    }))
}

export const getRoutine = (
  exercises = [],
  level = 1,
  tags = [],
  EXERCISES_PER_DAY = 6,
) => {
  const tagIntermediate = getTagBySlug(tags, 'intermediate')
  const tagAdvanced = getTagBySlug(tags, 'advanced')

  let data = []
  const exercisesBeginner = exercises.filter(
    (item) =>
      !item.tags.some((tagId) =>
        [tagIntermediate?.id, tagAdvanced?.id].includes(tagId),
      ),
  )

  const exercisesIntermediate = exercises.filter((item) =>
    item.tags.some((tagId) => tagId === tagIntermediate.id),
  )

  const exercisesAdvanced = exercises.filter((item) =>
    item.tags.some((tagId) => tagId === tagAdvanced.id),
  )

  switch (level) {
    case 2:
      // Si no hay suficientes ejercicios intermediates, complementa con básicos
      data = [...shuffle(exercisesIntermediate).slice(0, EXERCISES_PER_DAY)]

      if (exercisesIntermediate.length < EXERCISES_PER_DAY) {
        data = [
          ...data,
          ...shuffle(exercisesBeginner).slice(
            0,
            EXERCISES_PER_DAY - exercisesIntermediate.length,
          ),
        ]
      }

      break
    case 3:
      data = [...shuffle(exercisesAdvanced).slice(0, EXERCISES_PER_DAY)]

      // TODO: descomentar cuando los tags "avanzado" e "intermedio" tengan rutinas propias
      // if (exercisesAdvanced.length < EXERCISES_PER_DAY) {
      //   console.log('completando ejercicios')
      //   data = [
      //     ...data,
      //     ...shuffle(exercisesIntermediate).slice(
      //       0,
      //       EXERCISES_PER_DAY - exercisesAdvanced.length,
      //     ),
      //   ]
      // }

      // if (data.length < EXERCISES_PER_DAY) {
      //   console.log('completando ejercicios')

      //   data = [
      //     ...data,
      //     ...shuffle(exercisesBeginner).slice(
      //       0,
      //       EXERCISES_PER_DAY - data.length,
      //     ),
      //   ]
      // }
      // TODO: eliminar esto cuando los tags "avanzado" e "intermedio" tengan rutinas propias
      if (exercisesAdvanced.length < EXERCISES_PER_DAY) {
        data = [
          ...data,
          ...shuffle(exercisesBeginner).slice(
            0,
            EXERCISES_PER_DAY - exercisesAdvanced.length,
          ),
        ]
      }

      break
    default:
      // Si no hay suficientes ejercicios básicos, completar con básicos repetidos
      // Añadir ejercicios básicos repetidos hasta completar los 6 ejercicios

      if (exercisesBeginner.length < EXERCISES_PER_DAY) {
        for (let i = 0; i < exercisesBeginner.length; i++) {
          data = [...exercisesBeginner]

          if (data.length > EXERCISES_PER_DAY) break
        }
      } else {
        data = [
          ...shuffle(exercisesBeginner).slice(
            0,
            EXERCISES_PER_DAY - data.length,
          ),
        ]
      }

      break
  }

  return data
}

export const totalTime = (level = 0) => {
  if (!level) return 60 * 6 * 4

  return (60 + (level - 1) * 15) * 6 * 4
}

export const getTagsAndTagsExcludedByLevel = ({ level, apiTags }) => {
  let tags = '',
    tagsExclude = ''

  if (level === 1) {
    tagsExclude = apiTags
      ?.filter((tag) => tag.name === 'intermediate' || tag.name === 'advanced')
      .map((tag) => tag.id)
      .join(',')
  } else {
    tags = apiTags
      ?.filter((tag) => tag.name === 'intermediate' || tag.name === 'advanced')
      .map((tag) => tag.id)
      .join(',')
  }

  // TODO: descomentar cuando el nivel "intermediate" tenga rutinas propias
  // if (level === 2) {
  //   tagsExclude = apiTags
  //     ?.filter((tag) => tag.name === 'advanced')
  //     .map((tag) => tag.id)
  //     .join(',')
  // }

  return {
    tags,
    tagsExclude,
  }
}

export const getTrainerIDToExclude = (apiTags, trainer) => {
  return apiTags
    ?.filter((tag) => tag.slug.includes('trainer') && tag.id !== trainer)
    .map((tag) => tag.id)
    .join(',')
}
