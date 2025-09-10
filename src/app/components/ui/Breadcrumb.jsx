'use client'
import React from 'react'
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HomeIcon } from 'lucide-react'

const poppins = Poppins({
  subsets: ['latin'],
  style: 'normal',
  weight: ['400', '500', '600'],
  display: 'swap',
  fallback: ['sans-serif'],
})

export default function Breadcrumb({ homeElement, separator }) {
  const paths = usePathname()
  const pathNames = paths
    .split('/')
    .map((path) => (path === '' ? homeElement : path))
    .filter((path) => !/^\d+$/.test(path))

  return (
    <div className={poppins.className + ' z-20  w-full h-10 flex md:p-0  '}>
      <ul className=" w-full h-full flex flex-wrap">
        {pathNames.map((el, i) => (
          <li key={i} className=" my-1 flex items-center">
            <Link
              className={`${
                i % 2 !== 0 ? 'bg-SecondaryDarker' : ' bg-Primary'
              } ${
                el === 'Home' ? 'px-1 ' : 'px-4'
              } text-White  py-1 capitalize font-medium text-xs md:text-base cursor-pointer rounded-full`}
              href={`${
                i === 0
                  ? '/'
                  : i === 1
                  ? `/${pathNames[1]}`
                  : i === 2
                  ? `/${pathNames[1]}/${pathNames[2]}`
                  : ''
              }`}
              target="_self"
            >
              {el === 'Home' ? (
                <>
                  <div className=" w-5 h-5 p-[0.1rem] aspect-square flex md:hidden items-center justify-center">
                    <HomeIcon />
                  </div>
                  <span className=" hidden md:flex md:px-4">{el}</span>
                </>
              ) : (
                el
              )}
            </Link>
            {i + 1 < pathNames.length && (
              <span className=" mx-1 text-lg font-normal  ">{separator}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
