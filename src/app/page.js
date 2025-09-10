import dynamic from 'next/dynamic'
import Loading from './components/skeleton/Loading'

import { SectionMuscularGroups } from './components/home/SectionMuscularGroups'

const SliderHomeCover = dynamic(
  () => import('./components/home/SliderHomeCover'),
  {
    loading: () => <Loading />,
  },
)

const Trainers = dynamic(() => import('./components/home/Trainers'), {
  loading: () => <Loading />,
})

const SectionTrainersRoutines = dynamic(
  () => import('./components/home/SectionTrainersRoutines'),
  {
    loading: () => <Loading />,
  },
)

const SectionZumba = dynamic(() => import('./components/home/SectionZumba'), {
  loading: () => <Loading />,
})

const SectionNutrition = dynamic(
  () => import('./components/home/SectionNutrition'),
  {
    loading: () => <Loading />,
  },
)
const SectionPreTraining = dynamic(
  () => import('./components/home/SectionPreTraining'),
  {
    loading: () => <Loading />,
  },
)
const SectionShorts = dynamic(() => import('./components/home/SectionShorts'), {
  loading: () => <Loading />,
})

export default async function Home() {
  return (
    <main className=" z-0 relative overflow-x-hidden w-full top-[4.5rem] md:top-[6rem] lg:top-[8rem] px-4 flex flex-col items-center gap-4 ">
      <SliderHomeCover />
      <Trainers />
      <SectionTrainersRoutines />
      <SectionMuscularGroups />
      <SectionPreTraining />
      <SectionZumba />
      <SectionShorts />
      <SectionNutrition />
      {/* <SectionHealthyLife  /> */}
      {/* <SectionRecommended /> */}
      {/* <SectionSports /> */}
      {/* <ColectionsSeries title="VIDA SALUDABLE" cat='healthy-lifestyle' /> */}
      {/* <ColectionsSeries title="Descubre Deportes" cat="sports" /> */}
      <div className="w-full h-[6rem] md:h-[10rem] "></div>
    </main>
  )
}
