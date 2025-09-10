import { cookies } from 'next/headers'
import { TrialProvider } from '@/providers/TrialProvider'
import NextCrypto from 'next-crypto'

const cryptoUser = new NextCrypto('user enabled')

export default async function Layout({ children }) {
  const cookieStore = cookies()
  const activeUser = cookieStore.get('enabledUser')
  //let userEnabled = false
  let userEnabled = true

  // if (activeUser) {
  //   userEnabled = (await cryptoUser.decrypt(activeUser.value)) === 'true'
  // }

  const ChildrenAuth = () => {
    if (userEnabled) return children
    return <TrialProvider>{children}</TrialProvider>
  }

  return (
    <div className=" z-0 mt-6 w-full  flex flex-col items-center relative">
      <ChildrenAuth />
    </div>
  )
}
