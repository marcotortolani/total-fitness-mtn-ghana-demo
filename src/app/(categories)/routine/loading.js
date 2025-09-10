import dictionary from '@/dictionary/lang.json'

export default function Page() {
  return (
    <div className=" w-full h-screen bg-DarkGray flex items-center justify-center ">
      <div className=" rounded-2xl  uppercase text-Primary text-3xl font-oswaldSemBold w-2/3 max-w-lg aspect-video flex items-center justify-center">
        {dictionary['Loading...']}
      </div>
    </div>
  )
}
