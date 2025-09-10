'use client'
import React, { createContext, useEffect } from 'react'
import { validateUser } from '@/app/actions/auth'

const ValidationContext = createContext()

function ValidationProvider({ children }) {
  const getHashID = () => {
    return window.location.href.split('/?')[1] || null
  }

  useEffect(() => {
    const hashID = getHashID()
    validateUser(hashID)
  }, [])

  return (
    <ValidationContext.Provider value={''}>
      {children}
    </ValidationContext.Provider>
  )
}

export { ValidationContext, ValidationProvider }
