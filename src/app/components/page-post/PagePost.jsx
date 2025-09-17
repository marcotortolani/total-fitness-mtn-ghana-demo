import { Fragment } from 'react'
import parse from 'html-react-parser'
import { cleanDataPosts, processDataRendered } from '@/utils/functions'
import { getNewData } from '@/services/api-content'
import { CATEGORIES } from '@/lib/constants'

import ButtonLikeFav from '../ui/ButtonLikeFav'
//import Breadcrumb from '../ui/Breadcrumb'
import StyledElements from './StyledElements'
import ImagesSlider from './ImagesSlider'
import ShareSocialMedia from './ShareSocialMedia'
import VideoElement from './VideoElement'

import ContentRecommended from './ContentRecommended'

export default async function PagePost({ slug, children, catSlug = '' }) {
  const dataPost = await getNewData(`/posts?slug=${slug}`)

  const dataRendered = await dataPost?.data[0]?.content?.rendered
  const { imagesSlider, elements } = processDataRendered(dataRendered)

  const post = cleanDataPosts({
    posts: dataPost?.data.length ? dataPost?.data : new Array(dataPost?.data),
    categorySlug: catSlug,
  })

  return (
    <main
      className={`z-20 mt-12 md:mb-10 md:mt-16 w-screen max-w-screen-xl h-full min-h-screen px-2 md:px-3 lg:px-4 pt-0 text-White flex flex-col items-center gap-4 md:rounded-xl`}
    >
      <div className="z-50 top-0 m-0 right-0 w-full h-fit flex items-start justify-between gap-3">
        <h1
          className={
            ' w-3/4 uppercase font-oswaldItalic pointer-events-none cursor-default text-[1.8rem] leading-[2rem] md:text-3xl lg:text-4xl text-White text-left  '
          }
        >
          {parse(post[0]?.title)}
        </h1>
        <div className=" w-fit h-10 flex items-end gap-2">
          <div className=" h-8 mb-1">
            <ButtonLikeFav color="#cbeb37" post={post[0]} />
          </div>
          <ShareSocialMedia
            title={post[0]?.title}
            category={post[0]?.category}
          />
        </div>
      </div>

      <section className=" w-full flex flex-col items-center gap-4">
        {elements?.map((el, i) => {
          const hasVideo = elements.some((element) => element.type === 'video')

          return (
            <Fragment key={i}>
              {el.type === 'video' && <VideoElement el={el.content} />}
              {imagesSlider?.length > 0 && el.type === 'destacado-2' && (
                <ImagesSlider images={imagesSlider} centered key={el.content} />
              )}
              {hasVideo &&
              (el.type === 'imagen' || el.type === 'img-destacada') ? (
                <></>
              ) : (
                <StyledElements key={el.content} el={el} />
              )}
              {!hasVideo && <StyledElements key={el.content} el={el} />}
            </Fragment>
          )
        })}
      </section>
      {children}

      <ContentRecommended
        categoriesReq={[
          `${CATEGORIES.nutrition}`,
          `${CATEGORIES.sports}`,
          `${CATEGORIES.zumba}`,
        ]}
      />
      <div className="w-full h-14 md:h-24"></div>
    </main>
  )
}
