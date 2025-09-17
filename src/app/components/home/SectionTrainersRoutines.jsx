import React from 'react'
import { getNewData } from '@/services/api-content'
import SliderTrainersRoutines from './SliderTrainersRoutines'

import { CATEGORIES, TAGS } from '@/lib/constants'

export default async function SectionTrainersRoutines() {
  const catName = 'trainers'

  const { data } = await getNewData(
    `/posts?per_page=10&categories=${CATEGORIES[catName]}&tags=${TAGS['video']}`,
  )

  if (data.length === 0) {
    return null
  }

  return data?.length > 0 && <SliderTrainersRoutines posts={data} />
}
