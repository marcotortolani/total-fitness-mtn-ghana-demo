'use client'
import React from 'react'
import Link from 'next/link'
import dictionary from '@/dictionary/lang.json'

export default function error({ error }) {
  return (
    <main className=" z-0 mt-36 w-full   h-full min-h-screen px-4 flex flex-col items-center justify-between ">
      <div className=" w-full md:w-5/6 lg:w-4/6 lg:max-w-[900px] flex flex-col items-center gap-6">
        <div className=" w-2/3 h-1/2 p-4 lg:min-h-[200px] flex flex-col items-center justify-center gap-2 bg-Details rounded-2xl">
          <span className={'text-4xl uppercase font-semibold text-White'}>
            {dictionary['Attention!']}
          </span>
          <h2 className={' px-10 text-center text-xl text-White'}>
            {
              dictionary[
                'The category or post you want to access does not exist'
              ]
            }
          </h2>
        </div>
        {/* <span>{error.message}</span> */}
        <Link
          className={' px-4 py-2 font-semibold bg-Secondary rounded-lg'}
          href={'/'}
          target="_self"
        >
          {dictionary['Back to Home']}
        </Link>
      </div>

      <div className="w-full h-20"></div>
    </main>
  )
}
