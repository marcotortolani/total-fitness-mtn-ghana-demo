import React from 'react'
import PagePost from '@/app/components/page-post/PagePost'

export default function page({ params }) {
  const { slug } = params

  return <PagePost slug={slug} catSlug="sports" />
}
