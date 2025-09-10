// src/app/shorts/page.tsx

import React from 'react'
import { getNewData } from '@/services/api-content'
import { CATEGORIES } from '@/lib/constants'
import { VideoPlayerList } from '@/app/components/video/VideoPlayerList'

export default async function Page() {
  const { data } = await getNewData(
    `/posts?per_page=50&categories=${CATEGORIES['shorts']}`,
  )

  return <VideoPlayerList items={data} />
}
