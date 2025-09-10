import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ReactHtmlParser from 'react-html-parser'
import { PlayCircleIcon } from 'lucide-react'
import ImageMissing from './ImageMissing'

export function CardVideo({ post, index, href, verticalAspect }) {
  return (
    <Link className="w-full h-full" href={href}>
      <div className=" relative z-0 w-full h-full rounded-md md:rounded-lg lg:rounded-xl">
        {post?.images.length > 0 ? (
          <Image
            className={`${
              verticalAspect ? 'aspect-[5/6] md:aspect-square' : 'aspect-[4/3]'
            } relative w-full object-cover rounded-[inherit] cursor-default pointer-events-none select-none`}
            width={200}
            height={80}
            src={post?.images[0]}
            priority={index === 0}
            alt={`Image ${post?.title}`}
          />
        ) : (
          <ImageMissing />
        )}
        <div className=" z-10 absolute top-0 w-full h-full md:px-10 lg:px-16 flex items-center justify-center bg-black/30 rounded-[inherit] ">
          <PlayCircleIcon color="white" size={verticalAspect ? '30%' : '20%'} />
        </div>
      </div>
      <div className=" z-20 w-full h-full p-2 absolute bottom-0  pointer-events-none select-none">
        <h3
          className={`${
            verticalAspect
              ? 'text-[0.6rem] xs:text-xs md:text-base lg:text-xl'
              : 'text-[0.6rem] sm:text-base md:text-lg lg:text-2xl'
          } absolute bottom-3 md:bottom-5 md:left-5 w-5/6 text-Black line-clamp-2 uppercase font-medium text-start  pointer-events-none select-none`}
        >
          <span className=" px-2 pr-3 bg-White/80 box-decoration-clone leading-[1.2rem] md:leading-[1.9rem] lg:leading-[2.5rem]">
            {ReactHtmlParser(post?.title)}
          </span>
        </h3>
      </div>
    </Link>
  )
}
