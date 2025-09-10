import React from 'react'
import FavouriteCardPost from '@/app/components/FavouriteCardPost'

export default function FavouritesPage() {
  return (
    <main className=" z-0 mt-16 w-full md:mt-20  h-full min-h-screen px-4 flex flex-col items-center justify-between ">
      <div className=" w-full h-full md:w-5/6 lg:w-4/6 lg:max-w-[900px] flex flex-col items-center">
        <FavouriteCardPost />
      </div>

      <div className="w-full h-20"></div>
    </main>
  )
}
