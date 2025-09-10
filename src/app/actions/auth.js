'use server'

import { cookies } from 'next/headers'
import NextCrypto from 'next-crypto'
import { ENDPOINT_VALIDATION_HASH } from '@/config/config'

const cryptoUser = new NextCrypto('user enabled')
const cryptoTrial = new NextCrypto('trial')

export async function validateUser(hashID) {
  const cookieStore = cookies()

  // Lógica para verificar usuario existente y trial
  const userExist = cookieStore.get('enabledUser')
  const trial = cookieStore.get('trial')

  if (!userExist && !trial) {
    await createTrialToken(3)
  }

  if (hashID) {
    const userIsAuth = await getValidationEndpoint(hashID)
    await createToken({ authValue: userIsAuth, hash: hashID })
  } else {
    const storedHashID = cookieStore.get('hashID')
    if (storedHashID) {
      const userIsAuth = await getValidationEndpoint(storedHashID.value)
      await createToken({ authValue: userIsAuth, hash: storedHashID.value })
    } else {
      await createToken({ authValue: false, hash: 0 })
    }
  }

  // Revisar si el usuario está activo
  const activeUser = cookieStore.get('enabledUser')
  if (activeUser && (await cryptoUser.decrypt(activeUser.value)) === 'true') {
    return true
  }

  return false
}

async function getValidationEndpoint(hashID) {
  const res = await fetch(ENDPOINT_VALIDATION_HASH + hashID)
  const data = await res.json()
  return data.success && data.isValid
}

async function createToken({ authValue, hash }) {
  const cookieStore = cookies()
  const encryptedAuth = await cryptoUser.encrypt(authValue.toString())
  cookieStore.set('enabledUser', encryptedAuth, {
    httpOnly: true,
    secure: true,
  })
  cookieStore.set('hashID', hash, { httpOnly: true, secure: true })
}

async function createTrialToken(trialValue) {
  const cookieStore = cookies()
  const encryptedTrial = await cryptoTrial.encrypt(trialValue.toString())
  cookieStore.set('trial', encryptedTrial, { httpOnly: true, secure: true })
}

export async function getTrialValue() {
  const cookieStore = cookies()
  const trial = cookieStore.get('trial')
  if (trial) {
    const decryptedValue = await cryptoTrial.decrypt(trial.value)
    return parseInt(decryptedValue, 10)
  }
  return 0
}

export async function updateTrialValue(newValue) {
  const cookieStore = cookies()
  const encryptedTrial = await cryptoTrial.encrypt(newValue.toString())
  cookieStore.set('trial', encryptedTrial, { 
    httpOnly: true, 
    secure: true,
    maxAge: 60 * 60 * 24 * 10 // 10 días
  })
  return newValue
}