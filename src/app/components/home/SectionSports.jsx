import React from 'react'
import { getNewData } from '@/services/api-content'
import SliderSports from './SliderSports'

export default async function SectionSports({ dataCategories }) {
  const categoriesReq = ['sports']
  const categoriesFiltered = await dataCategories
    ?.filter((category) => categoriesReq.includes(category.slug))
    .map((item) => item.id)
  const slug = `/posts?per_page=10&categories=${categoriesFiltered}`
  const { data } = await getNewData(slug)

  return data?.length > 0 && <SliderSports posts={data} />
}
