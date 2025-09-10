'use client'
import { useEffect, useRef, useContext, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ChatBotIcon } from '@/utils/icons'
import { Poppins } from 'next/font/google'
import { URL_CHATBOT } from '@/config/config'
import dictionary from '@/dictionary/lang.json'

import { StateContext } from '@/providers/StateProvider'

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
  preload: true,
})

export default function ChatBot() {
  const { chatbotOpened, setChatbotOpened } = useContext(StateContext)
  const modalRef = useRef(null)
  const pathname = usePathname()
  const [hideBot, setHideBot] = useState(false)

  useEffect(() => {
    setChatbotOpened(false)
    if (
      pathname.includes('training') ||
      pathname.includes('routine') ||
      pathname.includes('shorts')
    ) {
      setHideBot(true)
    } else {
      setHideBot(false)
    }
    return () => {
      setChatbotOpened(false)
    }
  }, [pathname])

  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setChatbotOpened(false)
      }
    }
    if (chatbotOpened) {
      document.addEventListener('click', handleClickOutside)
    }
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [chatbotOpened])

  const toggleChat = () => {
    setChatbotOpened(!chatbotOpened)
  }

  return (
    <div
      ref={modalRef}
      className={
        poppins.className +
        ` ${
          hideBot ? 'hidden' : ''
        }  z-30 fixed md:sticky bottom-16 md:bottom-20 lg:bottom-4 right-0 lg:right-6 md:mr-4 w-full sm:w-[380px] md:w-full h-fit flex flex-col items-end pointer-events-auto`
      }
    >
      {chatbotOpened && (
        <iframe
          src={URL_CHATBOT}
          className={`${
            chatbotOpened
              ? ' opacity-100 scale-y-100 flex translate-x-0'
              : ' opacity-0 scale-y-0 translate-x-[200%]  '
          }  absolute bottom-14 md:bottom-16 lg:bottom-20 md:right-0 w-full md:w-[380px] lg:w-[400px] xl:w-[500px]
        h-[60svh] max-h-[550px]
         transition-all duration-150 ease-in-out`}
        />
      )}
      <div className=" absolute bottom-0 right-0 w-fit my-2 pr-2 sm:pr-0 flex items-center justify-end gap-2 md:justify-between">
        <button
          onClick={toggleChat}
          className=" relative w-12 h-12 md:w-16 md:h-16 p-1 shadow-black shadow-md bg-Primary rounded-full "
        >
          <ChatBotIcon fill="#000" />
        </button>
        <button
          onClick={toggleChat}
          className=" hidden md:flex px-4 lg:px-8 py-4 shadow-black shadow-md text-lg lg:text-lg xl:text-xl text-Black bg-Primary rounded-full "
        >
          {dictionary['Chat with our online assistant!']}
        </button>
      </div>
    </div>
  )
}
