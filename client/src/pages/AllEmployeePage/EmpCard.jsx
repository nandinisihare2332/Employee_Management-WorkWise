import React from 'react'
import { Link } from 'react-router-dom'

const EmpCard = ({data,onDelete}) => {


  return (
    <>
    <tr>
        <td className='px-5 py-5 border-b  border-r border-gray-300 bg-white text-gray-800 text-sm'>{data.empId}</td>
        <td className='px-5 py-5 border-b border-r border-gray-300 bg-white text-gray-800 text-sm'>{data.name}</td>
        <td className='px-5 py-5 border-b  border-r border-gray-300 bg-white text-gray-800 text-sm'>{data.email}</td>
        <td className='px-5 py-5 border-b border-r border-gray-300 bg-white text-gray-800 text-sm '>
            <img src={data.image} className='w-24 h-24 rounded-full' alt=""/>
        </td>
        <td className='text-center border-b border-gray-300'>
            <button onClick={()=>onDelete(data._id)} className='px-4 py-2 mx-2 bg-red-600 hover:bg-red-500 text-white rounded-lg'>Delete</button>
            <Link to={'/update-employee/'+data._id} className='px-4 py-2 mx-2 bg-green-600 text-white hover:bg-green-500 rounded-lg'>Edit</Link>
             </td>
    </tr>
    </>
  )
}

export default EmpCard