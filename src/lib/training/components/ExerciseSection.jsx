'use client'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Pause,
  Play,
  Square,
  X,
} from 'lucide-react'
import ReactPlayer from 'react-player'
import Image from 'next/image'
import soundOffIcon from '../../../../public/assets/icons/sound-off.webp'
import soundOnIcon from '../../../../public/assets/icons/sound-on.webp'
import { formatTime } from '@/utils/util'
import parse from 'html-react-parser'
import { PreparingCountdown } from '@/lib/training/components/PreparingCountdown'
import { MotivationalMessages } from '@/lib/training/components/MotivationalMessages'
import { useState, useEffect } from 'react'
import useCountdown from '@/hooks/useCountDown'
import { ExerciseSectionImage } from '@/lib/training/components/ExerciseSectionImage'
import { EXERCISE_STATES } from '@/lib/training/training-constants'
import { useParams } from 'next/navigation'
import {
  useExerciseStore,
  useTrainingStore,
} from '@/lib/training/training-stores'

import dictionary from '@/dictionary/lang.json'

export const ExerciseSection = () => {
  const { open, exercise, onClose, section, onOpen, onChangeExerciseSection } =
    useExerciseStore()
  const params = useParams()
  const { group } = params
  const { training, completeExercise, completeSection } = useTrainingStore()
  const [muted, setMuted] = useState(true)
  const [exerciseState, setExerciseState] = useState('') // "start", "ready", "pause", "finish"
  const { secondsLeft, startCountdown, pauseTimer, resumeTimer } =
    useCountdown(-1)

  const currentTraining = training[params.group]
  const exercisePosition = section?.exercises?.findIndex(
    (_exercise) => _exercise.id === exercise?.id,
  )
  const sectionPosition = currentTraining?.sections?.findIndex(
    (_section) => _section.id === section?.id,
  )

  useEffect(() => {
    if (!exercise) {
      setExerciseState('')
    }
  }, [exercise])

  useEffect(() => {
    if (secondsLeft === -1) return
    if (secondsLeft > 0) return
    setExerciseState(EXERCISE_STATES.FINISH)
  }, [secondsLeft])

  const handleExercises = (state) => {
    // state: "start", "ready", "pause", "finish"

    if (state === EXERCISE_STATES.START) {
      setExerciseState(EXERCISE_STATES.START)
      startCountdown(60 + (currentTraining.level - 1) * 15)
      pauseTimer()
    }

    if (state === EXERCISE_STATES.READY) {
      setExerciseState(EXERCISE_STATES.READY)
      resumeTimer()
    }

    if (state === EXERCISE_STATES.PAUSE) {
      setExerciseState(EXERCISE_STATES.PAUSE)
      // pausar countdown
      pauseTimer()
    }

    if (state === EXERCISE_STATES.RESTART) {
      setExerciseState(EXERCISE_STATES.READY)
      resumeTimer()
    }

    if (state === EXERCISE_STATES.FINISH) {
      setExerciseState('')
      startCountdown(0)
    }
  }

  const handleNextExercise = () => {
    //complete current exercise
    completeExercise(group, section.id, exercise.id)

    const nextExercisePosition = exercisePosition + 1
    const nextSectionPosition = sectionPosition + 1

    if (nextSectionPosition === currentTraining?.sections.length) return null

    if (nextExercisePosition === section?.exercises.length) {
      const nextSection = currentTraining?.sections[nextSectionPosition]

      completeSection(group, section.id)

      onChangeExerciseSection(nextSection.exercises[0], nextSection)
    } else {
      onChangeExerciseSection(section?.exercises[nextExercisePosition], section)
    }

    setExerciseState('')
    startCountdown(0)
  }

  const extractedDescription =
    exercise?.content?.rendered?.match(/<p class="parrafo">(.*?)<\/p>/s)?.[1] ??
    ''
  const extractedVideo =
    exercise?.content?.rendered
      ?.match(/<iframe.*?src="(.*?)"/s)?.[1]
      .replaceAll('&amp;', '&')
      .replace('autopause=0', 'autoplay=1&controls=0&loop=1') ?? ''

  return (
    <section
      className={` ${
        open ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
      } mt-36 z-50 absolute -top-36 md:-top-32 lg:-top-28 left-0 w-full  min-h-[700px] xl:min-h-[900px] max-h-screen px-2 md:px-4  pt-4 xl:pt-8 transition-all duration-200 ease-in-out`}
    >
      <div className=" relative w-full max-w-screen-md xl:max-w-screen-2xl mx-auto h-full  bg-Black rounded-t-2xl lg:rounded-3xl   px-2 md:px-4 xl:px-6 pt-3 md:pt-6 md:pb-10 xl:py-10 mb-0">
        <div className="w-full h-fit xl:h-full flex flex-col xl:flex-row items-center xl:gap-4">
          <button
            className=" absolute top-2 right-2 md:top-3 md:right-3 w-5 h-5 md:w-6 md:h-6 bg-Black "
            type="button"
            onClick={() => {
              setExerciseState('')
              startCountdown(0)
              onClose()
            }}
          >
            <X size={'100%'} strokeWidth={2.5} color="#cbeb37" />
          </button>

          <div className=" w-full flex flex-col items-center xl:gap-2">
            <div className=" pl-2 xl:pl-0 w-full h-fit flex flex-col items-start xl:flex-row xl:items-end">
              <div className=" w-5/6 xl:w-2/6 flex flex-col items-start">
                <h3 className=" font-oswaldReg text-White text-sm md:text-base lg:text-lg xl:text-xl uppercase">
                  {dictionary['Block']} {section?.id}
                </h3>
                <h4 className=" uppercase font-oswaldReg text-lg md:text-xl lg:text-2xl w-5/6 text-Primary">
                  {dictionary['Exercise']} #{exercisePosition + 1}
                </h4>
              </div>

              <p className=" uppercase font-oswaldBold text-2xl md:text-3xl w-5/6 text-White xl:text-right ">
                {exercise?.title?.rendered}
              </p>
            </div>

            <div className=" relative my-4 bg-White/90 w-full aspect-video max-w-[800px] overflow-hidden min-h-[160px] rounded-xl flex items-center justify-center">
              {extractedVideo && (
                <ReactPlayer
                  url={extractedVideo}
                  muted={muted}
                  width="100%"
                  height="100%"
                  volume={1}
                  className=" w-full h-full"
                  controls={false}
                  playsinline
                  onReady={() => setMuted(true)}
                  playing
                  loop
                />
              )}
              <button
                type="button"
                className=" absolute top-2 right-2 p-1.5 w-8 h-8 rounded-full bg-DarkGray text-Primary "
                onClick={() => setMuted(!muted)}
              >
                {muted ? (
                  <Image src={soundOffIcon} alt="Sound OFF" />
                ) : (
                  <Image src={soundOnIcon} alt="Sound ON" />
                )}
              </button>
            </div>
          </div>

          {/* EXERCISE */}
          <div className=" w-full flex flex-col items-center">
            <div
              className={` ${exerciseState === '' ? ' ' : 'hidden'} w-full `}
            >
              <div className="  w-full h-fit pb-2 px-2 flex items-center justify-between border-b-[1px] border-b-White/50 uppercase text-White font-oswaldLight text-base md:text-lg lg:text-xl">
                <h5 className=" ">{dictionary['Exercise duration']}</h5>
                <span>
                  {formatTime(60 + (currentTraining?.level - 1) * 15)}
                </span>
              </div>
              <div className=" mt-4 w-full h-fit flex flex-col items-center gap-2">
                <p className="  text-White  text-justify font-oswaldLight w-full h-fit px-2 text-base md:text-lg lg:text-xl leading-5 ">
                  {parse(extractedDescription)}
                </p>
                <ExerciseSectionImage />

                <button
                  className=" bg-gradient-to-br from-Primary to-PrimaryDark rounded-full text-3xl uppercase font-oswaldBold px-8 py-1"
                  type="button"
                  onClick={() => handleExercises(EXERCISE_STATES.START)}
                >
                  {dictionary['Start']}
                </button>
              </div>
            </div>

            {/* START | READY | PAUSE */}
            <div
              className={` ${
                exerciseState === EXERCISE_STATES.START ||
                exerciseState === EXERCISE_STATES.READY ||
                exerciseState === EXERCISE_STATES.PAUSE
                  ? ' '
                  : 'hidden'
              } flex flex-col w-full mt-4 items-center gap-4`}
            >
              <PreparingCountdown
                start={exerciseState === EXERCISE_STATES.START}
                onReady={() => handleExercises(EXERCISE_STATES.READY)}
              />

              <MotivationalMessages
                active={exerciseState === EXERCISE_STATES.READY}
                totalTime={60}
                secondsLeft={secondsLeft}
              />

              <div
                className={` ${
                  exerciseState === EXERCISE_STATES.PAUSE
                    ? ' scale-100 '
                    : ' scale-0 hidden '
                } w-full h-full my-6 transition-all duration-300 ease-in-out`}
              >
                <p className=" flex flex-col items-center animate-pulse gap-1 text-center font-oswaldBold uppercase text-White text-4xl transition-all duration-200 ease-in-out tracking-wide">
                  <span className=" mr-2 text-Primary">
                    {dictionary['Exercise']}
                  </span>
                  {dictionary['Paused']}
                </p>
              </div>

              <div className=" w-full max-w-[500px] flex items-center justify-around ">
                {exerciseState === EXERCISE_STATES.START ||
                exerciseState === EXERCISE_STATES.READY ? (
                  <button
                    type="button"
                    className=" text-White flex items-center gap-2 uppercase "
                    onClick={() => handleExercises(EXERCISE_STATES.PAUSE)}
                  >
                    <Pause size={40} color="#cbeb37" />
                    {dictionary['Pause']}
                  </button>
                ) : (
                  <button
                    type="button"
                    className=" text-White flex items-center gap-2 uppercase "
                    onClick={() => handleExercises(EXERCISE_STATES.RESTART)}
                  >
                    <Play size={40} color="#cbeb37" />
                    {dictionary['Resume']}
                  </button>
                )}
                <button
                  type="button"
                  className=" text-White flex items-center gap-2 uppercase "
                  onClick={() => setExerciseState(EXERCISE_STATES.FINISH)}
                >
                  <Square size={40} color="#0000" fill="#cbeb37" />
                  {dictionary['Finish']}
                </button>
              </div>
              <div className=" border-2 border-Primary rounded-xl px-6 py-2 text-White font-oswaldLight text-4xl tracking-[0.5rem] ">
                {formatTime(secondsLeft)}
              </div>
            </div>
            <div
              className={` ${
                exerciseState === EXERCISE_STATES.FINISH ? ' ' : 'hidden'
              } flex flex-col w-full mt-4 items-center justify-between gap-10`}
            >
              <div className=" w-full flex flex-col items-center justify-center gap-5">
                <div className=" p-2 bg-Primary rounded-full">
                  <Check size={50} strokeWidth={5} color="#000" />
                </div>
                <p className=" font-oswaldBold uppercase tracking-normal text-4xl text-Primary">
                  {dictionary['Finished']}
                </p>
              </div>

              <div className=" w-full max-w-[500px] flex items-center justify-around ">
                <button
                  type="button"
                  className=" text-White font-oswaldBold tracking-widest flex  flex-col items-center gap-2 uppercase "
                  onClick={() => handleExercises(EXERCISE_STATES.FINISH)}
                >
                  <div className=" p-2 bg-Primary rounded-2xl">
                    <ArrowLeft size={30} strokeWidth={5} color="#000" />
                  </div>
                  {dictionary['Go back']}
                </button>
                <button
                  type="button"
                  className=" text-White font-oswaldBold tracking-widest flex  flex-col items-center gap-2 uppercase "
                  onClick={() => handleNextExercise()}
                >
                  <div className=" p-2 bg-Primary rounded-2xl">
                    <ArrowRight size={30} strokeWidth={5} color="#000" />
                  </div>
                  {dictionary['Continue']}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" w-full h-20 bg-Black lg:hidden content-normal "></div>
    </section>
  )
}
