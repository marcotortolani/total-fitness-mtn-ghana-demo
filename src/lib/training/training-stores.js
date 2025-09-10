import { create } from 'zustand'
import {
  EXERCISE_STORE_INITIAL,
  TRAINING_INITIAL,
} from '@/lib/training/training-constants'
import { persist } from 'zustand/middleware'
import { PRODUCT_NAME } from '@/config/config'

export const useExerciseStore = create((set) => ({
  ...EXERCISE_STORE_INITIAL,
  onClose: () => set(() => EXERCISE_STORE_INITIAL),
  onOpen: (exercise, section) => set(() => ({ open: true, exercise, section })),
  onChangeExerciseSection: (exercise, section) =>
    set(() => ({ exercise, section })),
}))

export const useTrainingRefreshStore = create((set) => ({
  open: false,
  onClose: () => set({ open: false }),
  onOpen: () => set({ open: true }),
}))

export const useTrainingStore = create(
  persist(
    (set, get) => ({
      training: TRAINING_INITIAL,
      createTraining: (exercises = [], level = 1, trainer = '', group) => {
        return set({
          training: {
            ...get().training,
            [group]: {
              level,
              trainer,
              sections: new Array(4).fill(null).map((_, key) => ({
                id: key + 1,
                completed: false,
                exercises: exercises.map((exercise) => ({
                  ...exercise,
                  completed: false,
                })),
              })),
            },
          },
        })
      },
      completeSection: (group, sectionId) =>
        set((state) => {
          const sections = state.training[group].sections || []
          const section = sections.find((section) => section.id === sectionId)
          section.completed = true
          return state
        }),
      completeExercise: (group, sectionId, exerciseId) =>
        set((state) => {
          const exercise = state.training[group]?.sections
            .find((section) => section.id === sectionId)
            .exercises.find((exercise) => exercise.id === exerciseId)
          exercise.completed = true
          return state
        }),
    }),
    {
      name: `training-${PRODUCT_NAME}`,
    },
  ),
)
