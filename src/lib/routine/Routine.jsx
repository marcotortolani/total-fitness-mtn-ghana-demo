'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import RoutineUserScreen from '@/lib/routine/components/RoutineUserScreen'
import { useRef, useEffect } from 'react'
import { RoutineUserScreenTwo } from '@/lib/routine/components/RoutineUserScreenTwo'
import { RoutineTargetTrainingScreen } from '@/lib/routine/components/RoutineTargetTrainingScreen'
import { RoutineTargetTrainingLevelScreen } from '@/lib/routine/components/RoutineTargetTrainingLevelScreen'
import { RoutineTargetTrainingFocusAreaScreen } from '@/lib/routine/components/RoutineTargetTrainingFocusAreaScreen'
import {
  useRoutineStore,
  useUpdateRoutineStore,
} from '@/lib/routine/routine-stores'
import { RoutineScreen } from '@/lib/routine/components/RoutineScreen'
import { RoutineTrainerScreen } from '@/lib/routine/components/RoutineTrainerScreen'

const Routine = () => {
  const ref = useRef(null)
  const { isCompletedForm, canUpdate } = useRoutineStore()
  const { onClose } = useUpdateRoutineStore()

  const handleChange = (index) => {
    ref.current.swiper.slideTo(index)
  }

  useEffect(() => {
    if (canUpdate) {
      onClose()
      handleChange(0)
    } else if (isCompletedForm) {
      ref.current.swiper.updateActiveIndex(6)
      ref.current.swiper.slideTo(6, 0)
    }
  }, [isCompletedForm, canUpdate])

  return (
    <Swiper
      ref={ref}
      spaceBetween={0}
      slidesPerView={1}
      allowTouchMove={false}
      className="w-full max-w-xl"
    >
      <SwiperSlide>
        <RoutineUserScreen
          onHandleSuccess={() => {
            handleChange(1)
          }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <RoutineUserScreenTwo
          onHandleSuccess={() => {
            handleChange(2)
          }}
          onHandleBack={() => {
            handleChange(0)
          }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <RoutineTargetTrainingScreen
          onHandleSuccess={() => {
            handleChange(3)
          }}
          onHandleBack={() => {
            handleChange(1)
          }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <RoutineTargetTrainingLevelScreen
          onHandleSuccess={() => {
            handleChange(4)
          }}
          onHandleBack={() => {
            handleChange(2)
          }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <RoutineTargetTrainingFocusAreaScreen
          onHandleSuccess={() => {
            handleChange(5)
          }}
          onHandleBack={() => {
            handleChange(3)
          }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <RoutineTrainerScreen
          onHandleSuccess={() => {
            handleChange(6)
          }}
          onHandleBack={() => {
            handleChange(4)
          }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <RoutineScreen
          onHandleSuccess={() => {
            handleChange(7)
          }}
          onHandleBack={() => {
            handleChange(5)
          }}
        />
      </SwiperSlide>
    </Swiper>
  )
}

export default Routine
