import React from 'react'
import { getNewData } from '@/services/api-content'
import SliderHealthyLife from './SliderHealthyLife'

import { CATEGORIES } from '@/lib/constants'

export default async function SectionHealthyLife() {
  const catName = 'healthy-lifestyle'

  const { data } = await getNewData(
    `/posts?per_page=10&categories=${CATEGORIES[catName]}`,
  )

  return data?.length > 0 && <SliderHealthyLife posts={data} />
}
