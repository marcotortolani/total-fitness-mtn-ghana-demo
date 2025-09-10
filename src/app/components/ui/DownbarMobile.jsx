'use client'
import React from 'react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { usePathname } from 'next/navigation'
import dictionary from '@/dictionary/lang.json'

import {
  ChevronLeft,
  SearchIcon,
  HomeIcon,
  HeartIcon,
  Timer,
} from 'lucide-react'
import SearchBar from './SearchBar'

const navButtons = {
  back: {
    id: 1,
    title: dictionary['back'],
    icon: ChevronLeft,
    href: '',
  },
  search: {
    id: 2,
    title: dictionary['search'],
    icon: SearchIcon,
    href: 'search',
  },
  home: {
    id: 3,
    title: dictionary['home'],
    icon: HomeIcon,
    href: '/',
  },
  favourites: {
    id: 4,
    title: dictionary['favorites'],
    icon: HeartIcon,
    href: '/favorites',
  },
  video: {
    id: 5,
    title: dictionary['routine'],
    icon: Timer,
    href: '/routine',
  },
}

export default function DownbarMobile() {
  const [currentPath, setCurrentPath] = useState('/')
  const [previousPath, setPreviousPath] = useState(['', ''])
  const [showSearchBar, setShowSearchBar] = useState(false)
  const path = usePathname()

  useEffect(() => {
    if (path !== currentPath) {
      let newArray = previousPath
      newArray[0] = currentPath
      newArray[1] = path
      setPreviousPath([...newArray])
      setCurrentPath(path)
      setShowSearchBar(false)
    }
  }, [path, currentPath, previousPath])

  if (path.includes('/shorts')) {
    return null
  }

  return (
    <div className=" z-[100000] fixed bottom-0 w-full h-[8vh] min-h-[40px] max-h-[60px] border-t-[1px] border-t-DarkGray p-[0.8rem] py-4  flex items-center justify-center text-White bg-Black lg:hidden">
      <ul className=" z-40 w-full h-full flex items-center justify-around ">
        {Object.values(navButtons).map((button) => (
          <StyledTab
            key={button.id}
            title={button.title}
            icon={button.icon}
            href={button.href}
            currentPath={currentPath}
            previousPath={previousPath[0]}
            onSearch={() => setShowSearchBar(!showSearchBar)}
          />
        ))}
      </ul>
      <div
        className={` ${
          showSearchBar
            ? ' translate-y-0 '
            : ' translate-y-[200%] bg-transparent '
        } z-50 absolute bottom-12 w-screen h-screen transition bg-black/70 flex flex-col justify-end pointer-events-none`}
      >
        <div className=" flex justify-center pb-8 pointer-events-none">
          <SearchBar isVisible={true} resultsOrientation="top" />
        </div>
      </div>
    </div>
  )
}

export function StyledTab({
  title,
  icon,
  href,
  currentPath,
  previousPath,
  onSearch,
}) {
  const IconComponent = icon
  return (
    <li
      className={`h-fit p-2 flex items-center justify-center ${
        currentPath === href ? 'bg-Primary' : 'bg-transparent'
      }  rounded-lg `}
    >
      {href !== 'search' ? (
        <Link
          className=" w-full h-full flex items-center justify-center"
          href={title !== dictionary['back'] ? href : previousPath}
          aria-label={title}
        >
          <IconComponent color={currentPath === href ? 'black' : 'white'} />
        </Link>
      ) : (
        <button
          type="button"
          className=" w-full h-full flex items-center justify-center"
          onClick={onSearch}
        >
          <IconComponent color={currentPath === href ? 'black' : 'white'} />
        </button>
      )}
    </li>
  )
}
