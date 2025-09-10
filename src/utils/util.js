import dictionary from '@/dictionary/lang.json'

export const formatTime = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = time - minutes * 60
  return `${minutes < 10 ? '0' : ''}${minutes}:${
    seconds < 10 ? '0' : ''
  }${seconds}`
}

export const timeToString = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  if (minutes > 0 && seconds > 0) {
    return `${minutes} ${
      minutes > 1 ? dictionary['minutes'] : dictionary['minute']
    }, ${seconds} ${seconds > 1 ? dictionary['seconds'] : dictionary['second']}`
  } else if (minutes > 0) {
    return `${minutes} ${
      minutes > 1 ? dictionary['minutes'] : dictionary['minute']
    }`
  } else {
    return `${seconds} ${
      seconds > 1 ? dictionary['seconds'] : dictionary['second']
    }`
  }
}

export const getCategoryID = (apiCategories, group) => {
  return apiCategories?.find((item) => item.slug === group)?.id
}

export const getTagsID = (apiTags, slugsTagsToMatch = []) => {
  return apiTags
    ?.filter((item) => slugsTagsToMatch.includes(item.slug))
    .map((item) => item.id)
}

export const getTagsBySlug = (apiTags, slugsTagsToMatch = []) => {
  return apiTags
    ?.filter((item) => slugsTagsToMatch.includes(item.slug))
    .map((item) => item)
}
export const getTagBySlug = (apiTags, slugTagMatch) => {
  return apiTags?.find((item) => slugTagMatch === item.slug)
}
