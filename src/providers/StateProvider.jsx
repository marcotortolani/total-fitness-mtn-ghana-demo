'use client'
import React, { createContext, useEffect } from 'react'
import useLocalStorage from '@/hooks/useLocalStorage'
import { getNewData } from '@/services/api-content'

import { USER_DATA_INITIAL } from '@/lib/constants'
import { ROUTINE_PROFILE } from '@/lib/routine/routine-constants'

import { PRODUCT_NAME } from '@/config/config'

const StateContext = createContext()
const favouritePostsInitial = []

export const userStateRoutineInitial = [
  {
    id: 1,
    week: 1,
    day: [
      {
        id: 1,
        day: 1,
        block: [
          {
            id: 1,
            block: 1,
            exercises: [],
          },
          {
            id: 2,
            block: 2,
            exercises: [],
          },
          {
            id: 3,
            block: 3,
            exercises: [],
          },
          {
            id: 4,
            block: 4,
            exercises: [],
          },
        ],
      },
      {
        id: 2,
        day: 2,
        block: [
          {
            id: 1,
            block: 1,
            exercises: [],
          },
          {
            id: 2,
            block: 2,
            exercises: [],
          },
          {
            id: 3,
            block: 3,
            exercises: [],
          },
          {
            id: 4,
            block: 4,
            exercises: [],
          },
        ],
      },
      {
        id: 3,
        day: 3,
        block: [
          {
            id: 1,
            block: 1,
            exercises: [],
          },
          {
            id: 2,
            block: 2,
            exercises: [],
          },
          {
            id: 3,
            block: 3,
            exercises: [],
          },
          {
            id: 4,
            block: 4,
            exercises: [],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    week: 2,
    day: [
      {
        id: 1,
        day: 1,
        block: [
          {
            id: 1,
            block: 1,
            exercises: [],
          },
          {
            id: 2,
            block: 2,
            exercises: [],
          },
          {
            id: 3,
            block: 3,
            exercises: [],
          },
          {
            id: 4,
            block: 4,
            exercises: [],
          },
        ],
      },
      {
        id: 2,
        day: 2,
        block: [
          {
            id: 1,
            block: 1,
            exercises: [],
          },
          {
            id: 2,
            block: 2,
            exercises: [],
          },
          {
            id: 3,
            block: 3,
            exercises: [],
          },
          {
            id: 4,
            block: 4,
            exercises: [],
          },
        ],
      },
      {
        id: 3,
        day: 3,
        block: [
          {
            id: 1,
            block: 1,
            exercises: [],
          },
          {
            id: 2,
            block: 2,
            exercises: [],
          },
          {
            id: 3,
            block: 3,
            exercises: [],
          },
          {
            id: 4,
            block: 4,
            exercises: [],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    week: 3,
    day: [
      {
        id: 1,
        day: 1,
        block: [
          {
            id: 1,
            block: 1,
            exercises: [],
          },
          {
            id: 2,
            block: 2,
            exercises: [],
          },
          {
            id: 3,
            block: 3,
            exercises: [],
          },
          {
            id: 4,
            block: 4,
            exercises: [],
          },
        ],
      },
      {
        id: 2,
        day: 2,
        block: [
          {
            id: 1,
            block: 1,
            exercises: [],
          },
          {
            id: 2,
            block: 2,
            exercises: [],
          },
          {
            id: 3,
            block: 3,
            exercises: [],
          },
          {
            id: 4,
            block: 4,
            exercises: [],
          },
        ],
      },
      {
        id: 3,
        day: 3,
        block: [
          {
            id: 1,
            block: 1,
            exercises: [],
          },
          {
            id: 2,
            block: 2,
            exercises: [],
          },
          {
            id: 3,
            block: 3,
            exercises: [],
          },
          {
            id: 4,
            block: 4,
            exercises: [],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    week: 4,
    day: [
      {
        id: 1,
        day: 1,
        block: [
          {
            id: 1,
            block: 1,
            exercises: [],
          },
          {
            id: 2,
            block: 2,
            exercises: [],
          },
          {
            id: 3,
            block: 3,
            exercises: [],
          },
          {
            id: 4,
            block: 4,
            exercises: [],
          },
        ],
      },
      {
        id: 2,
        day: 2,
        block: [
          {
            id: 1,
            block: 1,
            exercises: [],
          },
          {
            id: 2,
            block: 2,
            exercises: [],
          },
          {
            id: 3,
            block: 3,
            exercises: [],
          },
          {
            id: 4,
            block: 4,
            exercises: [],
          },
        ],
      },
      {
        id: 3,
        day: 3,
        block: [
          {
            id: 1,
            block: 1,
            exercises: [],
          },
          {
            id: 2,
            block: 2,
            exercises: [],
          },
          {
            id: 3,
            block: 3,
            exercises: [],
          },
          {
            id: 4,
            block: 4,
            exercises: [],
          },
        ],
      },
    ],
  },
]

export const stateDayTrainingInitial = {
  chest: {
    id: 1,
    group: 'chest',
    block: [
      {
        id: 1,
        block: 1,
        exercises: [],
      },
      {
        id: 2,
        block: 2,
        exercises: [],
      },
      {
        id: 3,
        block: 3,
        exercises: [],
      },
      {
        id: 4,
        block: 4,
        exercises: [],
      },
    ],
  },
  'arms-and-shoulders': {
    id: 2,
    group: 'arms-and-shoulders',
    block: [
      {
        id: 1,
        block: 1,
        exercises: [],
      },
      {
        id: 2,
        block: 2,
        exercises: [],
      },
      {
        id: 3,
        block: 3,
        exercises: [],
      },
      {
        id: 4,
        block: 4,
        exercises: [],
      },
    ],
  },
  'glutes-and-legs': {
    id: 3,
    group: 'glutes-and-legs',
    block: [
      {
        id: 1,
        block: 1,
        exercises: [],
      },
      {
        id: 2,
        block: 2,
        exercises: [],
      },
      {
        id: 3,
        block: 3,
        exercises: [],
      },
      {
        id: 4,
        block: 4,
        exercises: [],
      },
    ],
  },
  abs: {
    id: 4,
    group: 'abs',
    block: [
      {
        id: 1,
        block: 1,
        exercises: [],
      },
      {
        id: 2,
        block: 2,
        exercises: [],
      },
      {
        id: 3,
        block: 3,
        exercises: [],
      },
      {
        id: 4,
        block: 4,
        exercises: [],
      },
    ],
  },
}

function StateProvider({ children }) {
  /*  API TAGS & CATEGORIES */
  const [apiTags, setApiTags] = useLocalStorage(`apiTags-${PRODUCT_NAME}`, [])
  const [apiCategories, setApiCategories] = useLocalStorage(
    `apiCategories-${PRODUCT_NAME}`,
    [],
  )
  const [chatbotOpened, setChatbotOpened] = useLocalStorage(
    `chatbotOpened-${PRODUCT_NAME}`,
    false,
  )

  useEffect(() => {
    //if (apiTags?.length || apiCategories?.length) return

    const fetchData = async () => {
      try {
        const tags = await getNewData('/tags?per_page=50')
        const categories = await getNewData('/categories?per_page=50')
        setApiTags(tags?.data)
        setApiCategories(categories?.data)
      } catch (err) {
        console.error('Error fetching data:', err)
      }
    }
    fetchData()

    // getNewData('/tags?per_page=50').then((res) => setApiTags(res?.data))
    // getNewData('/categories?per_page=50').then((res) =>
    //   setApiCategories(res?.data)
    // )
  }, [])

  const [favouritePosts, setFavouritePosts] = useLocalStorage(
    `userFavouritePosts-${PRODUCT_NAME}`,
    [],
  )

  /* LS USER DATA */
  const [userData, setUserData] = useLocalStorage(
    `userData-${PRODUCT_NAME}`,
    [],
  )
  /* LS USER DATA */

  /* LS DATA USER ROUTINES */
  const [userRoutineProfile, setUserRoutineProfile] = useLocalStorage(
    `userRoutineProfile-${PRODUCT_NAME}`,
    [],
  )
  const [stateRoutine, setStateRoutine] = useLocalStorage(
    `userStateRoutine-${PRODUCT_NAME}`,
    [],
  )
  /* LS DATA USER ROUTINES */

  const [userWeekRoutine, setUserWeekRoutine] = useLocalStorage(
    `userWeekRoutine-${PRODUCT_NAME}`,
    [],
  )

  const stateValues = {
    favouritePosts,
    setFavouritePosts,
    userData,
    setUserData,
    userRoutineProfile,
    setUserRoutineProfile,
    stateRoutine,
    setStateRoutine,
    apiTags,
    apiCategories,
    userWeekRoutine,
    setUserWeekRoutine,
    chatbotOpened,
    setChatbotOpened,
  }

  /* Setting initial data */
  useEffect(() => {
    if (!favouritePosts.length) {
      setFavouritePosts(favouritePostsInitial)
    }
    if (!userData.length) {
      setUserData(USER_DATA_INITIAL)
    }

    if (!userRoutineProfile.length) {
      setUserRoutineProfile(ROUTINE_PROFILE)
    }

    if (!stateRoutine.length) {
      setStateRoutine(userStateRoutineInitial)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <StateContext.Provider value={stateValues}>
      {stateValues ? children : null}
    </StateContext.Provider>
  )
}

export { StateContext, StateProvider }
