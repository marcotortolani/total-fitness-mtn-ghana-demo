'use client'
import { useState } from 'react'
import Image from 'next/image'
import {
  useNutritionPostsHook,
  useRoutineWeek,
} from '@/lib/routine/routine-hooks'
import {
  useRoutineStore,
  useUpdateRoutineStore,
} from '@/lib/routine/routine-stores'
import ReactHtmlParser from 'react-html-parser'
import { useUserStore } from '@/lib/user/user-stores'
import editIcon from '/public/assets/icons/perfilado/edit-icon.webp'
import Lottie from 'lottie-react'
import sandClock from '/src/lottie/sand-clock.json'
import { cleanDataPosts } from '@/utils/functions'
import ButtonLikeFav from '@/app/components/ui/ButtonLikeFav'
import Link from 'next/link'
import { DAYS } from '@/lib/routine/routine-constants'
import { TAGS } from '@/lib/constants'
import { RoutineWeeks } from '@/lib/routine/components/RoutineWeeks'

import dictionary from '@/dictionary/lang.json'

import { PersonMale, PersonFemale } from '@/utils/icons'

export const RoutineScreen = () => {
  const [isExerciseTab, setIsExerciseTab] = useState(true)
  const { profile } = useRoutineStore()
  const { user } = useUserStore()
  const { onOpen } = useUpdateRoutineStore()

  const { nutritionPosts, loading: loadingNutritionPosts } =
    useNutritionPostsHook()
  const { loading: loadingRoutine } = useRoutineWeek()

  return (
    <section
      className={`translate-x-0 opacity-100 absolute top-10 md:top-12 lg:-top-10  z-50 left-0 overflow-hidden w-full px-4 pt-4 lg:mt-12 pb-14 h-screen bg-DarkGray min-h-fit flex flex-col items-center gap-3 transition-all duration-150 ease-in-out`}
    >
      <p className=" w-full text-White uppercase font-oswaldSemBold text-xl lg:text-2xl leading-5 text-nowrap ">
        <span className=" text-Primary ">{user?.name} </span>
        {dictionary['this is your monthly routine']}
      </p>
      {/** Active Level & Focus Area */}
      <div className=" w-full flex items-center justify-between gap-2">
        <div className=" flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <span className=" px-2 py-2 md:px-4 uppercase text-xs md:text-sm bg-Primary font-oswaldLight text-DarkGray rounded-lg ">
              {dictionary[profile?.levels?.find((level) => level.active)?.name]}
            </span>
            <span className=" px-2 py-2 md:px-4 uppercase text-xs md:text-sm bg-Primary font-oswaldLight text-DarkGray rounded-lg ">
              {profile?.focusAreas?.find((area) => area.active)?.name}
            </span>
            <div className=" h-8 md:h-9 pl-2 pr-2 md:pr-4 py-0.5 md:py-1 bg-Primary rounded-lg flex items-center justify-center gap-2">
              <div className=" w-5 h-5 md:w-7 md:h-7 flex items-center justify-center ring-2 ring-DarkGray rounded-full overflow-hidden p-[0px] pt-0.5 pb-0">
                {profile?.trainer === TAGS['trainer-male'] ? (
                  <PersonMale fill="#363636" />
                ) : (
                  <PersonFemale fill="#363636" />
                )}
              </div>

              <span className=" hidden md:block uppercase text-sm bg-Primary font-oswaldLight text-DarkGray rounded-lg ">
                {profile?.trainer === TAGS['trainer-male']
                  ? dictionary['Trainer (male)']
                  : dictionary['Trainer (female)']}
              </span>
            </div>
          </div>
        </div>
        <button
          type="button"
          className=" w-8 h-8 text-Primary"
          onClick={() => onOpen()}
        >
          <Image className=" w-full h-full" src={editIcon} alt="Edit icon" />
        </button>
      </div>
      {/* Active Days */}
      <div className=" w-full grid grid-cols-7 gap-1 ">
        {DAYS.map((day) => (
          <span
            key={day}
            className={`${
              profile?.days?.includes(day)
                ? ' bg-Primary font-oswaldSemBold  '
                : ' bg-White font-oswaldLight '
            }  w-full flex items-center justify-center gap-4 py-2 uppercase text-DarkGray  text-sm rounded-lg transition-all duration-200 ease-in-out`}
          >
            {day}
          </span>
        ))}
      </div>
      {/* Tabs - Exercises & Nutrition */}
      <div className={`relative w-full h-full `}>
        <div className=" fixed top-48 left-4 mt-2 -translate-y-[90%]  z-50 -mb-[2px] w-full h-fit pl-0 flex items-end gap-4">
          <button
            type="button"
            onClick={() => setIsExerciseTab(true)}
            className={` ${
              isExerciseTab
                ? ' border-Primary border-b-DarkGray border-b-[5px] mb-0.5 text-Primary font-oswaldMed '
                : ' border-LightGray/60 border-b-Primary mb-1 font-oswaldLight text-LightGray shadow-inner shadow-black/80 '
            } px-4 py-2 uppercase text-sm  rounded-t-lg   border-2 border-b-0`}
          >
            {dictionary['Exercises']}
          </button>
          <button
            type="button"
            onClick={() => setIsExerciseTab(false)}
            className={`${
              !isExerciseTab
                ? ' border-Primary border-b-DarkGray border-b-[5px] mb-0.5 text-Primary font-oswaldMed '
                : ' border-LightGray/60 border-b-Primary mb-1 font-oswaldLight text-LightGray shadow-inner shadow-black/80 '
            } px-4 py-2 uppercase text-sm  rounded-t-lg border-2 border-b-0`}
          >
            {dictionary['Nutritional tips']}
          </button>
        </div>

        <div
          className={` fixed z-0 mt-0 pt-1  w-screen max-w-xl  -mx-4 px-0  h-full min-h-fit border-t-Primary border-t-2 bg-DarkGray top-[200px]`}
        >
          {!(loadingRoutine || loadingNutritionPosts) && (
            <div
              className={`${
                !(loadingRoutine || loadingNutritionPosts)
                  ? ' scale-0 opacity-0 hidden '
                  : ' scale-100 opacity-100 '
              }  w-full mx-auto mt-20 px-6 py-4 flex flex-col items-center justify-center transition-all duration-200 ease-in-out`}
            >
              <p className=" w-2/3 pl-2 text-center text-White font-oswaldReg uppercase text-xl">
                {dictionary['Please wait while we prepare']}{' '}
                <span className=" text-Primary">
                  {dictionary['your routine']}...
                </span>
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
          )}

          {/* Exercises or Nutritional */}
          {isExerciseTab ? (
            <div
              className={` ${
                loadingRoutine || loadingNutritionPosts
                  ? ' translate-y-[200%] '
                  : ' translate-y-0 '
              }  w-full h-full pt-4 px-3 pb-[28rem] overflow-y-scroll scroll-smooth transition-all duration-200 ease-in-out lg:px-2  scrollbar-thin grid grid-cols-1 grid-flow-row gap-6`}
            >
              {/* 4 Weeks Blocks */}
              <RoutineWeeks />
            </div>
          ) : (
            <div className=" w-full h-[60vh] min-h-fit max-h-[650px] md:h-full md:max-h-[800px] pb-16 overflow-y-scroll lg:overflow-hidden scroll-smooth scrollbar-thin grid">
              <div
                className={` w-full h-fit min-h-fit max-h-[550px] md:min-h-[700px] md:max-h-[750px] py-4 px-3 pb-20 lg:px-2 grid grid-cols-3 grid-rows-2 gap-4 `}
              >
                {nutritionPosts?.slice(0, 6)?.map((post, i) => {
                  const imageFeaturedPattern =
                    /<img\s+[^>]*class=["'][^"']*img-destacada[^"']*["'][^>]*src=["'](.+?)["'][^>]*>|<img\s+[^>]*src=["'](.+?)["'][^>]*class=["'][^"']*img-destacada[^"']*["'][^>]*>/i
                  const match = imageFeaturedPattern.exec(
                    post?.content?.rendered,
                  )
                  const imageFeatured = match[1]

                  const postCleaned = cleanDataPosts({
                    posts: new Array(post),
                    categorySlug: 'nutrition',
                  })

                  return (
                    <Link
                      key={i}
                      href={`/nutrition/${post?.slug}`}
                      className=" w-full h-fit min-h-[200px]"
                    >
                      <div className=" w-full h-fit flex flex-col items-left justify-center gap-1">
                        <div className="relative w-full h-full aspect-[9/14] xl:aspect-[9/12] ">
                          <Image
                            className="w-full h-full object-cover shadow-md shadow-black/50 rounded-lg"
                            fill
                            src={imageFeatured}
                            sizes="100%"
                            alt={`${post?.title?.rendered}`}
                          />
                          <div className=" z-10 absolute top-0 left-0 w-full h-full bg-black/30 rounded-lg"></div>
                          <div className=" z-20 absolute top-1 right-1 w-6 h-6 pointer-events-none">
                            <ButtonLikeFav
                              color="#cbeb37"
                              post={postCleaned[0]}
                            />
                          </div>
                        </div>

                        <p className="  font-oswaldReg text-xs md:text-sm lg:text-base lg:leading-5 xl:text-lg xl:leading-5 leading-3 line-clamp-2 text-White/80">
                          {ReactHtmlParser(post?.title?.rendered)}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
