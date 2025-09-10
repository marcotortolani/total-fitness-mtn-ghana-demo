'use client'
import { useRouter } from 'next/navigation'
import { TitleSummary } from '../ui/TitleSummary'
import dictionary from '@/dictionary/lang.json'

import ChestInactive from '/public/assets/icons/pecho-inactivo.svg'
import ChestActive from '/public/assets/icons/pecho-activo.svg'
import ArmsActive from '/public/assets/icons/hombros-brazos-activo.svg'
import ArmsInactive from '/public/assets/icons/hombros-brazos-inactivo.svg'
import LegsActive from '/public/assets/icons/gluteos-piernas-activo.svg'
import LegsInactive from '/public/assets/icons/gluteos-piernas-inactivo.svg'
import AbsActive from '/public/assets/icons/abs-activo.svg'
import AbsInactive from '/public/assets/icons/abs-inactivo.svg'

import Image from 'next/image'
export function SectionMuscularGroups() {
  return (
    <section className=" z-50  w-screen md:w-full max-w-screen-xl h-fit mt-2 relative top-0 px-4 md:px-0 xl:px-2 md:my-4 lg:my-6 xl:my-8 ">
      <div className=" mb-2 col-span-2 ">
        <TitleSummary title={dictionary['Workout routines by muscle group']} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-4 lg:gap-6 ">
        <ButtonMusc
          name={dictionary['Chest']}
          href="/training/chest"
          iconActive={ChestActive}
          iconInactive={ChestInactive}
        />
        <ButtonMusc
          name={dictionary['Arms & Shoulders']}
          href="/training/arms-and-shoulders"
          iconActive={ArmsActive}
          iconInactive={ArmsInactive}
        />
        <ButtonMusc
          name={dictionary['Glutes & Legs']}
          href="/training/glutes-and-legs"
          iconActive={LegsActive}
          iconInactive={LegsInactive}
        />
        <ButtonMusc
          name={dictionary['Abs']}
          href="/training/abs"
          iconActive={AbsActive}
          iconInactive={AbsInactive}
        />
      </div>
    </section>
  )
}

const ButtonMusc = ({ name, href, active, iconActive, iconInactive }) => {
  const router = useRouter()
  const icon = active ? iconActive : iconInactive

  return (
    <button
      className={` ${
        active ? '   ' : '   '
      } relative col-span-1 flex flex-col items-center gap-2 px-6 py-2 bg-gradient-to-br  from-LightGray to-LightGray/60 hover:from-PrimaryDark hover:to-PrimaryDark/50 hover:shadow-lg hover:shadow-black/70  hover:scale-105 scale-100 transition-all duration-300 ease-in-out rounded-xl shadow-md shadow-black/70 `}
      type="button"
      onClick={() => router.push(href)}
    >
      <Image src={icon} alt={`${name} icon`} />
      <span className="  text-sm md:text-lg lg:text-2xl font-oswaldMed  text-DarkGray uppercase">
        {name}
      </span>
    </button>
  )
}
