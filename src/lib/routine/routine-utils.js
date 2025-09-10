import { DAYS, TRAINER_TYPE } from '@/lib/routine/routine-constants'

import dictionary from '@/dictionary/lang.json'

export const EXERCISE_STATES = {
  START: 'start',
  READY: 'ready',
  PAUSE: 'pause',
  RESTART: 'restart',
  FINISH: 'finish',
}
import shuffle from 'array-shuffle'

export const timeToString = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  if (minutes > 0 && seconds > 0) {
    return `${minutes} ${
      minutes > 1 ? dictionary['minutes'] : dictionary['minute']
    }, ${seconds} ${seconds > 1 ? dictionary['seconds'] : dictionary['second']}`
  } else if (minutes > 0) {
    return `${minutes} ${
      minutes > 1 ? dictionary['minutes'] : dictionary['minute']
    }`
  } else {
    return `${seconds} ${
      seconds > 1 ? dictionary['seconds'] : dictionary['second']
    }`
  }
}

export const formatTime = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = time - minutes * 60
  return `${minutes < 10 ? '0' : ''}${minutes}:${
    seconds < 10 ? '0' : ''
  }${seconds}`
}

export const getCategoryIDByFocusArea = (categories, focusAreas = []) => {
  const slugsCategoriesToMatch = focusAreas?.find(
    (area) => area?.active,
  )?.category

  return (
    categories?.find((item) => item.slug === slugsCategoriesToMatch)?.id || 0
  )
}

export const getTagsIDByTargets = (apiTags, targets = []) => {
  const slugsTagsToMatch = targets.map((target) => target.tag)

  return apiTags
    ?.filter((item) => slugsTagsToMatch.includes(item.slug))
    .map((item) => item.id)
}

export const getTrainerIDToExclude = (apiTags, trainer) => {
  // buscar en apiTags todos los tags que coincidan con TRAINER_TYPE.male y TRAINER_TYPE.female
  const trainers = apiTags?.filter(
    (item) =>
      item.slug === TRAINER_TYPE.male || item.slug === TRAINER_TYPE.female,
  )

  // comparar los tags con el trainer seleccionado y obtener los id opuestos no seleccionados
  const trainerIDToExclude = trainers
    ?.filter((tag) => tag.id !== trainer)
    .map((tag) => tag.id)

  return trainerIDToExclude
}

export const getWeekRoutine = (exercises = []) => {
  const EXERCISES_PER_DAY = 6
  const DAYS_PER_WEEK = 3
  const TOTAL_EXERCISES_NEEDED = EXERCISES_PER_DAY * DAYS_PER_WEEK // 18 ejercicios
  let data = []
  // Caso 1: Hay ejercicios para armar una semana completa

  if (exercises.length >= TOTAL_EXERCISES_NEEDED) {
    data = [...shuffle(exercises)]
  } else {
    while (data.length && data.length < TOTAL_EXERCISES_NEEDED) {
      data = [...shuffle(data)]
    }
  }

  return data.slice(0, TOTAL_EXERCISES_NEEDED)
}

export const getSortedDays = (days = []) => {
  return DAYS.filter((day) => days.includes(day))
}

export const getExercisesPercentage = (sections = []) => {
  const totalExercises = 24
  const completedExercises = sections?.reduce((acc, curr) => {
    const arrayCompleted = curr.exercises.filter((r) => r.completed)

    return acc + arrayCompleted.length
  }, 0)
  return ((completedExercises / totalExercises) * 100).toFixed(0)
}

export const isCompletedWeek = (days = []) => {
  return days.filter((day) => day.completed).length === days.length
}
