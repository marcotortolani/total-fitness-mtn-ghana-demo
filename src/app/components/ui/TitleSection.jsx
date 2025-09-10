export function TitleSection({ icon, title, outline, borderColor }) {
  const Icon = icon
  return (
    <h2
      className={` ${
        outline
          ? 'px-4 py-[0.1rem] md:py-[0.18rem] lg:py-1  bg-Black uppercase font-medium text-lg md:text-xl lg:text-2xl gap-3 border-2 rounded-full'
          : ' text-xl md:text-2xl lg:text-3xl gap-2'
      } ${borderColor} flex items-center justify-center  text-White `}
    >
      <div
        className={`${
          outline
            ? 'w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 '
            : 'w-7 h-7 md:w-9 md:h-9 lg:w-10 lg:h-10'
        } `}
      >
        <Icon width={'100%'} height={'100%'} />
      </div>
      <span
        className={`${
          outline
            ? ' border-none'
            : 'border-b-4 md:border-b-[5px] leading-6 md:leading-[1.8rem] lg:leading-[2.2rem] border-b-Primary'
        } `}
      >
        {title}
      </span>
    </h2>
  )
}
