'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { TitleSummary } from '../ui/TitleSummary'
import ImageMissing from '../ImageMissing'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import SwiperCore from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
SwiperCore.use([Pagination])
import parse from 'html-react-parser'

import dictionary from '@/dictionary/lang.json'

const breakpoints = {
  0: {
    slidesPerView: 3.5,
    spaceBetween: 10,
    centeredSlides: false,
  },
  768: {
    slidesPerView: 4.5,
    spaceBetween: 20,
    centeredSlides: false,
  },
  1024: {
    slidesPerView: 5.5,
    spaceBetween: 30,
    centeredSlides: false,
  },
}
export default function SliderRecommended({ posts = [] }) {
  if (!posts?.length) {
    return null
  }

  return (
    <section
      className={`${
        posts?.length === 0 && 'hidden'
      } z-50 w-full lg:max-w-screen-xl flex flex-col items-start overflow-hidden h-fit relative top-6`}
    >
      <div className=" mb-2 ">
        <TitleSummary
          title={dictionary['Discover more content from Total Fitness']}
        />
      </div>
      <Swiper
        // autoplay={{
        //   delay: delayPerView,
        //   disableOnInteraction: false,
        // }}
        modules={[Navigation]}
        navigation={false}
        breakpoints={breakpoints}
        className="w-full h-full"
      >
        {posts?.length > 0 &&
          posts?.map((post, index) => {
            return (
              <SwiperSlide key={post?.id} className={` w-full  h-full `}>
                <Link
                  href={`/${post?.slug}`}
                  target="_self"
                  className="  w-full h-full"
                >
                  <div className="  aspect-[2/3] lg:aspect-square relative w-full h-full ">
                    <div className=" -z-10 relative  top-0 w-full h-full  overflow-hidden">
                      {post?.featured_image?.length ? (
                        <Image
                          className={`relative object-cover w-full h-full rounded-lg`}
                          src={post?.featured_image[0]}
                          as="image"
                          fill
                          priority={index === 0}
                          sizes="(min-width: 180px), 80vw, 100vw"
                          alt={post?.title?.rendered}
                        />
                      ) : (
                        <ImageMissing />
                      )}
                    </div>
                    <div className=" absolute top-0 z-20 bg-black/40 w-full h-full rounded-lg "></div>
                    <p className=" absolute bottom-2 left-0 px-2 z-50 line-clamp-3 h-fit text-xs md:text-sm lg:text-base text-White">
                      {parse(post?.title?.rendered)}
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
            )
          })}
      </Swiper>
    </section>
  )
}
