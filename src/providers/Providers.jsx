import { StateProvider } from './StateProvider'
//import { ValidationProvider } from './ValidationProvider'

export default function Providers({ children }) {
  return <StateProvider>{children}</StateProvider>

  // return (
  //   <ValidationProvider>
  //     <StateProvider>{children}</StateProvider>
  //   </ValidationProvider>
  // )
}
