import React from 'react'
import SliderPreTraining from './SliderPreTraining'
import { getNewData } from '@/services/api-content'
import { CATEGORIES, TAGS } from '@/lib/constants'

export default async function SectionPreTraining() {
  const catName = 'stretches-and-warm-ups'

  const { data } = await getNewData(
    `/posts?per_page=10&categories=${CATEGORIES[catName]}&tags=${TAGS['video']}`,
  )

  return data?.length > 0 && <SliderPreTraining posts={data} />
}
