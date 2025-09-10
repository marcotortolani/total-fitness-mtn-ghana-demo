import React from 'react'
import { CATEGORIES } from '@/lib/constants'
import { getNewData } from '@/services/api-content'
import { VideoPlayerList } from '@/app/components/video/VideoPlayerList'

export default async function Page({ params }) {
  const { id } = await params

  const { data } = await getNewData(
    `/posts?per_page=50&categories=${CATEGORIES['shorts']}`,
  )

  const index = data.findIndex((item) => item.slug === id)

  return <VideoPlayerList items={data} defaultIndex={index} />
  // return <VideoPlayerList items={videos} totalPages={data.totalPages || 0} defaultIndex={index} tags={tags} />
}
