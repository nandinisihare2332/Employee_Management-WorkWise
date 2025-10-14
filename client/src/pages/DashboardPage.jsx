import React from 'react';
import { MdGroups } from "react-icons/md"; 
import {useSelector} from 'react-redux'
import {AuthSlicePath} from '../redux/slice/auth.slice'

const DashboardPage = () => {
  console.log("✅ DashboardPage rendered");
  const authUser=useSelector(AuthSlicePath)
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 py-6 pl-3 ">
      <div className='w-full border-2 py-3 px-3 shadow-md rounded-xl bg-gray-100 flex justify-between items-center border-slate-300 '>
        <MdGroups className='text-5xl'/>
        <div className="flex flex-col">
          <p className='text-xl font-pmedium'>Total Employees</p>
          <p className='text-end font-pbold'>{authUser && authUser.employees}</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default DashboardPage;
