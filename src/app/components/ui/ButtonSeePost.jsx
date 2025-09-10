import React from 'react';
import Link from 'next/link';

const styles = {
  gradient:
    'text-White font-semibold bg-gradient-to-r from-[#39E2FF] via-purple-500 to-[#F51341] ',
  outlineSky:
    ' bg-Black text-White font-medium border-solid border-2 border-Secondary hover:bg-Secondary  ',
  outlineViolet:
    ' bg-Black text-White font-medium border-solid border-2 border-Primary hover:bg-Black/60  ',
};

const sizes = {
  xs: 'text-sm px-5 py-1 md:px-5 lg:px-6 lg:py-2 md:text-base lg:text-lg',
  sm: 'px-8 py-0 lg:px-6 lg:py-2 text-sm',
  md: 'text-lg px-8 py-0 md:text-xl md:py-1',
  default: 'px-1 py-0',
};

export default function ButtonSeePost({ text, href, style, size }) {
  return (
    <Link
      className={`${sizes[size]} ${styles[style]} uppercase text-center transition-all duration-200 ease-in-out rounded-full hover:cursor-pointer`}
      href={href}
    >
      {text}
    </Link>
  );
}
