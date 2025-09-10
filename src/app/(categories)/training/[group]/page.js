'use client'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
import { RefreshCw } from 'lucide-react'

import {
  LEVEL_OPTIONS,
  TRAINING_OPTIONS,
} from '@/lib/training/training-constants'
import { TAGS } from '@/lib/constants'
import { totalTime } from '@/lib/training/training-utils'
import { timeToString } from '@/utils/util'

import { RefreshDialog } from '@/lib/training/components/RefreshDialog'
import { useTraining } from '@/lib/training/training-hooks'
import { ButtonLevel } from '@/lib/training/components/ButtonLevel'
import { ExerciseSection } from '@/lib/training/components/ExerciseSection'
import {
  useExerciseStore,
  useTrainingRefreshStore,
  useTrainingStore,
} from '@/lib/training/training-stores'
import { ExerciseSections } from '@/lib/training/components/ExerciseSections'
import dictionary from '@/dictionary/lang.json'

const TrainingLoading = dynamic(() =>
  import('@/lib/training/components/TrainingLoading'),
)
const AnimatedDropdown = dynamic(() =>
  import('@/app/components/ui/AnimatedDropdownButton'),
)
import { PersonFemale, PersonMale } from '@/utils/icons'

export default function Page() {
  const params = useParams()
  const { group } = params

  const { exercise } = useExerciseStore()
  const {
    onOpen,
    open: openTrainingRefreshDialog,
    onClose,
  } = useTrainingRefreshStore()

  const { training } = useTrainingStore()

  const currentTraining = training[group]
  const { changeLevel, changeTrainer, isLoading, refreshRoutine } =
    useTraining()

  const handleRefreshRoutine = () => {
    onClose()
    refreshRoutine()
  }

  const handleLevel = (level) => {
    if (level === currentTraining?.level) return
    changeLevel(level)
  }

  const TRAINERS_OPTIONS = [
    ...TRAINING_OPTIONS,
    ...[
      {
        value: TAGS['trainer-male'],
        label: dictionary['Trainer (male)'],
      },
      {
        value: TAGS['trainer-female'],
        label: dictionary['Trainer (female)'],
      },
    ],
  ]

  return (
    <main className="relative w-screen top-8 md:top-10 h-[90dvh] md:h-[94dvh] flex flex-col items-center overflow-x-hidden">
      <div
        className={`${
          openTrainingRefreshDialog &&
          ' overflow-hidden pointer-events-none h-screen'
        } ${
          isLoading && ' overflow-hidden pointer-events-none'
        }  relative mt-0 lg:mt-0 w-full h-full flex justify-center  `}
      >
        <header
          className={`${
            exercise
              ? ' -translate-x-[200%] opacity-0 hidden'
              : ' translate-x-0 opacity-100 block'
          } z-40 fixed lg:top-18 lg:mt-2  w-full max-w-screen-md bg-DarkGray py-4 px-2 lg:px-4 shadow-md shadow-black/80 transition-all duration-200 ease-in-out`}
        >
          <div className=" relative px-4 mb-2 w-full flex flex-col items-start gap-1">
            <h1 className=" w-[90%]  text-White uppercase font-oswaldSemBold text-2xl md:text-3xl">
              {dictionary['Routine']}: {group.replaceAll('-', ' ')}
            </h1>
            {TRAINERS_OPTIONS.length && (
              <div className="z-20 w-full flex items-center gap-2 lg:gap-3">
                <div className=" relative w-10 aspect-square bg-White rounded-full overflow-hidden">
                  <div
                    className={`${
                      currentTraining && currentTraining?.trainer !== ''
                        ? 'scale-100 opacity-100'
                        : 'scale-0 opacity-0'
                    }  absolute -bottom-[1px] w-full h-full pt-1 overflow-hidden rounded-[inherit] transition-all duration-300 ease-in-out`}
                  >
                    {currentTraining?.trainer === 112 ? (
                      <PersonMale className=" w-full h-full" fill="#35AAE5" />
                    ) : (
                      <PersonFemale className=" w-full h-full" fill="#E535B0" />
                    )}
                  </div>
                </div>
                <AnimatedDropdown
                  selected={currentTraining?.trainer}
                  options={TRAINERS_OPTIONS}
                  onChange={changeTrainer}
                />
              </div>
            )}

            <p className=" text-left w-full text-White font-oswaldLight uppercase text-xs md:text-sm">
              {dictionary['Routine time']}:{' '}
              {timeToString(totalTime(currentTraining?.level))}
            </p>
            <button
              type="button"
              className=" text-Primary uppercase font-oswaldLight   absolute top-2 right-4"
              onClick={() => onOpen()}
            >
              <RefreshCw className=" w-6 h-6 lg:w-8 lg:h-8 " />
            </button>
          </div>
          <div className="flex justify-around w-full lg:justify-between lg:px-4  mx-auto">
            {LEVEL_OPTIONS.map((option, key) => (
              <ButtonLevel
                key={key}
                name={dictionary[option.name]}
                onClick={() => handleLevel(option.value)}
                active={currentTraining?.level === option.value}
              />
            ))}
          </div>
        </header>

        {/* Loading animation */}
        {isLoading ? (
          <TrainingLoading />
        ) : (
          <section
            className={`${
              exercise
                ? ' translate-y-[200%] scale-y-0 hidden '
                : ' translate-y-0 scale-100 '
            } w-full   mt-44 md:mt-48 lg:mt-52 max-w-screen-md h-fit overflow-hidden px-2 xs:px-4 md:px-8 pt-5 mb-0 pb-24 flex flex-col items-center gap-8 transition-all duration-200 ease-in-out`}
          >
            {currentTraining?.trainer !== '' ? (
              <ExerciseSections />
            ) : (
              <div className=" w-2/3 h-fit mt-20">
                <p className=" text-White font-oswaldReg uppercase text-center">
                  {dictionary['To generate toyr routine, you must select a']}{' '}
                  <span className="text-Primary">{dictionary['Trainer']}</span>
                </p>
              </div>
            )}
          </section>
        )}

        <ExerciseSection />
      </div>

      <RefreshDialog onSuccess={handleRefreshRoutine} />
    </main>
  )
}
