'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import parse from 'html-react-parser'
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

import videoIcon from '/public/assets/icons/IconoVideo2.webp'

export default function SliderShorts({ posts }) {
  const breakpoints = {
    0: {
      slidesPerView: 2.5,
      spaceBetween: 10,
      centeredSlides: false,
    },
    768: {
      slidesPerView: 3.5,
      spaceBetween: 20,
      centeredSlides: false,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 25,
      centeredSlides: false,
    },
  }

  return (
    <section
      className={` z-50  w-screen  lg:max-w-screen-xl flex flex-col items-start overflow-hidden h-fit relative top-0`}
    >
      <div className=" pl-3 md:pl-4 xl:pl-4 mb-2 ">
        <TitleSummary title={dictionary['SHORTS']} />
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
            <SwiperSlide key={post.id} className={` w-full  h-full `}>
              <Link
                href={`/shorts/${post.slug}`}
                target="_self"
                className="  w-full h-full"
              >
                <div className="  aspect-[2/3] relative w-full h-full ">
                  <div className=" -z-10 relative  top-0 w-full h-full  overflow-hidden">
                    {imagePost?.length > 0 ? (
                      <Image
                        className={`  relative object-cover w-full h-full rounded-lg`}
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
                  <div className=" absolute top-0 z-20 bg-black/40 w-full h-full flex items-center justify-center rounded-lg ">
                    <Image
                      className=" w-10 h-10 lg:w-12 lg:h-12 "
                      src={videoIcon}
                      alt="Video Icon"
                    />
                  </div>
                  <p className=" absolute bottom-2 left-0 md:bottom-3 xl:bottom-4 px-2 md:pl-3 z-50 line-clamp-3  h-fit text-base leading-4 md:text-lg md:leading-5 xl:text-xl tracking-wide text-White">
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
