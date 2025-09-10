'use client'
import { useRef, useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { StateContext } from '@/providers/StateProvider'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
import SwiperCore from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

import PaginationBullets from '../ui/PaginationBullets'
import ImageMissing from '../ImageMissing'
import dictionary from '@/dictionary/lang.json'

SwiperCore.use([Pagination])

const DATA_HOME_COVER = [
  {
    id: 1,
    text01: dictionary['Trainers'],
    textHighlighted: dictionary['Team Total Fitness'],
    text02: '',
    badge01: dictionary['Train with the best'],
    badge02: dictionary['Meet them here'],
    href: '/trainers',
    image: '/assets/img/banner-influencers.webp',
  },
  {
    id: 2,
    text01: dictionary['Train at home and get'],
    textHighlighted: dictionary['your dream body'],
    text02: '',
    badge01: dictionary['Exclusive routines'],
    badge02: dictionary['Create your routine now'],
    href: '/routine',
    image: '/assets/img/banner-rutina.webp',
  },
  {
    id: 3,
    text01: dictionary['Find out the'],
    textHighlighted: dictionary['right nutrition'],
    text02: dictionary['for your routine'],
    badge01: dictionary['Nutritional tips'],
    badge02: dictionary['See more'],
    href: '/nutrition',
    image: '/assets/img/banner-nutricion.webp',
  },
  {
    id: 4,
    text01: dictionary['Meet Fitbuddy'],
    textHighlighted: dictionary['Your AI fitness assistant'],
    text02: '',
    badge01: dictionary['Artificial Intelligence'],
    badge02: dictionary['Ask it now'],
    href: '/chatbot',
    image: '/assets/img/banner-chatbot.webp',
  },
]

export default function SliderHomeCover() {
  const router = useRouter()
  const { chatbotOpened, setChatbotOpened } = useContext(StateContext)
  const [indexPag, setIndexPag] = useState(0)
  const sliderRef = useRef(0)
  const qtyBullets = DATA_HOME_COVER.length

  const pagination = {
    clickable: true,
    type: 'custom',
    renderCustom: function (i, className) {
      setIndexPag(className)
      return null
    },
  }

  const handleRedirection = (path) => {
    if (path) {
      router.push(path)
    }
    return null
  }

  const openChatbot = () => {
    setChatbotOpened(!chatbotOpened)
  }

  return (
    <div className=" z-20 relative top-0 w-screen overflow-hidden ">
      <Swiper
        ref={sliderRef}
        speed={1500}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          waitForTransition: true,
        }}
        pagination={pagination}
        modules={[Navigation, Autoplay]}
        navigation={false}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
            centeredSlides: true,
            direction: 'horizontal',
          },
          768: {
            slidesPerView: 1.5,
            spaceBetween: 15,
            centeredSlides: true,
            direction: 'horizontal',
          },
          1024: {
            slidesPerView: 1.75,
            spaceBetween: 20,
            centeredSlides: true,
            direction: 'horizontal',
          },
          1440: {
            slidesPerView: 2,
            spaceBetween: 20,
            centeredSlides: true,
            direction: 'horizontal',
          },
          1920: {
            slidesPerView: 2,
            spaceBetween: 40,
            centeredSlides: true,
            direction: 'horizontal',
          },
        }}
        className="mySwiper w-full h-full "
      >
        {DATA_HOME_COVER?.map((banner, index) => (
          <SwiperSlide
            key={banner.id}
            className={`${
              index === 0 ? '' : ' '
            } w-full min-w-[160px] px-2 sm:px-4 md:px-0 h-full relative overflow-hidden`}
          >
            <Banner
              key={banner.id}
              banner={banner}
              onClick={() =>
                banner.href === '/chatbot'
                  ? openChatbot()
                  : handleRedirection(banner.href)
              }
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className=" z-50 relative bottom-0">
        <PaginationBullets
          color={'primary'}
          size={'default'}
          qtyBullets={qtyBullets}
          index={indexPag}
        />
      </div>
    </div>
  )
}

const Banner = ({ banner, onClick }) => {
  return (
    <div
      onClick={onClick}
      className=" relative mx-auto w-full md:w-[95%] aspect-video xl:max-w-4xl cursor-pointer flex flex-col items-center justify-center rounded-xl"
    >
      <div className=" -z-10 relative top-0 w-full h-full  overflow-hidden rounded-2xl md:rounded-3xl lg:rounded-4xl ">
        {banner.image ? (
          <Image
            className={`  relative w-full h-auto lg:w-auto lg:h-full rounded-[inherit]`}
            src={banner.image}
            as="image"
            fill
            priority={banner.id === 1}
            sizes="(min-width: 180px), 80vw, 100vw"
            alt={banner.badge01}
            style={{
              objectFit: 'cover',
              animationDuration: `${4000 + 5000}ms`,
            }}
          />
        ) : (
          <ImageMissing />
        )}
      </div>

      <div className=" absolute w-full  h-full px-6 flex flex-col items-start justify-center  xs:gap-1 lg:gap-4 xl:gap-6 ">
        <span
          className={` bg-PrimaryDark text-Black  px-2 py-0.5 text-[0.5rem] xs:text-xs md:text-sm uppercase font-oswaldMed`}
        >
          {banner.badge01}
        </span>
        <div className=" w-2/3 max-w-[200px] md:max-w-[260px] lg:max-w-[300px] h-fit ">
          <p
            className={
              '  mb-2 uppercase font-oswaldSemBold  pointer-events-none cursor-default flex flex-col  xsm:gap-2 sm:gap-4 text-pretty text-base xs:text-xl md:text-2xl lg:text-3xl text-White text-left  '
            }
          >
            <span className=" text-base xs:text-lg xs:leading-5 sm:text-xl sm:leading-5 md:leading-6 lg:text-2xl xl:text-3xl">
              {banner.text01}
            </span>
            <span className=" text-xl xs:text-2xl xs:leading-6 sm:text-3xl sm:leading-7 md:leading-8 lg:text-4xl lg:leading-10 xl:text-5xl xl:leading-[3.5rem] font-oswaldItalic text-Primary ">
              {banner.textHighlighted}
            </span>
            {banner.text02.length > 0 && <span>{banner.text02}</span>}
            <span
              className={` mt-1 xs:mt-3 xl:mt-8 bg-PrimaryDark text-Black  w-fit px-2 xs:px-5 xs:py-1 text-[0.5rem] xs:text-xs md:text-sm uppercase font-oswaldMed rounded-full`}
            >
              {banner.badge02}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
