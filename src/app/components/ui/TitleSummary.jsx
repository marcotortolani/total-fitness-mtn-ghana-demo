export function TitleSummary({ title, colorText = 'text-Primary' }) {
  return (
    <h2
      className={`${colorText} tracking-widest font-oswaldLight text-left w-full text-sm md:text-xl lg:text-2xl`}
    >
      {title}
    </h2>
  )
}
