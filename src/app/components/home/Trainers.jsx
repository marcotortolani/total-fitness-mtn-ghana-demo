import Image from 'next/image'
import Link from 'next/link'
import { TitleSummary } from '../ui/TitleSummary'
import dictionary from '@/dictionary/lang.json'

import { getNewData } from '@/services/api-content'
import { CATEGORIES } from '@/lib/constants'

export default async function Trainers() {
  const { data: trainers } = await getNewData(
    `/categories?per_page=50&parent=${CATEGORIES['trainers']}`,
  )

  if (trainers.length === 0) {
    return null
  }

  return (
    <section className=" z-50  w-screen md:w-full lg:max-w-screen-lg min-[1760px]:max-w-screen-xl px-3 flex flex-col items-start gap-2 xl:gap-3 relative top-0 ">
      <div className=" pl-1 md:pl-2 ">
        <TitleSummary
          title={dictionary['Our trainers']}
          colorText="text-white"
        />
      </div>
      <div className=" w-full h-fit grid grid-cols-3 grid-rows-1 gap-2 md:gap-4 lg:gap-6 min-[1760px]:gap-10">
        {trainers &&
          trainers.map((trainer) => (
            <Trainer
              key={trainer.id}
              name={trainer.name}
              image={trainer?.image}
              href={`/trainers/${trainer.slug}`}
            />
          ))}
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
        {image?.length ? (
          <Image
            className={` relative object-cover w-full h-full aspect-square group-hover:scale-110 transition-all duration-500 ease-in-out`}
            src={image}
            as="image"
            width={200}
            height={200}
            alt={`${dictionary['Trainer']} ${name} - ${position}`}
          />
        ) : (
          <Image
            className={` border-neutral-400 border relative object-cover w-full h-full p-10 aspect-square group-hover:scale-110 transition-all duration-500 ease-in-out rounded-xl`}
            src="/assets/favicon-totalfitness.webp"
            as="image"
            width={200}
            height={200}
            alt={`${dictionary['Trainer']} ${name} - ${position}`}
          />
        )}
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
