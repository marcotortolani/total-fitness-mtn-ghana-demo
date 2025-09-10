import Link from 'next/link'
import React from 'react'

export default function SubscribeCard() {
  return (
    <div className=" mx-4 sm:mx-auto max-w-[400px] flex flex-col items-center gap-6 mt-40 mb-20 p-6 bg-Primary text-White rounded-lg shadow-xl">
      <p className=" px-4 text-center">
        Este contenido está bloqueado, es necesario suscribirse.
      </p>
      <Link
        href={'http://dinamic.ve.movistar.teamgamers.club/landing/'}
        target="_blank"
        className=" font-semibold px-4 py-2 bg-Details rounded-lg"
      >
        Suscribirme
      </Link>
    </div>
  )
}
