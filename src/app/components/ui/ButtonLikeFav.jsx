'use client'
import React from 'react'
import { useState, useId, useEffect, useContext } from 'react'
import { StateContext } from '../../../providers/StateProvider'
import { HeartIcon } from '@/utils/icons'

export default function ButtonLikeFav({ post, color }) {
  const { favouritePosts, setFavouritePosts } = useContext(StateContext)
  const [isLiked, setIsLiked] = useState(false)
  const buttonID = useId()

  useEffect(() => {
    if (favouritePosts !== undefined) {
      const postLiked = favouritePosts.find((favPost) => favPost.id === post.id)
      setIsLiked(postLiked)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favouritePosts])

  function handleClick() {
    setIsLiked(!isLiked)

    if (isLiked) {
      const newFavouritePosts = favouritePosts.filter(
        (favPost) => favPost.id !== post.id,
      )
      setFavouritePosts(newFavouritePosts)
    }
    if (!isLiked) {
      const newFavouritePosts = favouritePosts
      setFavouritePosts([...newFavouritePosts, post])
    }
  }

  return (
    <button id={buttonID} onClick={handleClick} className=" z-0 w-full h-full ">
      <HeartIcon liked={isLiked} color={color} />
    </button>
  )
}
