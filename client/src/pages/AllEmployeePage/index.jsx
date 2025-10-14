import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { axiosClient } from '../../utils/axiosClient'
import EmpCard from './EmpCard'

const AllEmployeePage = () => {
    const [emps,setEmps]=useState([])
    const fetchAllEmployees=async()=>{
      try{
        const response=await axiosClient.get('/all-employee',{
          headers:{
            'Authorization':'Bearer ' + localStorage.getItem("token")
          }
        })
        const data =await response.data
        setEmps(data)
    }catch(error){
        toast.error(error?.response?.data?.error || error.message)
      }
    }
  
    useEffect(()=>{
       fetchAllEmployees()
    },[])

     const deleteEmp=async(id)=>{
        try{
          const response=await axiosClient.delete('/emp/'+id,{
            headers:{
              'Authorization':'Bearer '+localStorage.getItem("token")
            }
          })
          const data=await response.data
        await fetchAllEmployees()
        toast.dismiss()
        toast.success(data.message)
        }
        catch(error){
          toast.error(error?.response?.data?.error || error.message)
        }
     }
  return (
    <>
        <table className=' shadow-2xl pt-2 w-full pr-0.5 table-auto border-1 border-gray-300  bg-gray-100  rounded-lg overflow-hidden py-10'>
           <thead>
             <tr>
                <th className='px-5 py-3 border-b border-r border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>ID</th>
                <th className='px-5 py-3 border-b border-r border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Name</th>
                <th className='px-5 py-3 border-b border-r border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Email</th>
                <th className='px-5 py-3 border-b border-r border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Image</th>
                <th className='px-5 py-3 border-b border-r border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Actions</th>
            </tr>
           </thead>
            <tbody>
                {
                   emps && emps.length>0 ? 
                     emps.map((cur,i)=>{
                        return <EmpCard key={i} data={cur} onDelete={deleteEmp}/>
                     })
                   :<>
                   </>
                }
            </tbody>
        </table>
    </>
  ) 
}
 
export default AllEmployeePage