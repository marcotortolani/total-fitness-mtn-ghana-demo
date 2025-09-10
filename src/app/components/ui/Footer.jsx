'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import dictionary from '@/dictionary/lang.json'
import { URL_SUBSCRIPTION } from '@/config/config'

import logo from '/public/assets/img/logo.svg'

export default function Footer() {
  const path = usePathname()

  if (
    path.includes('/shorts') ||
    path.includes('/routine') ||
    path.includes('/training')
  ) {
    return null
  }

  return (
    <footer
      className={` z-20 w-full min-h-[160px] max-h-[250px] py-4 mb-16 bg-Primary  flex flex-col items-center justify-around gap-2`}
    >
      <div className="w-full max-w-[200px] h-1/4 sm:h-2/5 md:h-1/3 flex items-center justify-center  cursor-default pointer-events-none">
        <Link
          href={'/'}
          className=" relative w-full max-w-[250px] mx-auto h-[3rem] md:h-[3.5rem] lg:h-[4rem] flex items-center justify-center transition-all hover:scale-105 cursor-pointer pointer-events-auto "
        >
          <Image
            className="  w-auto max-w-[200px] lg:max-w-[250px] h-full"
            width={100}
            height={64}
            src={logo}
            alt="Logo Horizontal Brand"
            priority
          />
        </Link>
      </div>
      <div className=" h-1/3 flex flex-col items-center gap-0 pointer-events-none cursor-defaul select-none">
        <p className=" uppercase text-xs md:text-sm lg:text-base leading-4 text-neutral-500">
          {dictionary['Total Fitness is a Media Moob website']}
        </p>
        <p className=" uppercase text-xs md:text-sm lg:text-base leading-4 text-neutral-500">
          {dictionary['All rights reserved']}
        </p>
      </div>
      <Link
        href={'/tyc'}
        className=" h-1/4 uppercase text-xs md:text-sm lg:text-base text-sky-600 hover:text-sky-700 underline"
      >
        {dictionary['Terms and Conditions']}
      </Link>
      <Link
        href={URL_SUBSCRIPTION}
        target="_blank"
        className=" h-1/4 uppercase text-xs md:text-sm lg:text-base text-sky-600 hover:text-sky-700 underline"
      >
        {dictionary['Subscribe']}
      </Link>
    </footer>
  )
}
