'use client'
import React, { useEffect, useState, useContext } from 'react'
import Image from 'next/image'
import parse from 'html-react-parser'
import ShareSocialMedia from '@/app/components/page-post/ShareSocialMedia'
import ButtonLikeFav from '@/app/components/ui/ButtonLikeFav'
import { getNewData } from '@/services/api-content'
//import SliderRecommended from '@/app/components/page-post/SliderRecommended'
import { StateContext } from '@/providers/StateProvider'
import Link from 'next/link'

import dictionary from '@/dictionary/lang.json'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cleanDataPosts } from '@/utils/functions'

export default function page() {
  const { apiCategories } = useContext(StateContext)
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    if (!apiCategories) return

    const categoriesFiltered = apiCategories
      ?.filter((category) => category.slug === 'sports')
      .map((item) => item.id)
    const catString = categoriesFiltered.join(',')
    const slug = `/posts?per_page=20&page=${page}&categories=${catString}`

    getNewData(slug).then((res) => {
      setPosts(res.data)
      setTotalPages(res.pages)
    })
  }, [page, apiCategories])

  return (
    <main
      className={`z-20 mt-12 mb-10 md:mt-0 w-screen max-w-screen-xl h-full min-h-fit px-3 pt-0 text-White flex flex-col items-center gap-4 md:rounded-xl`}
    >
      <div className="z-50 top-0 m-0 right-0 w-full lg:max-w-4xl h-10 flex items-center justify-end gap-3">
        <h1
          className={
            ' w-full uppercase font-oswaldSemBold pointer-events-none cursor-default text-xl md:text-2xl lg:text-3xl text-White text-left  '
          }
        >
          {dictionary['Sports']}
        </h1>
        <ShareSocialMedia title={dictionary['Sports']} category="Deporte" />
      </div>
      <section className=" w-full lg:max-w-4xl grid grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-7 lg:gap-6">
        {posts?.map((post, i) => {
          const imageFeaturedPattern =
            /<img\s+[^>]*class=["'][^"']*img-destacada[^"']*["'][^>]*src=["'](.+?)["'][^>]*>|<img\s+[^>]*src=["'](.+?)["'][^>]*class=["'][^"']*img-destacada[^"']*["'][^>]*>/i
          const match = imageFeaturedPattern.exec(post?.content?.rendered)
          const imageFeatured = match[1]

          const postCleaned = cleanDataPosts({
            posts: new Array(post),
            categorySlug: 'sports',
          })

          return (
            <Link
              key={i}
              href={`/sports/${post?.slug}`}
              className=" w-full h-fit"
            >
              <div className=" w-full h-fit flex flex-col items-left justify-center gap-1">
                <div className="relative w-full h-full aspect-[9/14] ">
                  <Image
                    className="w-full h-full object-cover shadow-md shadow-black/50 rounded-lg"
                    fill
                    src={imageFeatured}
                    alt={`${post?.title?.rendered}`}
                  />
                  <div className=" z-10 absolute top-0 left-0 w-full h-full bg-black/30 rounded-lg"></div>
                  <div className=" z-20 absolute top-1 right-1 w-6 h-6 pointer-events-none">
                    <ButtonLikeFav color="#cbeb37" post={postCleaned[0]} />
                  </div>
                </div>

                <p className="  font-oswaldReg text-xs pb-1 leading-3 line-clamp-2 text-White/80">
                  {parse(post?.title?.rendered)}
                </p>
              </div>
            </Link>
          )
        })}
      </section>
      <div className=" w-full flex items-center justify-around font-oswaldMed">
        <button
          type="button"
          onClick={
            page > 1 ? () => setPage(page - 1) : () => setPage(totalPages)
          }
        >
          <ChevronLeft size={20} />
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
          type="button"
          onClick={
            page < totalPages ? () => setPage(page + 1) : () => setPage(1)
          }
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* <SliderRecommended categoriesReq={['healthy-lifestyle', 'nutrition']} /> */}
      <div className="w-full h-10 md:h-20"></div>
    </main>
  )
}
