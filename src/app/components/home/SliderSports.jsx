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

export default function SliderSports({ posts }) {
  return (
    <section className=" z-50  w-screen md:w-full lg:max-w-screen-lg flex flex-col items-start overflow-hidden h-fit relative top-0 ">
      <div className=" pl-3 mb-2 ">
        <TitleSummary title="Contenido de Deportes" />
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
          paddingRight: ' 20px ',
        }}
      >
        {posts?.map((post, index) => {
          const imagePost = getImageHeaderPost(post)

          return (
            <SwiperSlide
              key={`${post.id}-sports-${index}`}
              className={` w-full  h-full `}
              style={{
                marginLeft: index === 0 ? ' 10px ' : ' 0px ',
                marginRight: index === 5 ? ' 10px ' : ' 0px ',
              }}
            >
              <Link
                href={`/sports/${post?.slug}`}
                target="_self"
                className="  w-full h-full"
              >
                <div className="  aspect-[2/3] lg:aspect-square relative w-full h-full ">
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
                  <div className=" absolute top-0 z-20 bg-black/40 w-full h-full rounded-lg "></div>
                  <p className=" absolute bottom-2 left-2  z-50 line-clamp-3  h-fit text-xs text-White">
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
