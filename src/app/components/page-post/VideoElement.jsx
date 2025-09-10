'use client'
import React from 'react'
import ReactPlayer from 'react-player'

export default function VideoElement({ el }) {
  const video =
    el
      .replaceAll('&amp;', '&')
      .replace('autopause=0', 'autoplay=0&controls=1&loop=1&muted=1') ?? ''

  return (
    <div className=" relative my-4 bg-White/90 w-full aspect-video overflow-hidden min-h-[160px] rounded-xl flex items-center justify-center">
      {el?.length > 0 && (
        <ReactPlayer
          url={video}
          muted={false}
          volume={1}
          className=" w-full h-full"
          width="100%"
          height="100%"
          controls={true}
          // playing
          loop={false}
        />
      )}
    </div>
  )
}
