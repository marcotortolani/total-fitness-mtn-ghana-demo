import { getNewData } from '@/services/api-content'

export const fetchPosts = async (category, tags = '', tagsExclude = '') => {
  let slug = `/posts?per_page=${50}&categories=${category}`
  let response
  if (tags) {
    slug = slug + '&tags=' + tags
  }
  if (tagsExclude) {
    slug = slug + '&tags_exclude=' + tagsExclude
  }

  try {
    response = await getNewData(slug)
  } catch (e) {
    throw e
  }

  return response.data
}
