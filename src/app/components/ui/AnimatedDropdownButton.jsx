'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDownIcon } from 'lucide-react'

const AnimatedDropdown = ({ selected, options, onChange }) => {
  const [open, setOpen] = useState(false)
  const optionSelected = options?.find((option) => option.value === selected)

  return (
    <motion.div
      animate={open ? 'open' : 'closed'}
      className="relative w-full max-w-[400px] md:w-1/2 my-2"
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`${
          optionSelected?.value !== '' ? 'bg-Primary' : 'bg-LightGray'
        } w-full h-fit flex items-center justify-between px-2 pl-4 py-1 rounded-lg border-none transition-colors duration-200 ease-in-out`}
      >
        <span className="font-light uppercase text-[0.6rem] xs:text-sm md:text-base lg:text-lg">
          {optionSelected?.label}
        </span>
        <motion.span className="  w-5 xs:w-6" variants={iconVariants}>
          <ChevronDownIcon
            width={'100%'}
            className={`${
              optionSelected?.value !== '' ? 'text-DarkGray' : 'text-White'
            }`}
          />
        </motion.span>
      </button>

      <motion.ul
        initial={wrapperVariants.closed}
        variants={wrapperVariants}
        style={{ originY: 'top', translateX: '-50%' }}
        className="-z-10  flex flex-col gap-2  px-4 pt-6 mt-1 rounded-lg bg-White absolute top-[100%] left-[50%] w-full overflow-hidden"
      >
        {options.map((option, i) => {
          if (i > 0) {
            return (
              <Option
                key={i}
                lastOption={i === options.length - 1}
                setOpen={() => {
                  onChange(option.value)
                  setOpen(false)
                }}
                text={option.label}
                optionActive={false}
              />
            )
          } else {
            return null
          }
        })}
      </motion.ul>
    </motion.div>
  )
}

const Option = ({ firstOption, lastOption, text, setOpen, optionActive }) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => setOpen(false)}
      className={`${
        optionActive
          ? 'bg-Primary text-White justify-center absolute left-0 translate-x-[50%]'
          : firstOption
          ? ' text-white bg-Black font-normal justify-center absolute left-0 translate-x-[50%] h-8 md:h-10 lg:h-12  '
          : ' bg-transparent text-black '
      } ${!lastOption && ' border-b-[1px] border-b-LightGray/50 pb-2'}
      relative -top-3 md:-top-2 flex items-center w-full text-xs xs:text-sm md:text-base lg:text-lg font-oswaldLight whitespace-nowrap uppercase  hover:pl-1 transition-all duration-200 ease-in-out cursor-pointer`}
    >
      <motion.span className=" hover:bg-LightGray/40 hover:px-2 py-1 rounded-lg transition-all duration-200 ease-in-out">
        {text}
      </motion.span>
    </motion.li>
  )
}

export default AnimatedDropdown

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.1,
    },
  },
}

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
}

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: 'beforeChildren',
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: 'afterChildren',
    },
  },
}
