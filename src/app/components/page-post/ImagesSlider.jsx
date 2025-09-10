'use client'
import React, { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import SwiperCore from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

import { ChevronRight, ChevronLeft } from 'lucide-react'

import PaginationBullets from '../ui/PaginationBullets'
import Image from 'next/image'

SwiperCore.use([Pagination])

export default function ImagesSlider({
  images,
  slidesPerView = 1,
  centered = true,
  delayPerView = 0,
  spaceBetweenSlides = 30,
  colorBullets = 'secondaryDark',
  sizeBullets = 'sm',
}) {
  const [indexPag, setIndexPag] = useState(0)
  const sliderRef = useRef(0)

  const qtyBullets = Object.keys(images).length - parseInt(slidesPerView) + 1

  const pagination = {
    clickable: true,
    type: 'custom',
    renderCustom: function (i, className) {
      setIndexPag(className)
      return null
    },
  }

  return (
    <div className=" z-20 flex h-full w-screen max-w-screen-2xl my-2 md:my-4 lg:my-10 flex-col items-center justify-center gap-1 text-white lg:w-full">
      <div className=" relative flex h-full w-full  items-center justify-between gap-2 ">
        <ButtonNavigation type="swiper-button-prev">
          <ChevronLeft width="100%" height="100%" />
        </ButtonNavigation>
        <Swiper
          ref={sliderRef}
          slidesPerView={slidesPerView}
          centeredSlides={centered}
          spaceBetween={spaceBetweenSlides}
          autoplay={{
            delay: delayPerView,
            disableOnInteraction: false,
          }}
          pagination={pagination}
          modules={[Navigation]}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          className="mySwiper relative w-full max-w-2xl flex items-center justify-center md:max-w-2xl lg:max-w-4xl h-fit lg:min-h-[250px] overflow-hidden  "
        >
          {images?.map((image, index) => (
            <SwiperSlide
              className={` relative w-full h-full aspect-video flex items-center justify-center`}
              key={index}
            >
              <Image
                className=" w-full aspect-video object-cover rounded-lg"
                src={image}
                fill
                alt={`Imagen Slider ${index}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <ButtonNavigation type="swiper-button-next">
          <ChevronRight width="100%" height="100%" />
        </ButtonNavigation>
      </div>
      <PaginationBullets
        color={colorBullets}
        size={sizeBullets}
        qtyBullets={qtyBullets}
        index={indexPag}
      />
    </div>
  )
}

function ButtonNavigation({ children, type }) {
  return (
    <button
      type="button"
      id="button-right"
      name="button-right"
      className={`${type} z-50 flex h-8 w-10 cursor-pointer hover:scale-150 transition-all rounded-full items-center justify-center text-SecondaryDark  md:h-10 md:w-12 lg:h-14 lg:w-14`}
    >
      {children}
    </button>
  )
}
