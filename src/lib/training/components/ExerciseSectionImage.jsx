'use client'
import { useParams } from 'next/navigation'
import ChestInactive from '../../../../public/assets/icons/pecho-inactivo.svg'
import ArmsInactive from '../../../../public/assets/icons/hombros-brazos-inactivo.svg'
import LegsInactive from '../../../../public/assets/icons/gluteos-piernas-inactivo.svg'
import AbsInactive from '../../../../public/assets/icons/abs-inactivo.svg'
import Image from 'next/image'

export const ExerciseSectionImage = ({ groupProp = '' }) => {
  const params = useParams()
  const { group } = params

  function getGroupImage() {
    let key = '',
      src = ''
    if (group !== '' && group !== undefined) {
      key = group
    } else {
      key = groupProp
    }

    switch (key) {
      case 'chest':
        src = ChestInactive
        break
      case 'arms-and-shoulders':
        src = ArmsInactive
        break
      case 'glutes-and-legs':
        src = LegsInactive
        break
      case 'abs':
        src = AbsInactive
        break
    }
    return src
  }

  return (
    <Image
      src={getGroupImage()}
      alt={`Muscle Group Image`}
      className="w-2/3  max-h-[120px] md:max-h-[220px] my-4"
    />
  )
}
