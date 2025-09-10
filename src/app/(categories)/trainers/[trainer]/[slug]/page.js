import React from 'react'
import PagePost from '@/app/components/page-post/PagePost'

export default function page({ params }) {
  const { trainer, slug } = params  

  return <PagePost slug={slug} catSlug={`trainers/${trainer}`} />
}
