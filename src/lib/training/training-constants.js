import dictionary from '@/dictionary/lang.json'

export const TRAINING_OPTIONS = [
  {
    value: '',
    label: dictionary['Select the type of trainer'],
  },
]

export const LEVEL_OPTIONS = [
  {
    value: 1,
    name: 'Beginner',
  },
  {
    value: 2,
    name: 'Intermediate',
  },
  {
    value: 3,
    name: 'Advanced',
  },
]

export const EXERCISE_STATES = {
  START: 'start',
  READY: 'ready',
  PAUSE: 'pause',
  RESTART: 'restart',
  FINISH: 'finish',
}

export const EXERCISE_STORE_INITIAL = {
  open: false,
  exercise: undefined,
  section: undefined,
}

export const TRAINING_INITIAL = {
  chest: undefined,
  'arms-and-shoulders': undefined,
  'glutes-and-legs': undefined,
  abs: undefined,
}
