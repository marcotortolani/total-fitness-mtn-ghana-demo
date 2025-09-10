'use client'
import React, { createContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { getTrialValue, updateTrialValue } from '@/app/actions/auth'
import SubscribeCard from '@/app/components/SubscribeCard'

const TrialContext = createContext()

function TrialProvider({ children }) {
  const path = usePathname()
  const [trialToken, setTrialToken] = useState(0)
  const [prevPath, setPrevPath] = useState('/')

  useEffect(() => {
    if (path !== prevPath && trialToken > 0) {
      updateTrialToken()
      setTrialToken((prev) => prev - 1)
      setPrevPath(path)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path])

  useEffect(() => {
    async function fetchTrialValue() {
      const value = await getTrialValue()
      setTrialToken(value)
      if (value > 0) {
        updateTrialToken()
      }
    }
    fetchTrialValue()
  }, [])

  async function updateTrialToken() {
    const value = await getTrialValue()
    return await updateTrialValue(value - 1)
  }

  return (
    <TrialContext.Provider value={{ trialToken, updateTrialToken }}>
      {trialToken > 0 ? children : <SubscribeCard />}
    </TrialContext.Provider>
  )
}

export { TrialContext, TrialProvider }
