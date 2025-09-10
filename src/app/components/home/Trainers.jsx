import Image from 'next/image'
import Link from 'next/link'
import { TitleSummary } from '../ui/TitleSummary'
import dictionary from '@/dictionary/lang.json'

import trainer01 from '/public/assets/img/entrenador4.webp'
import trainer02 from '/public/assets/img/entrenador3.webp'
import trainer03 from '/public/assets/img/entrenador2.webp'
import trainer04 from '/public/assets/img/entrenador1.webp'

export default function Trainers() {
  return (
    <section className=" z-50  w-screen md:w-full lg:max-w-screen-lg min-[1760px]:max-w-screen-xl px-3 flex flex-col items-start gap-2 xl:gap-3 relative top-0 ">
      <div className=" pl-1 md:pl-2 ">
        <TitleSummary
          title={dictionary['Our trainers']}
          colorText="text-white"
        />
      </div>
      <div className=" w-full h-fit grid grid-cols-4 grid-rows-1 gap-2 md:gap-4 lg:gap-6 min-[1760px]:gap-10">
        <Trainer
          name="Carlos"
          image={trainer01}
          position={dictionary['Cardio']}
          href="/trainers/carlos"
        />
        <Trainer
          name="Elena"
          image={trainer02}
          position={dictionary['Aerobic']}
          href="/trainers/elena"
        />
        <Trainer
          name="Leo"
          image={trainer03}
          position={dictionary['Running']}
          href="/trainers/leo"
        />
        <Trainer
          name="Carolina"
          image={trainer04}
          position={dictionary['Nutrionist']}
          href="/trainers/carolina"
        />
      </div>

      <div className=" mx-auto mt-2 h-fit">
        <Link
          href="/trainers"
          className="  lowercase bg-Primary text-neutral-900 hover:bg-PrimaryDark hover:text-neutral-700 rounded-full px-4 font-oswaldLight md:text-lg lg:text-xl"
        >
          {dictionary['See all']}
        </Link>
      </div>
    </section>
  )
}

export const Trainer = ({ href, name, position, image }) => {
  return (
    <Link
      href={href}
      className="group w-full h-fit aspect-square flex flex-col items-center gap-0.5"
    >
      <div className=" w-full h-full rounded-lg overflow-hidden ">
        <Image
          className={` relative object-cover h-full aspect-square group-hover:scale-110 transition-all duration-500 ease-in-out`}
          src={image}
          as="image"
          // sizes="(min-width: 180px), 80vw, 100vw"
          alt={`${dictionary['Trainer']} ${name} - ${position}`}
        />
      </div>
      <p className=" text-center text-White/80 text-xs md:text-sm lg:text-base xl:text-lg font-oswaldReg">
        {name}
      </p>
      <p className=" text-center font-oswaldLight uppercase text-xs md:text-sm lg:text-base text-Primary">
        {position}
      </p>
    </Link>
  )
}
