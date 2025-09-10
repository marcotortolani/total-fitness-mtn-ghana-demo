'use-client'
import Image from 'next/image'
import nameIcon from '../../../../public/assets/icons/perfilado/name-icon.webp'
import dateIcon from '../../../../public/assets/icons/perfilado/fecha-icon.webp'
import PropTypes from 'prop-types'
import { useUserStore } from '@/lib/user/user-stores'

import dictionary from '@/dictionary/lang.json'

const RoutineUserScreen = ({ onHandleSuccess }) => {
  const { user, update } = useUserStore()

  return (
    <section
      className="w-full px-4 pt-4 pb-14 bg-DarkGray"
      style={{ height: '90vh' }}
    >
      <div
        className={`w-full h-full px-4 flex flex-col items-center justify-evenly transition-all duration-150 ease-in-out`}
      >
        <div className=" w-4/5 flex flex-col items-center gap-2 ">
          <h2 className=" text-White uppercase text-3xl font-oswaldSemBold leading-8 text-center">
            {dictionary["Let's start creating your"]}{' '}
            <span className=" text-Primary">
              {dictionary['personalized routine']}
            </span>
            .
          </h2>
          <p className=" text-White font-oswaldLight uppercase text-xl text-center">
            {dictionary['Tell us a little about yourself']}
          </p>
        </div>
        <div className=" w-full px-2 flex flex-col items-center gap-4">
          <div className=" relative w-full p-2 bg-White rounded-xl flex items-center ">
            <Image
              className=" w-14 h-12 border-r-[1px] border-r-Primary pr-2"
              src={nameIcon}
              alt="icon"
            />
            <input
              className=" w-full h-full focus:ring-0 pl-6 uppercase font-oswaldReg placeholder:font-oswaldLight placeholder:text-LightGray border-none"
              type="text"
              name="name"
              placeholder={dictionary['Input your name']}
              maxLength={24}
              value={user.name}
              onChange={(e) => update({ name: e.target.value })}
            />
          </div>

          <div className=" relative w-full p-2 bg-White rounded-xl flex items-center ">
            <div className=" h-full border-r-[1px] border-r-Primary pr-2">
              <Image className=" w-14 h-12 " src={dateIcon} alt="icon" />
            </div>
            <div className=" group relative w-full h-full">
              <input
                type="date"
                name="birth"
                placeholder={dictionary['Birthday']}
                value={user.birth}
                onChange={(e) => update({ birth: e.target.value })}
                className={` ${
                  user.birth ? 'w-fit' : 'w-full'
                }  peer uppercase text-left flex justify-start  font-oswaldReg px-6 left-0  placeholder:text-LightGray text-Black h-full focus:ring-0  border-none`}
              />
              <label
                className={`absolute top-0 left-0 px-6 uppercase text-left font-oswaldLight h-full flex items-center bg-White text-LightGray pointer-events-none
        ${user.birth ? 'hidden' : 'block'}
        peer-focus:hidden`}
              >
                {dictionary['Birthday']}
              </label>
            </div>
          </div>
        </div>

        <button
          type="button"
          disabled={!user.name}
          className={` disabled:bg-LightGray disabled:text-DarkGray bg-Primary uppercase font-oswaldSemBold tracking-widest text-2xl px-8 py-1 rounded-full transition`}
          onClick={onHandleSuccess}
        >
          {dictionary['Continue']}
        </button>
      </div>
    </section>
  )
}

RoutineUserScreen.propTypes = {
  onHandleSuccess: PropTypes.func.isRequired,
}

export default RoutineUserScreen
