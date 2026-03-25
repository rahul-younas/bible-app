import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
const StartReading = () => {
    return (
        <div className='flex flex-col w-screen mt-30 box-border justify-center items-center gap-y-10'>
            <Link href={'bible/old-testament'} className='w-3/4 md:w-1/2'>
                <Button variant='secondary' className={'w-full text-2xl md:text-4xl py-15 md:py-20 flex flex-col'}>
                    <span className='urdu'>عہد نامہ عتیق</span>
                    <span>Old Testament</span>
                </Button>
            </Link>
            <Link href={'bible/new-testament'} className='w-3/4 md:w-1/2'>
                <Button variant='secondary' className={'w-full text-2xl md:text-4xl py-15 md:py-20  flex flex-col'}>
                    <span className='urdu'>عہد نامہ جدید</span>
                    <span className=' py-3'>New Testament</span>
                </Button>
            </Link>
            <Link href="/" className='underline text-lg'>Go to Homepage</Link>
        </div>
    )
}

export default StartReading