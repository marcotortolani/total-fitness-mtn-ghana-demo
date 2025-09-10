import React from 'react'

const colorSet = {
  white: 'bg-White',
  black: 'bg-Black',
  default: 'bg-Primary',
  defaultLight: 'bg-Primary bg-opacity-50',
}

const sizeSet = {
  xs: 'h-[0.1rem]',
  sm: 'h-[0.15rem]',
  md: 'h-[0.2rem]',
}

const marginSet = {
  none: 'my-0',
  default: 'my-2',
}

export default function HorizontalLine({
  color = 'default',
  size = 'md',
  margin = 'default',
}) {
  return (
    <div className=" w-full h-fit">
      <span
        className={`w-full ${sizeSet[size]} h-6 ${marginSet[margin]} ${colorSet[color]} line-clamp-1 content-normal`}
      />
    </div>
  )
}
