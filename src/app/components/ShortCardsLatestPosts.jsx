import React from 'react'
import { getPostsByCategoryId } from '@/services/api-content.js'
import { getLatestPosts, cleanDataPosts } from '@/utils/functions.js'
import ShortCard from './ShortCard.jsx'

export default async function ShortCardsLatestPosts({
  id,
  qty,
  categorySlug,
  page,
  miniCard,
  accentColor,
  tagExclude = 72,
}) {
  const { data } = await getPostsByCategoryId({
    id,
    page,
    tagExclude,
  })

  const latestPosts = cleanDataPosts({
    posts: getLatestPosts({ posts: data, qty: qty }),
    categorySlug: categorySlug,
  })

  return (
    <div className=" w-full h-full mt-4 flex justify-center ">
      <ul className=" w-full max-w-2xl lg:max-w-4xl h-full grid grid-cols-2 grid-rows-1  gap-3 md:gap-5 lg:gap-6">
        {latestPosts?.map((post, i) => (
          <ShortCard
            key={post.id}
            index={i}
            qty={latestPosts.length}
            post={post}
            miniCard={miniCard}
            accentColor={accentColor}
          />
        ))}
      </ul>
    </div>
  )
}
