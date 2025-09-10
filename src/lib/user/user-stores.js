import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { USER_DATA_INITIAL } from '@/lib/constants'
import { PRODUCT_NAME } from '@/config/config'

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: USER_DATA_INITIAL,
      update: (data) => set({ user: { ...get().user, ...data } }),
    }),
    {
      name: `user-${PRODUCT_NAME}`,
    },
  ),
)
