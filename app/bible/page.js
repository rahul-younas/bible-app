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
    <div className='flex flex-col w-screen my-25 box-border justify-center items-center gap-y-10'>

      <Link href={'bible/old-testament'} className='w-3/4 md:w-1/2'>
        <Button
          onClick={() => handleClick("old")}
          disabled={activeButton === "old"}
          variant="secondary"
          className="w-full text-xl md:text-3xl py-15 md:py-20 flex flex-col"
        >
          {activeButton === "old" ? (
            "Loading..."
          ) : (
            <>
              <span className='font-bold'>Old Testament</span>
              <span className="urdu font-bold">عہد نامہ عتیق</span>
            </>
          )}
        </Button>
      </Link>

      <Link href={'bible/new-testament'} className='w-3/4 md:w-1/2'>
        <Button
          onClick={() => handleClick("new")}
          disabled={activeButton === "new"}
          variant="secondary"
          className="w-full text-xl md:text-3xl py-15 md:py-20 flex flex-col"
        >
          {activeButton === "new" ? (
            "Loading Scriptures..."
          ) : (
            <>
              <span className='font-bold'>New Testament</span>
              <span className='urdu font-bold'>عہد نامہ جدید</span>
            </>
          )}
        </Button>
      </Link>
    </div>
  )
}

export default StartReading