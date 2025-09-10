'use client'
import React, { useEffect, useState } from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
} from 'react-share'

import {
  FacebookIcon,
  XtwitterIcon,
  WhatsappIcon,
  TelegramIcon,
  ShareLinkIcon,
} from '@/utils/icons'

import dictionary from '@/dictionary/lang.json'

export default function ShareSocialMedia({
  title,
  category,
  color = '#cbeb37',
}) {
  const [url, setUrl] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    setUrl(window.location.href)
  }, [])
  return (
    <div className=" relative mt-1 ">
      <button
        type="button"
        onClick={() => setModalOpen(!modalOpen)}
        className=" w-fit h-fit m-1"
      >
        <ShareLinkIcon w={30} h={30} fill={color} />
      </button>
      {modalOpen && (
        <div className=" absolute top-8 right-0 bg-White p-4 rounded-xl shadow-md shadow-black/80 flex items-center justify-center flex-nowrap gap-3">
          <FacebookShareButton url={url} hashtag={`total-fitness`}>
            <FacebookIcon w={30} h={30} fill="#363636" />
          </FacebookShareButton>
          <TwitterShareButton
            url={url}
            title={title}
            hashtags={[
              'totalfitness',
              'fitness',
              dictionary['Nutrition'],
              dictionary['Sports'],
              category,
            ]}
          >
            <XtwitterIcon w={30} h={30} fill="#363636" />
          </TwitterShareButton>
          <WhatsappShareButton
            url={url}
            title={`${dictionary['Check out this content from Total Fitness']}: ${title}`}
          >
            <WhatsappIcon w={30} h={30} fill="#363636" />
          </WhatsappShareButton>
          <TelegramShareButton
            url={url}
            title={`${dictionary['Check out this content from Total Fitness']}: ${title}`}
          >
            <TelegramIcon w={30} h={30} fill="#363636" />
          </TelegramShareButton>
        </div>
      )}
    </div>
  )
}
