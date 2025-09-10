/* eslint-disable @typescript-eslint/no-explicit-any */

// src/components/video/VideoPlayerList.tsx
'use client'
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ShortVideoItem } from './ShortVideoItem'

export const VideoPlayerList = ({ items = [], defaultIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(defaultIndex)

  return (
    <div className="relative w-screen h-[100dvh] -mt-6 md:h-[90svh] md:mt-10 lg:mt-20 xl:mt-14 lg:max-w-xl mx-auto">
      <Swiper
        initialSlide={defaultIndex}
        slidesPerView={1}
        centeredSlides
        direction="vertical"
        className="w-full h-full md:rounded-lg"
        onBeforeInit={() => setCurrentIndex(defaultIndex)}
        onSlideChange={(slide) => {
          setCurrentIndex(slide.activeIndex)
        }}
      >
        {items.length > 0 &&
          items.map((item, index) => {
            const isActive = index === currentIndex
            const shouldPreload = Math.abs(index - currentIndex) <= 1

            return (
              <SwiperSlide
                key={item.id || index}
                className="relative w-full h-full pointer-events-auto md:rounded-lg"
              >
                <ShortVideoItem
                  item={item}
                  isActive={isActive}
                  shouldPreload={shouldPreload}
                />
              </SwiperSlide>
            )
          })}
      </Swiper>
    </div>
  )
}
