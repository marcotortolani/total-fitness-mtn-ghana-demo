import React from 'react'
import { getNewData } from '@/services/api-content'
import SliderShorts from './SliderShorts'
import { CATEGORIES, TAGS } from '@/lib/constants'

export default async function SectionShorts() {
  const catName = 'shorts'
  const { data } = await getNewData(
    `/posts?per_page=10&categories=${CATEGORIES[catName]}&tags=${TAGS['video']}`,
  )

  return data?.length > 0 && <SliderShorts posts={data} />
}
