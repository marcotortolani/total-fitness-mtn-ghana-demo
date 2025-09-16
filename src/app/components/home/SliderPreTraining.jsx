'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import parse from 'html-react-parser'
import { TitleSummary } from '../ui/TitleSummary'
import ImageMissing from '../ImageMissing'
import { getImageHeaderPost } from '@/utils/functions'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
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
    slidesPerView: 5,
    spaceBetween: 30,
    centeredSlides: false,
  },
}
export default function SliderPreTraining({ posts }) {
  return (
    <section className=" z-50  w-screen lg:max-w-screen-xl flex flex-col items-start overflow-hidden h-fit relative top-0 ">
      <div className=" pl-3 mb-2 ">
        <TitleSummary title={dictionary['Stretches and warm-ups']} />
      </div>
      <Swiper
        // autoplay={{
        //   delay: delayPerView,
        //   disableOnInteraction: false,
        // }}
        modules={[Navigation]}
        navigation={false}
        breakpoints={breakpoints}
        className="mySwiper w-full h-full"
        style={{
          paddingLeft: ' calc(0vw + 10px) ',
          paddingRight: ' calc(0vw + 10px) ',
        }}
      >
        {posts?.map((post, index) => {
          const imagePost = getImageHeaderPost(post)

          return (
            <SwiperSlide
              key={`${post.id}-pre-training-${index}`}
              className={` w-full  h-full `}
              // style={{
              //   marginLeft: index === 0 ? ' 10px ' : ' 0px ',
              //   marginRight: index === 5 ? ' 10px ' : ' 0px ',
              // }}
            >
              <Link
                href={`/${post?.slug}`}
                target="_self"
                className="group w-full h-full"
              >
                <div className=" relative w-full h-full ">
                  <div className=" -z-10 relative  top-0 w-full h-full aspect-[2/3] lg:aspect-[5/6] rounded-lg overflow-hidden">
                    {imagePost?.length > 10 ? (
                      <Image
                        className={`relative object-cover w-full h-full group-hover:scale-110 transition-all duration-500 ease-in-out`}
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
                  {/* <div className=" absolute top-0 z-20 bg-black/40 w-full h-full rounded-lg "></div> */}
                  <p className=" px-1 mt-1  z-50 line-clamp-3  h-fit text-[0.6rem] xs:text-xs md:text-sm lg:text-base text-White">
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
