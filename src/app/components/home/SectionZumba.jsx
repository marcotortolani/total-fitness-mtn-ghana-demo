import Link from 'next/link'
import Image from 'next/image'
import { getNewData } from '@/services/api-content'

import { CATEGORIES } from '@/lib/constants'
import dictionary from '@/dictionary/lang.json'

import bannerZumba from '/public/assets/img/banner-zumba.webp'
import ImageMissing from '../ImageMissing'
import LatestPostsZumba from './LatestPostsZumba'

export default async function SectionZumba() {
  const catName = 'zumba'
  const { data } = await getNewData(
    `/posts?per_page=3&categories=${CATEGORIES[catName]}`,
  )
  

  return (
    <section className=" z-50  w-screen md:w-full lg:max-w-screen-xl h-fit my-10 relative top-0 px-1 flex flex-col gap-0 md:gap-2 xl:gap-4 ">
      <Link href={`/${catName}`} className="w-full ">
        <div className=" relative mx-auto w-full mb-2 aspect-[7/3] md:aspect-[9/3] lg:aspect-[4/1] cursor-pointer flex flex-col items-center justify-center rounded-lg">
          <div className=" -z-10 relative top-0 w-full h-full  overflow-hidden rounded-lg md:rounded-xl lg:rounded-xl ">
            {bannerZumba ? (
              <Image
                className={`  relative w-full h-auto lg:w-auto lg:h-full object-cover md:object-top rounded-[inherit]`}
                src={bannerZumba}
                as="image"
                fill
                priority={true}
                sizes="(min-width: 180px), 80vw, 100vw"
                alt={dictionary["Banner Zumba's Classes"]}
              />
            ) : (
              <ImageMissing />
            )}
          </div>

          <div className=" absolute w-full  h-full px-6 flex flex-col items-start justify-center  xs:gap-1 lg:gap-4 xl:gap-6 ">
            <span
              className={` bg-PrimaryDark text-Black  px-2 py-0.5 text-[0.5rem] xs:text-xs md:text-sm uppercase font-oswaldMed`}
            >
              {dictionary["Zumba's Classes with Maria"]}
            </span>
            <div className=" w-2/3 max-w-[200px] md:max-w-[260px] lg:max-w-[300px] h-fit ">
              <p
                className={
                  '  mb-2 uppercase font-oswaldSemBold  pointer-events-none cursor-default flex flex-col  xsm:gap-2 sm:gap-4 text-pretty text-base xs:text-xl md:text-2xl lg:text-3xl text-White text-left  '
                }
              >
                <span className=" text-xl xs:text-2xl xs:leading-6 sm:text-3xl sm:leading-7 md:leading-8 lg:text-4xl lg:leading-10 xl:text-5xl xl:leading-[3.5rem] font-oswaldItalic text-Primary ">
                  {dictionary['We train']} <br /> {dictionary['and Dance']}
                </span>
                <span
                  className={` mt-1 xs:mt-3 xl:mt-8 bg-PrimaryDark text-Black  w-fit px-2 xs:px-5 xs:py-1 text-[0.5rem] xs:text-xs md:text-sm uppercase font-oswaldMed rounded-full`}
                >
                  {dictionary['Discover them here']}
                </span>
              </p>
            </div>
          </div>
        </div>
      </Link>

      <LatestPostsZumba posts={data} />
    </section>
  )
}
