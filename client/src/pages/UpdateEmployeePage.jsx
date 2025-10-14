import React from 'react'
import { ErrorMessage, Field, Form,Formik } from 'formik'
import { EmployeeRoles } from '../utils/constant'
import CustomLoaderButton from '../components/CustomLoaderButton'
import * as yup from 'yup'
import {toast} from 'react-toastify'
import { useState } from 'react'
import { axiosClient } from "../utils/axiosClient.js";
import {useMainContext} from '../context/mainContext'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

const UpdateEmployeePage = () => {


    const[loading,setLoading]=useState(false); 
    const {fetchUserProfile} = useMainContext()

    const [loader,setLoader]=useState(true)

    const [emp,setEmp]=useState(null)
    const params = useParams()



    const fetchUser = async()=>{
        try{
           const response=await axiosClient.get('/emp/'+params.id,{
            headers:{
                'Authorization':'Bearer '+localStorage.getItem("token")
            }
           })
           const data=await response.data
           setEmp(data)
        }catch(error){
           toast.error(error?.response?.data?.error || error.message)
        }finally{
            setLoader(false)
        }
    }

    useEffect(()=>{
        if(params.id){
            fetchUser()
        }
    },[params])
    if(loader){
        return <div>loading...</div>
    }

    if(!emp){
        return <h1 className='text-center text-3xl font-bold'>Not Found</h1>
    }
 
    const initialValues ={
        name:emp?.name||'',
        salary:emp?.salary||0,
        role:emp?.role||'',
        image:emp?.image||'',
        mobile:emp?.mobile||'',
        email:emp?.email||'',
        address:emp?.address||''
    }

  const validationSchema=yup.object({
    'name':yup.string().required("Name is Required"),
    'salary':yup.number().min(1,"Salary Can Not Be Negative or Zero").required("Salary is Required"), 
    'role':yup.string().required("Role is Required"),
    'email':yup.string().required("Email is Required").email("Enter Valid Email"),
    'mobile':yup.string().required("Mobile No is Required"),
    'address':yup.string().required("Address is Required")
   })
   
  const onSubmitHandler = async(values,helpers)=>{
    try{
        setLoading(true)
        const response = await axiosClient.put('/emp/'+params.id,values,{
           headers:{
             'Authorization':'Bearer '+ localStorage.getItem("token")
           }
       })
       const data=await response.data
       console.log(data)
       await fetchUserProfile()
       toast.success(data.message);
       
    }catch(error){
       toast.error(error?.response?.data?.error || error.message)
    }finally{
        setLoading(false)
    }
  }
  return (
    <>
    <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
        enableReinitialize={true}
    >
        <Form className='w-[90%] mx-auto py-10 bg-blue-100 pl-4 pr-4'>

            <div className='mb-3'>
                <label htmlFor="">Employee Name <span className='text-red-500'></span></label>
                <Field type="text" name="name" className='w-full py-2 border-2 border-slate-300 rounded outline-0 px-3 placeholder:font-pmedium'
                placeholder='Enter Employee Name'/>
                <ErrorMessage name='name' component={'p'} className='text-red-500 test-xs'/>
            </div>

            <div className='mb-3'>
                <label htmlFor="">Employee Role <span className='text-red-500'></span></label>
                <Field as="select" name="role" className='w-full py-2 border-2 border-slate-300 rounded outline-0 px-3 placeholder:font-pmedium text-slate-900'
                placeholder='Enter Employee Name'>
                    <option value={''}>..........select...........</option>
                    {
                        EmployeeRoles.map((cur,i)=>{
                            return <option className='text-slate-800' key={i} value={cur}>{cur}</option>
                        })
                    }
                </Field>
                <ErrorMessage name='role' component={'p'} className='text-red-500 test-xs'/>
            </div>

            <div className='mb-3'>
                <label htmlFor="">Employee Salary <span className='text-red-500'></span></label>
                <Field type="number" name="salary" className='w-full py-2 border-2 border-slate-300 rounded outline-0 px-3 placeholder:font-pmedium'
                placeholder='Enter Employee Salary'/>
                <ErrorMessage name='salary' component={'p'} className='text-red-500 test-xs'/>
            </div>

            <div className='mb-3'>
                <label htmlFor="">Employee Image <span className='text-red-500'></span></label>
                <Field type="url" name="image" className='w-full py-2 border-2 border-slate-300 rounded outline-0 px-3 placeholder:font-pmedium'
                placeholder='Employee Image URL'/>
                <ErrorMessage name='image' component={'p'} className='text-red-500 test-xs'/>
            </div>

            <div className='mb-3'>
                <label htmlFor="">Employee Mobile No. <span className='text-red-500'></span></label>
                <Field type="text" name="mobile" className='w-full py-2 border-2 border-slate-300 rounded outline-0 px-3 placeholder:font-pmedium'
                placeholder='Enter Employee Mobile No'/>
                <ErrorMessage name='mobile' component={'p'} className='text-red-500 test-xs'/>
            </div>

            <div className='mb-3'>
                <label htmlFor="">Employee Email ID <span className='text-red-500'></span></label>
                <Field type="email" name="email" className='w-full py-2 border-2 border-slate-300 rounded outline-0 px-3 placeholder:font-pmedium'
                placeholder='Enter Employee Email ID'/>
                <ErrorMessage name='email' component={'p'} className='text-red-500 test-xs'/>
            </div>
            
            <div className='mb-3'>
                <label htmlFor="">Employee Address <span className='text-red-500'></span></label>
                <Field as="textarea" rows={2} name="address" className='w-full py-2 border-2 border-slate-300 rounded outline-0 px-3 placeholder:font-pmedium'
                placeholder='Enter Employee Address'/>
                <ErrorMessage name='address' component={'p'} className='text-red-500 test-xs'/>
            </div>

            <div className="mb-3">
                <CustomLoaderButton isLoading={loading} text='Update Employee'/>
            </div>

        </Form>
    </Formik>
    </>
  )
}

export default UpdateEmployeePage