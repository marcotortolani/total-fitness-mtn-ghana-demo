'use client'
import Link from 'next/link'
import Image from 'next/image'
import { getImageHeaderPost } from '@/utils/functions'
import ImageMissing from '../ImageMissing'
import parse from 'html-react-parser'

export default function LatestPostsZumba({ posts }) {
  return (
    <div className=" w-full grid grid-cols-3 gap-2 md:gap-4 xl:gap-6 ">
      {posts?.map((post, index) => {
        const imagePost = getImageHeaderPost(post)
        return (
          <div key={post?.id} className=" w-full h-full">
            <Link href={`/zumba/${post?.slug}`} target="_self" className="">
              <div className="  aspect-[3/2] xl:aspect-video relative w-full h-full ">
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
              </div>
            </Link>
            <p className=" mt-1 z-50 line-clamp-2 px-0.5 h-fit font-oswaldLight text-[0.6rem] xs:text-xs md:text-sm lg:text-base text-White/80">
              {parse(post?.title?.rendered)}
            </p>
          </div>
        )
      })}
    </div>
  )
}
