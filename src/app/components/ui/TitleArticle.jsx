export function TitleArticle({ title, icon }) {
  const Icon = icon
  return (
    <h2 className=" pl-4 flex items-center justify-start md:justify-center gap-1 md:gap-2 md:text-xl lg:text-2xl text-White">
      <div className=" w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10">
        <Icon width={'100%'} height={'100%'} />
      </div>
      <span className=" border-b-4 leading-5 md:leading-6 lg:leading-7 border-b-Primary">
        {title}
      </span>
    </h2>
  )
}