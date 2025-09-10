'use client'
import { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { StateContext } from '@/providers/StateProvider'
import useCountdown from '@/hooks/useCountDown'

import dictionary from '@/dictionary/lang.json'

import videoIcon from 'public/assets/icons/elementos-perfilado/video-icon.svg'
import {
  X,
  Play,
  Pause,
  Square,
  ArrowLeft,
  ArrowRight,
  Check,
} from 'lucide-react'

import ChestInactive from '/public/assets/icons/pecho-inactivo.svg'
import ArmsInactive from '/public/assets/icons/hombros-brazos-inactivo.svg'
import LegsInactive from '/public/assets/icons/gluteos-piernas-inactivo.svg'
import AbsInactive from '/public/assets/icons/abs-inactivo.svg'

function formatTime(time) {
  const minutes = Math.floor(time / 60)
  const seconds = time - minutes * 60
  return `${minutes < 10 ? '0' : ''}${minutes}:${
    seconds < 10 ? '0' : ''
  }${seconds}`
}

function timeToString(time) {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  if (minutes > 0 && seconds > 0) {
    return `${minutes} ${
      minutes > 1 ? dictionary['minutes'] : dictionary['minute']
    }, ${seconds} ${seconds > 1 ? dictionary['seconds'] : dictionary['second']}`
  } else if (minutes > 0) {
    return `${minutes} ${
      minutes > 1 ? dictionary['minutes'] : dictionary['minute']
    }`
  } else {
    return `${seconds} ${
      seconds > 1 ? dictionary['seconds'] : dictionary['second']
    }`
  }
}

const EXERCISE_STATES = {
  START: 'start',
  READY: 'ready',
  PAUSE: 'pause',
  RESTART: 'restart',
  FINISH: 'finish',
}

export default function Page() {
  const params = useParams()
  const { id } = params
  console.log({ id })

  const { groupsRoutines, setGroupsRoutines, stateRoutines, setStateRoutines } =
    useContext(StateContext)
  const [level, setLevel] = useState(1) // 1:beginner, 2:intermediate, 3:advanced
  const [groupName, setGroupName] = useState('')
  const [routine, setRoutine] = useState({})
  const [totalTime, setTotalTime] = useState(0) // expressed in seconds
  const [exercise, setExercise] = useState({})
  const [exerciseState, setExerciseState] = useState('') // "start", "ready", "pause", "finish"
  const { secondsLeft, startCountdown, pauseTimer, resumeTimer } =
    useCountdown(-1)

  function formatLevel(level) {
    switch (level) {
      case 1:
        return 'beginner'
      case 2:
        return 'intermediate'
      case 3:
        return 'advanced'
      default:
        return ''
    }
  }

  const handleLevel = (l) => {
    setLevel(l)
    setExercise({})
  }
  const handleExercises = (state) => {
    // state: "start", "ready", "pause", "finish"

    if (state === EXERCISE_STATES.START) {
      setExerciseState(EXERCISE_STATES.START)
      startCountdown(exercise.time)
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
      updateStateRoutine(exercise.id)
      setExercise({})
      setExerciseState('')
      startCountdown(0)

      return
    }
  }

  const handleNextExercise = (currentExercise) => {
    if (!currentExercise) return
    updateStateRoutine(exercise.id)
    const exercisesLength =
      groupsRoutines[group][formatLevel(level)].exercises.length
    const lastExerciseID =
      groupsRoutines[group][formatLevel(level)].exercises[exercisesLength - 1]
        .id

    if (currentExercise.id === lastExerciseID) {
      handleExercises(EXERCISE_STATES.FINISH)
      return
    }
    const nextExercise = groupsRoutines[group][
      formatLevel(level)
    ].exercises.find((e) => e.id === currentExercise.id + 1)
    setExercise(nextExercise)
    setExerciseState('')
  }
  function updateStateRoutine(exerciseID) {
    if (!exerciseID) return

    // Crear una copia profunda de la rutina para no mutar el objeto original
    const updatedStatesRoutines = JSON.parse(JSON.stringify(stateRoutines))

    // Actualizar el estado del ejercicio específico
    if (
      updatedStatesRoutines[group] &&
      updatedStatesRoutines[group][formatLevel(level)] &&
      updatedStatesRoutines[group][formatLevel(level)].exercises
    ) {
      const exercises =
        updatedStatesRoutines[group][formatLevel(level)].exercises

      for (let i = 0; i < exercises.length; i++) {
        if (exercises[i].id === exerciseID) {
          // Marcar el ejercicio actual como completado
          exercises[i].state = 'completed'

          // Habilitar el siguiente ejercicio si existe
          if (
            i + 1 < exercises.length &&
            exercises[i + 1].state !== 'completed'
          ) {
            exercises[i + 1].state = 'enabled'
          }

          break
        }
      }
    }

    setStateRoutines(updatedStatesRoutines)
  }

  useEffect(() => {
    if (secondsLeft === -1) return
    if (secondsLeft > 0) return
    // handleExercises(EXERCISE_STATES.FINISH)
    setExerciseState(EXERCISE_STATES.FINISH)
  }, [secondsLeft])

  useEffect(() => {
    if (!group) return

    setGroupName(groupsRoutines[group].name)
    setRoutine(groupsRoutines[group][formatLevel(level)])

    const time = getTotalTime(groupsRoutines[group][formatLevel(level)])
    setTotalTime(time)
  }, [group, level])

  const getTotalTime = (routine) => {
    const time = routine.exercises.reduce(
      (total, exercise) => total + exercise.time,
      0,
    )
    return time
  }

  return (
    <main className=" relative w-screen max-w-2xl h-screen overflow-x-hidden">
      <header
        className={`${
          exercise.id ? ' -translate-x-[200%] ' : ' translate-x-0 '
        } z-40 sticky top-0 bg-DarkGray py-4 px-2 shadow-md shadow-black/80 transition-all duration-200 ease-in-out`}
      >
        <h1 className=" px-4 mb-3 text-White uppercase font-oswaldSemBold text-2xl">
          {dictionary['Routine']}: {groupName}
        </h1>
        <div className="flex justify-around w-full  mx-auto">
          <ButtonLevel
            name={dictionary['Beginner']}
            onClick={() => handleLevel(1)}
            active={level === 1}
          />
          <ButtonLevel
            name={dictionary['Intermediate']}
            onClick={() => handleLevel(2)}
            active={level === 2}
          />
          <ButtonLevel
            name={dictionary['Advanced']}
            onClick={() => handleLevel(3)}
            active={level === 3}
          />
        </div>
      </header>

      <section
        className={`${
          exercise.id ? ' -translate-x-[200%] ' : ' translate-x-0 '
        } w-full h-fit overflow-hidden px-4 pt-5 mb-0 flex flex-col items-center gap-4 transition-all duration-200 ease-in-out`}
      >
        {totalTime > 0 && (
          <p className=" pl-2 text-left w-full text-White font-oswaldLight uppercase text-xs">
            {dictionary['Routine time']}: {timeToString(totalTime)}
          </p>
        )}

        {routine && routine.exercises && routine.exercises.length > 0 ? (
          routine.exercises.map((exercise) => (
            <ButtonExercise
              key={exercise.id}
              name={exercise.name}
              time={exercise.time}
              state={
                stateRoutines[group][formatLevel(level)].exercises.find(
                  (e) => e.id === exercise.id,
                ).state
              }
              onClick={() => {
                setExercise(exercise)
              }}
            />
          ))
        ) : (
          <p className=" pl-2 text-left w-full text-White font-oswaldLight uppercase text-xs">
            {dictionary['There are not exercises in this routine']}
          </p>
        )}
      </section>

      <section
        className={` ${
          exercise.id
            ? 'opacity-100 translate-x-0 '
            : 'opacity-0 translate-x-full'
        }  z-50 absolute top-0 left-0 w-screen min-h-[700px] px-2 overflow-y-scroll pt-4 h-full transition-all duration-200 ease-in-out`}
      >
        <div className=" relative h-full  bg-Black rounded-t-2xl   px-2 pt-3 mb-0">
          <div className=" h-fit flex flex-col items-center">
            <button
              className=" absolute top-2 right-2 w-5 h-5 bg-Black "
              type="button"
              onClick={() => {
                setExercise({})
                handleExercises(EXERCISE_STATES.FINISH)
              }}
            >
              <X size={20} strokeWidth={2.5} color="#cbeb37" />
            </button>
            <div className=" w-full h-fit ">
              <h3 className=" font-oswaldMed text-Primary text-xs uppercase">
                {dictionary['Routine']}: {groupName}
              </h3>
              <h4 className=" uppercase font-oswaldBold text-xl w-full text-White">
                {exercise.name}
              </h4>
            </div>

            <div className=" my-4 bg-White/90 w-full aspect-video max-w-[500px] min-h-[160px] uppercase rounded-xl flex items-center justify-center">
              {dictionary['Video']}
            </div>

            {/* EXERCISE */}
            <div
              className={` ${exerciseState === '' ? ' ' : 'hidden'} w-full `}
            >
              <div className="  w-full h-fit pb-2 px-2 flex items-center justify-between border-b-[1px] border-b-White/50 uppercase text-White font-oswaldLight text-sm">
                <h5>{dictionary['Exercise duration']}</h5>
                <span>{formatTime(exercise.time)}</span>
              </div>
              <div className="   w-full h-fit flex flex-col items-center gap-2">
                <p className="  text-White font-oswaldLight w-full h-fit px-2 text-sm leading-4 mt-2 ">
                  {exercise.description}
                </p>
                <Image
                  className=" w-2/3  max-h-[120px] my-4"
                  src={
                    group.includes('chest')
                      ? ChestInactive
                      : group.includes('arms')
                      ? ArmsInactive
                      : group.includes('legs')
                      ? LegsInactive
                      : group.includes('abs')
                      ? AbsInactive
                      : ''
                  }
                  alt={` ${groupName} Image`}
                />

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
                totalTime={exercise.time}
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

            {/*FINISH */}
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
                  onClick={() => handleNextExercise(exercise)}
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

        <div className=" w-full h-20 bg-Black content-normal "></div>
      </section>
    </main>
  )
}

const ButtonLevel = ({ name, active, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={` ${
        active
          ? 'bg-Primary border-PrimaryDark text-DarkGray shadow-black/60 '
          : ' bg-transparent border-LightGray text-LightGray shadow-black/0 '
      }  transition-all duration-200 ease-in-out font-oswaldLight border-[0.5px] uppercase text-sm md:text-lg lg:text-xl rounded-lg shadow-md  px-4 py-2`}
    >
      {name}
    </button>
  )
}

const ButtonExercise = ({ name, time, state = 'disabled', onClick }) => {
  // state: didit, enabled, disabled
  let stateStyle

  switch (state) {
    case 'disabled':
      stateStyle = ' bg-LightGray '
      break

    case 'enabled':
      stateStyle = ' bg-White active:bg-White/80 '
      break

    default:
      stateStyle = ' bg-Primary active:bg-PrimaryDark '
      break
  }
  return (
    <button
      disabled={state === 'disabled'}
      className={`${stateStyle} transition-all duration-200 ease-in-out font-oswaldLight uppercase text-sm rounded-lg shadow-md  pl-6 pr-2 py-2 w-full flex items-center gap-1 justify-between`}
      type="button"
      onClick={onClick}
    >
      <span className=" w-2/3 text-left line-clamp-2">{name}</span>
      <span className=" w-1/3 flex items-center justify-between ">
        {formatTime(time)}
        <Image className=" w-auto h-10 " src={videoIcon} alt="Video icon" />
      </span>
    </button>
  )
}

const PreparingCountdown = ({ initialTime = 3, start, onReady }) => {
  const { secondsLeft, startCountdown, pauseTimer, resumeTimer } =
    useCountdown(0)

  useEffect(() => {
    if (start) {
      startCountdown(initialTime)
      resumeTimer()
    }
  }, [start])

  useEffect(() => {
    if (secondsLeft === 0 && start) {
      pauseTimer()
      onReady()
    }
  }, [secondsLeft])

  return (
    <div
      className={` ${
        secondsLeft === 0 ? 'hidden' : ' '
      } w-1/2 aspect-square flex items-center justify-center animate-ping rounded-full border-Primary border-2`}
    >
      <span className=" font-oswaldBold text-Primary  text-8xl">
        {secondsLeft}
      </span>
    </div>
  )
}

const MotivationalMessages = ({ active, totalTime, secondsLeft }) => {
  const MESSAGES = {
    initial: {
      highlight: dictionary['Here we go!'],
      white: dictionary["Let's get started"],
    },
    inter1: {
      highlight: dictionary['Very good!'],
      white: dictionary["You're doing great!"],
    },
    inter2: {
      highlight: dictionary['Keep it up!'],
      white: dictionary["You've got this"],
    },
    prefinal: {
      highlight: dictionary["That's it!"],
      white: dictionary['Just a little more!'],
    },
    final: {
      highlight: dictionary['Congratulations!'],
      white: dictionary['You did it!'],
    },
  }

  const [message, setMessage] = useState(MESSAGES.initial)

  useEffect(() => {
    if (secondsLeft === totalTime || secondsLeft > totalTime * 0.75) {
      setMessage(MESSAGES.initial)
    } else if (
      secondsLeft <= totalTime * 0.75 &&
      secondsLeft > totalTime * 0.5
    ) {
      setMessage(MESSAGES.inter1)
    } else if (
      secondsLeft <= totalTime * 0.5 &&
      secondsLeft > totalTime * 0.25
    ) {
      setMessage(MESSAGES.inter2)
    } else if (secondsLeft <= totalTime * 0.25 && secondsLeft > 0) {
      setMessage(MESSAGES.prefinal)
    } else if (secondsLeft === 0) {
      setMessage(MESSAGES.final)
    }
  }, [secondsLeft, totalTime])

  return (
    <div
      className={` ${
        active ? ' scale-100 ' : ' scale-0 hidden '
      } w-full h-full my-6 transition-all duration-500 ease-in-out`}
    >
      <p className=" mx-auto w-5/6 text-center font-oswaldBold uppercase text-White text-4xl transition-all duration-200 ease-in-out tracking-wide">
        <span className=" mr-2 text-Primary">{message.highlight}</span>
        {message.white}
      </p>
    </div>
  )
}
