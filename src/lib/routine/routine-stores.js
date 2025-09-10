import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ROUTINE_PROFILE, USER_ROUTINE } from '@/lib/routine/routine-constants'
import { EXERCISE_STORE_INITIAL } from '@/lib/training/training-constants'
import { PRODUCT_NAME } from '@/config/config'

export const useRoutineStore = create(
  persist(
    (set, get) => ({
      profile: ROUTINE_PROFILE,
      range: 0,
      routine: [],
      canUpdate: false,
      update: (data) => set({ profile: data }),
      isCompletedForm: false,
      updateTrainer: (trainer) =>
        set((state) => {
          return {
            ...state,
            profile: {
              ...state.profile,
              trainer,
            },
          }
        }),
      updateRoutineExercises: (exercises = []) =>
        set(() => {
          const routine = USER_ROUTINE.map((_routine) => ({
            ..._routine,
            days: _routine.days.map((item) => {
              const position = (item.day - 1) * 6
              return {
                ...item,
                completed: false,
                sections: item.sections.map((section) => ({
                  ...section,
                  completed: false,
                  exercises: exercises
                    .slice(position, position + 6)
                    .map((exercise) => ({
                      ...exercise,
                      completed: false,
                    })),
                })),
              }
            }),
          }))

          return { routine }
        }),
      updateTarget: (targetId) =>
        set((state) => {
          return {
            profile: {
              ...state.profile,
              target: state.profile.target.map((target) =>
                target.id === targetId
                  ? { ...target, active: !target.active }
                  : target,
              ),
            },
          }
        }),
      completedForm: () => set({ isCompletedForm: true }),
      updateRange: (rangeValue) =>
        set((state) => {
          let level = 0
          if (rangeValue > 100 / 3 && rangeValue <= (100 / 3) * 2) {
            level = 1
          } else if (rangeValue > (100 / 3) * 2 && rangeValue <= 100) {
            level = 2
          }

          return {
            range: rangeValue,
            profile: {
              ...state.profile,
              levels: state.profile.levels.map((_level, index) => {
                return {
                  ..._level,
                  active: index === level,
                }
              }),
            },
          }
        }),
      updateDays: (day) =>
        set((state) => {
          let days

          if (state.profile.days.includes(day)) {
            days = state.profile.days.filter((_day) => _day !== day)
          } else if (state.profile.days.length === 3) {
            days = [...state.profile.days.slice(1), day]
          } else {
            days = [...state.profile.days, day]
          }

          return {
            ...state,
            profile: {
              ...state.profile,
              days,
            },
          }
        }),
      updateFocusArea: (focusArea) =>
        set((state) => {
          return {
            profile: {
              ...state.profile,
              focusAreas: state.profile.focusAreas.map((_focusArea) => {
                return {
                  ..._focusArea,
                  active: _focusArea.id === focusArea.id,
                }
              }),
            },
          }
        }),
      completeExercise: (week, day, sectionId, exerciseId) =>
        set((state) => {
          const exercise = state.routine
            .find((r) => r.week === parseInt(week))
            .days.find((r) => r.day === parseInt(day))
            .sections.find((section) => section.id === sectionId)
            .exercises.find((exercise) => exercise.id === exerciseId)
          exercise.completed = true
          return state
        }),
      completeSection: (week, day, sectionId) =>
        set((state) => {
          const section = state.routine
            .find((r) => r.week === parseInt(week))
            .days.find((r) => r.day === parseInt(day))
            .sections.find((section) => section.id === sectionId)
          section.completed = true
          return state
        }),
      completeDay: (week, day) =>
        set((state) => {
          const _day = state.routine
            .find((r) => r.week === parseInt(week))
            .days.find((r) => r.day === parseInt(day))
          _day.completed = true
          return state
        }),
      onCanUpdate: (canUpdate = false) => set({ canUpdate }),
    }),
    {
      name: `routine_profile-${PRODUCT_NAME}`,
      partialize: (state) => {
        return Object.fromEntries(
          Object.entries(state).filter(([key]) => !['canUpdate'].includes(key)),
        )
      },
    },
  ),
)

export const useRoutineExerciseStore = create((set) => ({
  ...EXERCISE_STORE_INITIAL,
  onClose: () => set(() => EXERCISE_STORE_INITIAL),
  onOpen: (exercise, section) => set(() => ({ open: true, exercise, section })),
  onChangeExerciseSection: (exercise, section) =>
    set(() => ({ exercise, section })),
}))

export const useUpdateRoutineStore = create((set) => ({
  open: false,
  onOpen: () => set(() => ({ open: true })),
  onClose: () => set(() => ({ open: false })),
}))
