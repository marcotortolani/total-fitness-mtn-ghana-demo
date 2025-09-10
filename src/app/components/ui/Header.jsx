'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Poppins } from 'next/font/google'

import dictionary from '@/dictionary/lang.json'

//import { configSiteStatic } from '../../../../configSiteStatic.js'
//import SearchBar from './SearchBar'
//import DropdownMenu from './DropdownMenu'
import { HeartIcon, Menu, X, EllipsisVertical } from 'lucide-react'

import logo from '/public/assets/img/logo.svg'
import logoMoob from '/public/assets/img/logo-media-moob.svg'

const poppins = Poppins({
  subsets: ['latin'],
  preload: true,
  fallback: ['sans-serif'],
  weight: ['300', '400', '500', '600'],
})

export default function Header() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true)
  const [lowerPosition, setLowerPosition] = useState(0)
  const [showMenu, setShowMenu] = useState(false)
  const [userRoutineProfile, setUserRoutineProfile] = useState([])
  const menuRef = useRef(null)
  const buttonRef = useRef(null)
  const buttonEllipsisRef = useRef(null)
  const pathname = usePathname()

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY

    if (scrollPosition > lowerPosition + 100) {
      setLowerPosition(scrollPosition)
      setIsNavbarVisible(false)
    }
    if (scrollPosition + 50 <= lowerPosition) {
      setLowerPosition(scrollPosition)
      setIsNavbarVisible(true)
    }
  }, [lowerPosition])

  function handleClickOutside(event) {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target) &&
      !buttonEllipsisRef.current.contains(event.target)
    ) {
      setShowMenu(false)
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [menuRef, buttonRef, buttonEllipsisRef])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  useEffect(() => {
    setShowMenu(false)
  }, [pathname])

  useEffect(() => {
    if (!userRoutineProfile.length) {
      setUserRoutineProfile(
        JSON.parse(localStorage.getItem('userRoutineProfile')),
      )
    }
  }, [])

  return (
    <header
      className={` ${
        isNavbarVisible ? ' top-0 ' : ' -top-44 lg:-top-[10.5rem]  '
      }  z-[200000] rounded-b-xl  pb-0 transition-all duration-300 ease-in-out fixed w-screen  h-fit flex lg:top-0 justify-center`}
    >
      <div className=" relative  w-full flex flex-col items-center justify-center gap-3 md:gap-4 lg:gap-6 ">
        {/* Header for Shorts Page */}
        <div
          className={`${
            pathname.includes('/shorts') ? ' lg:hidden ' : ' hidden '
          } absolute top-4 right-2 z-[1000]  `}
        >
          <button
            type="button"
            ref={buttonEllipsisRef}
            className=" w-8 h-10 bg-black/50 hover:scale-105 rounded-xl flex items-center justify-center "
            onClick={() => setShowMenu(!showMenu)}
          >
            <EllipsisVertical className=" stroke-Primary mx-auto " />
          </button>
        </div>
        {/* Standard header */}
        <div
          className={`${
            pathname.includes('/shorts') ? 'hidden lg:flex' : ' flex '
          } z-50 w-full h-auto lg:px-6 py-1 pb-2 bg-Primary items-center justify-center`}
        >
          <div className=" w-full max-w-screen-xl h-fit flex items-center justify-between px-4 lg:px-0 lg:justify-between">
            <Link
              href={'/'}
              className=" relative w-full max-w-[250px] h-[3rem] md:h-[3.5rem] lg:h-[4rem] cursor-pointer"
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

            <button
              ref={buttonRef}
              className=" w-6 md:w-8 lg:hidden "
              type="button"
              onClick={() => setShowMenu(!showMenu)}
            >
              <Menu size={'100%'} strokeWidth={3} />
            </button>
            <div className=" hidden lg:flex items-center justify-center gap-4">
              <Tab
                title={dictionary['Home']}
                href={'/'}
                isActive={pathname === '/'}
              />
              <Tab
                title={dictionary['Routine']}
                href={'/routine'}
                isActive={pathname.includes('routine')}
              />
              <Tab
                title={dictionary['Trainers']}
                href={'/trainers'}
                isActive={pathname.includes('trainers')}
              />
              <Tab
                title={dictionary['Zumba']}
                href={'/zumba'}
                isActive={pathname.includes('zumba')}
              />
              <Tab
                title={dictionary['Nutrition']}
                href={'/nutrition'}
                isActive={pathname.includes('nutrition')}
              />
              <Tab
                title={dictionary['Shorts']}
                href={'/shorts/1'}
                isActive={pathname.includes('shorts')}
              />
              <IconTab
                title={dictionary['Favourites']}
                href="/favorites"
                icon={HeartIcon}
                isActive={pathname.includes('favorites')}
              />
            </div>
          </div>
        </div>

        {/* <div
          className={` ${
            showSearchBar
              ? ' translate-y-0 '
              : ' translate-y-[200%] bg-transparent '
          } z-50 absolute top-20 w-screen h-screen transition bg-black/50 flex flex-col justify-end pointer-events-none`}
        >
          <div className=" flex justify-center pointer-events-none">
            <SearchBar isVisible={true} resultsOrientation="bottom" />
          </div>
        </div> */}
        {/* <DropdownMenu /> */}
      </div>

      <div
        className={` ${
          showMenu
            ? ' translate-x-0 bg-black/50 '
            : ' translate-x-full bg-black/5 '
        } absolute top-0 right-0 z-[5000] w-screen h-screen lg:hidden backdrop-blur-sm transition-all duration-300 ease-in-out flex justify-end`}
      >
        <div
          ref={menuRef}
          className="  bg-Primary w-[95%] max-w-[400px] shadow-md shadow-black/90 rounded-l-3xl h-[90%]"
        >
          <div className=" p-4 flex items-center justify-between">
            <Image
              className="  w-auto max-w-[200px] md:max-w-[260px] h-full"
              width={100}
              height={64}
              src={logo}
              alt="Logo Horizontal Brand"
              priority
            />
            <button
              className=" w-5 h-5 md:w-6 md:h-6  lg:hidden bg-Black "
              type="button"
              onClick={() => setShowMenu(false)}
            >
              <X size={'100%'} strokeWidth={2.5} color="#cbeb37" />
            </button>
          </div>
          <div className=" w-full h-5/6 flex flex-col justify-between px-8">
            <div className=" flex flex-col w-full gap-2 md:gap-4 mt-6 ">
              <Link
                className=" pl-8 uppercase font-oswaldReg text-base md:text-lg "
                href={'/'}
              >
                {dictionary['Home']}
              </Link>
              <div className=" w-full h-[0.5px] bg-Black/50"></div>
              <Link
                className=" pl-8 uppercase font-oswaldReg text-base md:text-lg"
                href={'/routine'}
              >
                {userRoutineProfile?.dataAccepted
                  ? dictionary['My routine']
                  : dictionary['Create your routine!']}
              </Link>
              <div className=" w-full h-[0.5px] bg-Black/50"></div>

              <Link
                className=" pl-8 uppercase font-oswaldReg text-base md:text-lg"
                href={'/trainers'}
              >
                {dictionary['Team Total Fitness']}{' '}
                <span className=" font-oswaldLight capitalize">
                  ({dictionary['Trainers']})
                </span>
              </Link>
              <div className=" w-full h-[0.5px] bg-Black/50"></div>
              <Link
                className=" pl-8 uppercase font-oswaldReg text-base md:text-lg"
                href={'/zumba'}
              >
                {dictionary["Zumba's Classes"]}
              </Link>
              <div className=" w-full h-[0.5px] bg-Black/50"></div>
              <Link
                className=" pl-8 uppercase font-oswaldReg text-base md:text-lg"
                href={'/nutrition'}
              >
                {dictionary['Nutrition']}
              </Link>
              <div className=" w-full h-[0.5px] bg-Black/50"></div>
              <Link
                className=" pl-8 uppercase font-oswaldReg text-base md:text-lg"
                href={'/shorts/1'}
              >
                {dictionary['Shorts']}
              </Link>
            </div>

            <div className=" flex flex-col gap-6">
              <div className=" flex flex-col items-start gap-0.5">
                <Image
                  className="  w-auto max-w-[150px] md:max-w-[220px] h-full"
                  width={100}
                  height={64}
                  src={logoMoob}
                  alt="Logo Media Moob"
                />
                <p
                  className={
                    poppins.className + ' pl-1 font-light text-base md:text-lg'
                  }
                >
                  {dictionary['This is a Media Moob website']}
                </p>
              </div>
              <div className=" w-full justify-evenly flex items-center gap-2">
                <Link
                  href={'/tyc/'}
                  className={
                    poppins.className +
                    ' font-light underline text-base md:text-lg'
                  }
                >
                  {dictionary['Terms and Conditions']}
                </Link>
                <Link
                  href={'/'}
                  className={
                    poppins.className +
                    ' font-light underline text-base md:text-lg'
                  }
                >
                  {dictionary['Subscribe']}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export function IconTab({ title, href, icon, isActive }) {
  const IconComponent = icon
  return (
    <Link
      className={`${
        isActive ? 'bg-Black' : null
      } hidden lg:flex w-9 h-9 p-[0.35rem] transition-colors duration-200 ease-in-out items-center justify-center rounded-md`}
      href={href}
      aria-label={title}
    >
      <IconComponent
        color={isActive ? '#cbeb37' : 'black'}
        width="100%"
        height="100%"
      />
    </Link>
  )
}

export function Tab({ title, href, isActive }) {
  return (
    <Link
      className={`${
        isActive ? 'bg-DarkGray text-Primary ' : null
      } hidden lg:flex px-2 py-1 uppercase font-oswaldReg text-lg transition-colors duration-200 ease-in-out items-center justify-center rounded-md`}
      href={href}
      aria-label={title}
    >
      {title}
    </Link>
  )
}
