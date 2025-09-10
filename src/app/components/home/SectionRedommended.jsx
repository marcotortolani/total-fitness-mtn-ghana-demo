import React from 'react'
import { getNewData } from '@/services/api-content'
import SliderRecommended from './SliderRecommended'

export default async function SectionRecommended({ dataCategories }) {
  const categoriesReq = ['nutrition', 'healthy-lifestyle', 'sports']
  const categoriesFiltered = await dataCategories
    ?.filter((category) => categoriesReq.includes(category.slug))
    .map((item) => item.id)
  const videoTagID = 72
  const slug = `/posts?per_page=20&categories=${categoriesFiltered}&tags=${videoTagID}`
  const { data } = await getNewData(slug)

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      // Genera un índice aleatorio entre 0 y i
      const j = Math.floor(Math.random() * (i + 1))

      // Intercambia los elementos en las posiciones i y j
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  return (
    data?.length > 0 && (
      <SliderRecommended posts={shuffleArray(data)?.slice(0, 10)} />
    )
  )
}
