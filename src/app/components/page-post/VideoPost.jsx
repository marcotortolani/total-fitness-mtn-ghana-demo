import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import ShareSocialMedia from './ShareSocialMedia'
import Breadcrumb from '../ui/Breadcrumb'
import ButtonLikeFav from "../ui/ButtonLikeFav"
import { processDataRendered } from '@/utils/functions'
import StyledElements from './StyledElements'

import { getImageHeaderPost } from '@/utils/functions'

export default async function VideoPost({ dataVideo, vimeoNumber, children }) {
  const image = getImageHeaderPost(dataVideo)
  const dataFavourite = {
    id: dataVideo?.id,
    category: 'videos/1',
    title: dataVideo?.title.rendered,
    excerpt: dataVideo?.excerpt.rendered,
    images: [image],
  }

  const { elements } = processDataRendered(dataVideo?.excerpt.rendered)

  return (
    <main
      className={`z-20 mt-28 md:mb-10 md:mt-32 w-screen max-w-screen-xl h-full min-h-screen px-6 pt-6 bg-White text-Black flex flex-col items-center gap-4 md:rounded-xl`}
    >
      <div className="z-50 top-0 m-2 right-0 w-full lg:max-w-4xl h-10 flex items-center justify-between">
        <Breadcrumb homeElement={'Home'} separator={'>'} />
        <ButtonLikeFav color="#000" post={dataFavourite} />
      </div>
      <section className=" w-full lg:max-w-4xl flex flex-col items-center gap-4">
        <h1
          className={
            ' w-full uppercase font-oswaldItalic pointer-events-none cursor-default text-[1.8rem] leading-[2rem] md:text-3xl lg:text-4xl text-Black text-left  '
          }
        >
          {ReactHtmlParser(dataVideo?.title.rendered)}
        </h1>
        <div className=" z-20 w-full h-8 flex items-center justify-start gap-4">
          <ShareSocialMedia
            title={dataVideo?.title.rendered}
            category="video"
          />
        </div>
        <div className=" w-full aspect-video rounded-lg lg:rounded-xl">
          {vimeoNumber && (
            <iframe
              src={
                'https://player.vimeo.com/video/' +
                vimeoNumber +
                `?background=0&badge=1&autoplay=0&autopause=1&byline=0&controls=1&pip=none&quality_selector=0`
              }
              className=" rounded-[inherit]"
              loading="lazy"
              width="100%"
              height="100%"
              allow="fullscreen"
              allowFullScreen
              autoPlay={false}
              title={dataVideo?.title.rendered}
            ></iframe>
          )}
        </div>
        {elements?.map((el) => (
          <StyledElements key={el.content} el={el} />
        ))}
      </section>
      {children}
      <div className="w-full h-10 md:h-20"></div>
    </main>
  )
}
