'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ReactHtmlParser from 'react-html-parser'
import { TitleSummary } from '../ui/TitleSummary'
import ImageMissing from '../ImageMissing'
import { getImageHeaderPost } from '@/utils/functions'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import SwiperCore from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
SwiperCore.use([Pagination])

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
    spaceBetween: 20,
    centeredSlides: false,
  },
  1280: {
    slidesPerView: 6.5,
    spaceBetween: 30,
    centeredSlides: false,
  },
}
export default function SliderTrainersRoutines({ posts }) {
  return (
    <section className=" z-50  w-screen lg:max-w-screen-xl flex flex-col items-start overflow-hidden h-fit relative top-0 ">
      <div className=" pl-3 xl:pl-4 mb-2 ">
        <TitleSummary
          title={dictionary['Exclusive routines from our trainers']}
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
        className="mySwiper w-full h-full "
        style={{
          paddingLeft: ' calc(0.1vw + 10px) ',
          paddingRight: ' calc(0.1vw + 10px) ',
        }}
      >
        {posts?.map((post, index) => {
          const imagePost = getImageHeaderPost(post)

          return (
            <SwiperSlide
              key={`${post.id}-pre-training-${index}`}
              className={`w-full h-full hover:cursor-pointer `}
            >
              <Link
                href={`/${post?.slug}`}
                target="_self"
                className="  w-full h-full "
              >
                <div className="w-full h-full group">
                  <div className=" -z-10 relative aspect-[2/3] lg:aspect-[4/5] top-0 w-full h-full overflow-hidden rounded-lg">
                    {imagePost?.length > 10 ? (
                      <Image
                        className={` relative object-cover w-full h-full group-hover:scale-110 transition-all duration-300 ease-in-out`}
                        src={imagePost}
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
                  <p className=" px-1 mt-1 z-50 line-clamp-3  h-fit text-[0.6rem] xs:text-xs md:text-sm lg:text-base text-White">
                    {ReactHtmlParser(post?.title?.rendered)}
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
