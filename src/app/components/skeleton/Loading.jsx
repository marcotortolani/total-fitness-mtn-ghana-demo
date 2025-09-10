import Image from 'next/image'
import logo from '/public/assets/img/logo.svg'
export default function Loading() {
  return (
    <div className=" z-50 relative w-full h-[80vh] bg-transparent px-4 flex flex-col items-center justify-center">
      <div className=" w-4/5 aspect-video flex items-center justify-center bg-gradient-to-br from-Primary to-PrimaryDark/60 rounded-xl shadow-xl shadow-black animate-pulse">
        <Image className=" w-4/5 h-auto" src={logo} alt="logo" />
      </div>
    </div>
  )
}
