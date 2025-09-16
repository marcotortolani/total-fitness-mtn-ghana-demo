import React from 'react'
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import parse from 'html-react-parser'

const poppins = Poppins({
  subsets: ['latin'],
  style: 'normal',
  weight: ['400', '500', '600'],
  display: 'swap',
  fallback: ['sans-serif'],
})

export default function StyledElements({ el }) {
  switch (el.type) {
    case 'titulo':
      return <Title content={el.content} />
    case 'bajada':
      return <Bajada content={el.content} />
    case 'img-destacada':
      return <FeaturedImage image={el.content} />
    case 'imagen':
      return <FeaturedImage image={el.content} />
    case 'paragraph':
      if (el.content.length > 0 && el.content !== '&nbsp;')
        return <Paragraph content={el.content} />
      break
    case 'destacado-1':
      return <Destacado color="primary" content={el.content} />
    case 'destacado-2':
      return <Destacado color="secondary" content={el.content} />
    case 'lista':
      return <List el={el} />
    default:
      break
  }
}

function Title({ content }) {
  return <h2 className=" font-semibold text-2xl">TITULO: {parse(content)}</h2>
}

function Bajada({ content }) {
  let contentStyled
  if (content.includes('<span')) {
    contentStyled = content.replace(
      /<span>/,
      '<span class="text-Primary font-semibold">',
    )
  } else {
    contentStyled = content
  }
  return (
    <p
      className={
        poppins.className +
        ' w-full font-normal text-left text-base md:text-lg lg:text-xl text-White '
      }
    >
      {parse(contentStyled)}
    </p>
  )
}

function FeaturedImage({ image }) {
  return (
    <div className=" relative w-full aspect-video">
      <Image
        className=" w-full h-auto object-center object-cover rounded-md md:rounded-lg lg:rounded-xl"
        fill
        src={image}
        alt="Imágen destacada"
      />
    </div>
  )
}

function Paragraph({ content }) {
  const spanCount = (content.match(/<span>/g) || []).length

  if (spanCount >= 2) {
    let spanIndex = 0
    content = content.replace(/<span>/g, (match) => {
      spanIndex++
      return spanIndex === 2 ? '</span>' : match
    })
  }

  let contentStyled
  if (content.includes('<span')) {
    contentStyled = content.replace(
      /<span>/,
      '<span class="text-Primary font-medium">',
    )
  } else {
    contentStyled = content
  }
  return (
    <p
      className={
        poppins.className +
        ' font-normal text-[13px] md:text-[15px] lg:text-[17px] text-White'
      }
    >
      {parse(contentStyled)}
    </p>
  )
}

function Destacado({ color, content }) {
  return (
    <h2
      className={`${
        color === 'primary' ? 'bg-Primary' : 'bg-SecondaryDarker'
      } w-screen md:max-w-full px-6 py-4 font-oswaldItalic  text-White text-base md:text-lg lg:text-2xl`}
    >
      {parse(content)}
    </h2>
  )
}

function List({ el }) {
  return (
    <ul
      className={
        poppins.className +
        ' flex flex-col gap-2 font-normal text-sm md:text-base lg:text-lg'
      }
    >
      {el?.content.map((item, j) => (
        <li
          key={j}
          // className={' text-sm md:text-base lg:text-lg'}
        >
          <h4 className=" font-bold uppercase text-Primary">
            {parse(item.title)}
          </h4>
          <p>{parse(item.content)}</p>
        </li>
      ))}
    </ul>
  )
}
