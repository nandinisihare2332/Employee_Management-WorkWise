import clsx from 'clsx'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { CgSpinner } from "react-icons/cg";

const CustomLoaderButton = ({
    type='submit',
    isLoading=false,
    text='',
    className=''
}) => { 
  return (
    <button type={type} className={clsx(className,'w-full shadow-md bg-indigo-600 border-2 border-indigo-800 hover:bg-indigo-800 flex items-center justify-center gap-x-1 py-2 rounded text-white')}>
        <span>{text}</span>{
            isLoading ? <CgSpinner className='text-xl animate-spin'/>:<FaArrowRight/>
        }
    </button>
)
}

export default CustomLoaderButton