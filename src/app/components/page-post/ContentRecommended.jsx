import { getNewData } from '@/services/api-content'
import SliderRecommended from './SliderRecommended'

export default async function ContentRecommended({ categoriesReq = [] }) {
  const { data: posts } = await getNewData(
    `/posts?per_page=20&categories=${categoriesReq}`,
    
  )

  return <SliderRecommended posts={posts} />
}
