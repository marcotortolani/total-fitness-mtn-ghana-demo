'use client'
import Lottie from 'lottie-react'
import sandClock from '@/lottie/sand-clock.json'
import dictionary from '@/dictionary/lang.json'

const TrainingLoading = () => (
  <div className=" w-full max-w-screen-md h-2/3 mt-48 flex flex-col items-center justify-center gap-0 ">
    <p className=" w-2/3 pl-2 text-center text-White font-oswaldReg uppercase text-xl">
      {dictionary['Please wait while we prepare']}{' '}
      <span className=" text-Primary">{dictionary['your routine']}...</span>
    </p>
    <Lottie
      animationData={sandClock}
      loop={true}
      style={{
        width: 300,
        height: 300,
      }}
    />
  </div>
)

export default TrainingLoading
