'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

const StartReading = () => {
  const [activeButton, setActiveButton] = useState(null)

  const handleClick = (type) => {
    setActiveButton(type)
  }

  return (
    <div className='flex flex-col w-screen mt-30 box-border justify-center items-center gap-y-10'>

      <Link href={'bible/old-testament'} className='w-3/4 md:w-1/2'>
        <Button
          onClick={() => handleClick("old")}
          disabled={activeButton === "old"}
          variant="secondary"
          className="w-full text-2xl md:text-4xl py-15 md:py-20 flex flex-col"
        >
          {activeButton === "old" ? (
            "Loading..."
          ) : (
            <>
              <span className="urdu">عہد نامہ عتیق</span>
              <span>Old Testament</span>
            </>
          )}
        </Button>
      </Link>

      <Link href={'bible/new-testament'} className='w-3/4 md:w-1/2'>
        <Button
          onClick={() => handleClick("new")}
          disabled={activeButton === "new"}
          variant="secondary"
          className="w-full text-2xl md:text-4xl py-15 md:py-20 flex flex-col"
        >
          {activeButton === "new" ? (
            "Loading..."
          ) : (
            <>
              <span className='urdu'>عہد نامہ جدید</span>
              <span className='py-3'>New Testament</span>
            </>
          )}
        </Button>
      </Link>

      <Link href="/" className='underline text-sm md:text-md'>Go to Homepage</Link>
    </div>
  )
}

export default StartReading