import ShareSocialMedia from '@/app/components/page-post/ShareSocialMedia'
import SliderRecommended from '@/app/components/page-post/SliderRecommended'
import { Trainer } from '@/app/components/home/Trainers'

import dictionary from '@/dictionary/lang.json'

import trainer01 from '/public/assets/img/entrenador4.webp'
import trainer02 from '/public/assets/img/entrenador3.webp'
import trainer03 from '/public/assets/img/entrenador2.webp'
// import trainer04 from '/public/assets/img/entrenador1.webp'
import { CATEGORIES } from '@/lib/constants'
import { getNewData } from '@/services/api-content'

export default async function Page() {
  const categoriesReq = [CATEGORIES['nutrition'], CATEGORIES['zumba']]
  const { data } = await getNewData(
    `/posts?per_page=14&categories=${categoriesReq}`,
  )

  // const { data: trainers } = await getNewData(
  //   `/categories?per_page=50&parent=${CATEGORIES['trainers']}`,
  // )

  return (
    <main
      className={`z-20 mt-12 mb-10 md:mt-14 md:mb-24 lg:mt-20 w-screen max-w-screen-xl h-full min-h-fit px-3 pt-0 text-White flex flex-col items-center gap-4 md:rounded-xl`}
    >
      <div className="z-50 top-0 m-0 right-0 w-full h-10 flex items-center justify-end gap-3">
        <h1
          className={
            ' w-full uppercase font-oswaldSemBold pointer-events-none cursor-default text-xl md:text-2xl lg:text-3xl text-White text-left  '
          }
        >
          {dictionary['Trainers']}
        </h1>
        <ShareSocialMedia title={dictionary['Trainers']} category="trainers" />
      </div>
      <div className=" w-full h-fit grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        <Trainer
          name="Omar"
          image={trainer01}
          position={dictionary['Cardio']}
          href="/trainers/omar"
        />
        <Trainer
          name="Jibby"
          image={trainer02}
          position={dictionary['Aerobic']}
          href="/trainers/jibby"
        />
        <Trainer
          name="Samir Aboudou"
          image={trainer03}
          position={dictionary['Running']}
          href="/trainers/samir-aboudou"
        />
        {/* <Trainer
          name="Carolina"
          image={trainer04}
          position={dictionary['Nutrionist']}
          href="/trainers/carolina"
        /> */}
      </div>

      <SliderRecommended posts={data} />
      <div className="w-full h-10 md:h-20"></div>
    </main>
  )
}
