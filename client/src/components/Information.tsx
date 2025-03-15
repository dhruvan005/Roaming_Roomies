import React from 'react'
import people from '../assets/people12.png'

export default function Information() {
  return (
    <div className='grid md:grid-cols-2 grid-cols-1 gap-4 bg-gray-200 p-4'>
        <div className='flex flex-col items-center  p-4 gap-3'>
            <h1 className='text-2xl font-bold'>How it works</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis asperiores labore, ullam delectus dolore accusamus exercitationem iure deserunt assumenda laboriosam laborum magni aliquid obcaecati?</p>
        </div>
        <div className='max-w-40vw'>
            <img src={people} alt="" />
        </div>
    </div>
  )
}
