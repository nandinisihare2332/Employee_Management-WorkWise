import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate,Link } from 'react-router-dom'
import { AuthSlicePath } from '../redux/slice/auth.slice'
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import clsx from 'clsx'
import { MdGroups } from "react-icons/md"; 

const sidebarItemList=[
    {
      name:'Dashboard',
      link:'/',
      Icon:MdDashboard
    },
    {
      name:'Add Employee',
      link:'/add-employee',
      Icon:FaUser
    },
    {
      name:'All Employees',
      link:'/all-employee',
      Icon:MdGroups
    }
  ]
const ProtectedLayout = () => {

  const user=useSelector(AuthSlicePath)
  const [loading,setLoading]=useState(true)
  const navigate=useNavigate()
  const pathname= useLocation()

  useEffect(()=>{
       if(!user){
          navigate('/login')
       }else{
        setLoading(false)
       }
  },[user])
  if(loading){
    return <div>loading....</div>
  }
  
  return (
     <>
      <div className='flex  w-[98%] mx-auto items-start  flex-col lg:flex-row py-3 gap-x-1 gap-y-6'>
      <div className="w-1/4 hidden lg:flex flex-col min-h-screen border border-gray-300 rounded-lg shadow-2xl bg-slate-200 py-4">
        {
          sidebarItemList.map((cur,i)=>{
            return <SidebarMenuItem item={cur} key={i}/>
          })
        } 
      </div>
      <ul className="flex lg:hidden items-center ">
        {
          sidebarItemList.map((cur,i)=>{
            return <li key={i}  className={clsx('bg-slate-200 px-5 py-2 text-sm font-pmedium  ','hover:bg-slate-300  ',
            cur.link===pathname && "bg-slate-300")}>
              <Link to={cur.link} className='flex item-center gap-x-1'>
              <cur.Icon className='text-lg'/><span>{cur.name?.split(" ")}</span></Link>
            </li>
          })
        }
      </ul>
      <section className='w-full'>
        <Outlet/></section>  
      </div> 
   
     </>
  )
}

export default ProtectedLayout
const SidebarMenuItem = ({item})=>{
  const {pathname}=useLocation()
  return <Link to={item.link} className={clsx('pl-3 w-full py-3.5 gap-x-3 flex justify-start item-center','hover:bg-slate-300 rounded',item.link===pathname && "bg-slate-300")}>
    <item.Icon className="text-2xl"/> <span>{item.name}</span>
  </Link>
}
