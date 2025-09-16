'use client'
import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import parse from 'html-react-parser'
import { useState, useEffect } from 'react'
import { searchData } from '@/services/api-content'

import { SearchIcon } from '@/utils/icons'
import { Trash2, Loader2 } from 'lucide-react'

export default function SearchBar({
  isVisible,
  resultsOrientation = 'bottom',
}) {
  const [inputValue, setInputValue] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!searchTerm) return
    searchData(searchTerm).then((results) => {
      const resCleaned = results.map((res) => ({
        id: res.id,
        title: res.title.rendered,
      }))
      setResults(resCleaned)
    })
  }, [searchTerm])

  useEffect(() => {
    setInputValue('')
    setSearchTerm('')
    setResults([])
  }, [pathname])

  function handleChange(e) {
    e.preventDefault()
    setInputValue(e.target.value)
    setSearchTerm(e.target.value)
  }

  function handleSearch(e) {
    e.preventDefault()
    setSearchTerm(inputValue)
  }

  function handleDelete() {
    setInputValue('')
    setSearchTerm('')
  }

  function handleClick(id) {
    setInputValue('')
    setSearchTerm('')
    setResults([])
    router.push(`/${id}`)
  }

  return (
    <div className=" z-50 w-2/3 max-w-[400px] lg:max-w-[550px] h-fit min-h-10 flex justify-center pointer-events-auto ">
      <form action="" className=" relative w-full ">
        <input
          className={` relative w-full pl-6 py-1 text-sm md:text-base font-light border-White bg-Black text-White border-solid border-2 rounded-lg 
                outline-none focus:border-Primary placeholder:text-PrimaryDark `}
          type="text"
          name="search"
          id="search"
          placeholder="Buscar"
          value={inputValue}
          onChange={(e) => handleChange(e)}
        />
        {inputValue.length !== 0 && results.length === 0 ? (
          <div className="absolute top-0 right-0 p-2 w-10 h-full flex items-center animate-spin">
            <Loader2 color={'#cbeb37'} width="100%" height="100%" />
          </div>
        ) : (
          <button
            aria-label="submit search"
            onClick={handleSearch}
            className=" absolute w-10 top-0 right-2 p-2 h-full flex items-center  "
          >
            <SearchIcon />
          </button>
        )}
        {inputValue.length !== 0 && (
          <button
            onClick={handleDelete}
            className=" absolute  top-0 right-10 w-10 h-full p-2 flex items-center  "
          >
            <Trash2 color="white" width="100%" height="100%" />
          </button>
        )}
      </form>
      {results.length > 0 && inputValue && (
        <div
          className={`${isVisible ? '' : '  -translate-y-full '} ${
            resultsOrientation === 'bottom' ? 'top-32' : ' bottom-24 '
          } -z-10 absolute mt-2 md:mt-0 md:bottom-20  w-[90%] md:max-w-lg lg:max-w-xl h-fit transition-all duration-200 ease-in-out bg-DarkGray shadow-lg backdrop-filter backdrop-blur-xl ring-1 ring-gray-600  border-Primary  border-solid border-2 rounded-xl`}
        >
          <ul className=" w-full h-fit p-2 py-0">
            {results?.map((result) => (
              <li
                key={result.id}
                className="w-full my-3 px-2 py-0 md:py-1 bg-Primary hover:bg-PrimaryDark/90 transition-all duration-200 ease-in-out text-Black rounded-lg"
              >
                <button
                  onClick={() => handleClick(result.id)}
                  className=" w-full h-full  hover:cursor-pointer "
                >
                  <span className="line-clamp-1 text-left font-oswaldReg text-sm md:text-lg lg:text-xl">
                    {parse(result.title)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
