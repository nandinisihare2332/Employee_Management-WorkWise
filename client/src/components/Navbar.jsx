import React from 'react'
import { Link } from 'react-router-dom';
import LogoComponents from './LogoComponents';
import { useSelector } from 'react-redux';
import {AuthSlicePath} from '../redux/slice/auth.slice'
import { useMainContext } from '../context/mainContext';

const Navbar = () => {
  const user = useSelector(AuthSlicePath)
  const{logoutHandler}=useMainContext()
  return (
    <>
    <header className="w-full  bg-slate-400 border-b border-gray-400 shadow-md">
        <div className='w-[96%] lg:w-[95%] mx-auto py-4 flex items-center justify-between'>
            <LogoComponents/>
            <ul className='flex items-center justify-center gap-x-6'>
                <li>
                    <Link to="/" className='font-psemibold  text-gray-800  hover:text-xl'>Dashboard</Link>
                </li>
                {!user?<>
                <li>
                  <Link to={'/login'} className='px-5 py-2 font-psemibold bg-slate-200 text-slate-800  border-2 border-indigo-700 rounded-lg shadow-md hover:bg-slate-300 hover:text-black transition-colors duration-300'
                      >Login</Link>
                </li>
                <li>
                  <Link to={'/register'} className='font-psemibold px-5 py-2 bg-indigo-600 text-white  
                    shadow-md border-2 border-indigo-700 rounded-lg hover:bg-indigo-700  outline-none '>Register</Link>
                </li>
                </>:
                <li>
                  <button onClick={logoutHandler} className='font-psemibold px-5 py-2 bg-red-500 text-white  
                    border-2 border-red-600 shadow-md rounded-lg hover:bg-red-600  outline-none cursor-pointer'>Logout</button>
                </li>}
            </ul>
        </div>
    </header>
    </>
  )
}

export default Navbar