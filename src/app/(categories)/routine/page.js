'use client'
import dynamic from 'next/dynamic'
import {
  useRoutineStore,
  useUpdateRoutineStore,
} from '@/lib/routine/routine-stores'
const Routine = dynamic(() => import('@/lib/routine/Routine'), { ssr: false })

import dictionary from '@/dictionary/lang.json'

export default function Page() {
  const { onClose, open } = useUpdateRoutineStore()
  const { onCanUpdate } = useRoutineStore()

  return (
    <main className="w-screen bg-DarkGray flex justify-center  overflow-hidden lg:overflow-y-hidden lg:mt-[76px] items-center">
      <Routine />
      <div
        className={`${
          open
            ? ' scale-100 bg-Black/50 backdrop-blur-sm '
            : ' scale-0 bg-Black/0 '
        } absolute z-50 top-0 w-screen h-full overflow-hidden pointer-events-none flex items-center justify-center  transition-all duration-200 ease-in-out`}
      >
        <div className=" w-4/5 max-w-[400px] aspect-video flex flex-col items-center justify-evenly px-4 bg-Primary text-DarkGray rounded-xl">
          <p className=" text-center text-DarkGray uppercase font-oswaldReg ">
            {
              dictionary[
                'Editing the profile will delete the current routine and create a new one'
              ]
            }
          </p>
          <p className=" text-center text-DarkGray uppercase font-oswaldReg ">
            {dictionary['Do you want to continue?']}
          </p>
          <div className=" w-full grid grid-cols-2 justify-between pointer-events-auto">
            <button
              type="button"
              onClick={() => onClose()}
              className=" uppercase text-xl font-oswaldSemBold text-DarkGray"
            >
              {dictionary['Cancel']}
            </button>
            <button
              type="button"
              onClick={() => onCanUpdate(true)}
              className=" uppercase text-xl font-oswaldSemBold text-DarkGray"
            >
              {dictionary['Edit']}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
