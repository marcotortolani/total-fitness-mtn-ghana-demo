'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Pagination({ path, page, pages = 1 }) {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(parseInt(pages))

  function handlePagination(page) {
    if (page === currentPage) return
    router.push(`${path}/${page}`)
  }

  useEffect(() => {
    setCurrentPage(parseInt(page))
  }, [])

  return (
    <div className="  w-full mt-6 px-4 flex items-center justify-center gap-1 xs:gap-2">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          className={`${
            currentPage === index + 1 ? 'bg-Secondary' : 'bg-gray-100'
          } w-5 h-5 text-xs aspect-square xs:w-6 xs:h-6 xs:text-sm rounded-full text-Black`}
          key={index + 1}
          onClick={() => handlePagination(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  )
}
