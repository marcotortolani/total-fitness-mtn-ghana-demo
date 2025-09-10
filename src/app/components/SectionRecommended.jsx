import React from 'react'
import { Poppins } from 'next/font/google'
import { getCategoryId } from '@/services/api-content'
import HorizontalLine from './ui/HorizontalLine'
import ShortCardsLatestPosts from './ShortCardsLatestPosts'

import dictionary from '@/dictionary/lang.json'

const poppins = Poppins({
  subsets: ['latin'],
  style: 'normal',
  weight: ['400', '500', '600'],
  display: 'swap',
  fallback: ['sans-serif'],
})

export default async function SectionRecommended({ category, qty }) {
  const categoryID = await getCategoryId(category.name)

  return (
    <section
      className={
        poppins.className +
        ' w-full max-w-4xl mt-4 flex flex-col items-center gap-2'
      }
    >
      <div className=" w-full flex flex-col items-center">
        <div className=" w-full h-fit flex flex-col gap-6">
          <HorizontalLine size="xs" color="black" />
          <h4 className={' mb-1 text-Black text-sm md:text-sm lg:text-base'}>
            {dictionary['You may also be interested']}
          </h4>
        </div>

        {categoryID && (
          <ShortCardsLatestPosts
            id={categoryID}
            qty={qty}
            categorySlug={category.slug}
            miniCard
          />
        )}
      </div>
    </section>
  )
}
