import Image from 'next/image'
import Link from 'next/link'
import { TitleSummary } from '../ui/TitleSummary'

import destacada01 from '/public/assets/img/destacada-6.webp'

export default function ColectionsSeries({ title, cat }) {
  return (
    <section className=" z-50  w-screen md:w-full lg:max-w-screen-lg px-3 flex flex-col items-start overflow-hidden h-fit relative top-0 ">
      <div className=" mb-2 ">
        <TitleSummary title={`Colecciones - Series - ${title}`} />
      </div>
      <div className=" w-full h-full grid grid-cols-2 gap-2">
        <Colection name="Fitness y Meditación" image={destacada01} href="/" />
        <Colection name="Fitness y Meditación" image={destacada01} href="/" />
        <Colection name="Fitness y Meditación" image={destacada01} href="/" />
        <Colection name="Fitness y Meditación" image={destacada01} href="/" />
      </div>

      <button
        type="button"
        className=" mx-auto mt-4 lowercase bg-Primary rounded-full px-4 font-oswaldLight"
      >
        Ver todas
      </button>
    </section>
  )
}

const Colection = ({ href, name, image }) => {
  return (
    <Link href={href} className="w-full h-full flex flex-col gap-0.5">
      <Image
        className={`  relative object-cover h-full aspect-video rounded-xl`}
        src={image}
        as="image"
        // sizes="(min-width: 180px), 80vw, 100vw"
        alt="Entrenador uno - CARDIO"
      />
      <p className=" text-left text-White/80 text-xs font-oswaldReg">{name}</p>
    </Link>
  )
}
