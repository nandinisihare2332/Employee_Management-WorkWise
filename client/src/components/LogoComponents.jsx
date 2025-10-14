import React from 'react'
import { Link } from 'react-router-dom'

const LogoComponents = () => {
  return (
    <>
    <Link to={"/"} className='flex items-center gap-x-1 text-2xl font-pbold text-gray-900'>
       <span>WorkWise</span>
        <span className='w-3 h-3  bg-gray-600 animate-bounce rounded-full'></span>
    </Link>
    </>
  )
}

export default LogoComponents