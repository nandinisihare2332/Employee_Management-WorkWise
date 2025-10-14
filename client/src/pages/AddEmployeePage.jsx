import React from 'react'
import { ErrorMessage, Field, Form,Formik } from 'formik'
import { EmployeeRoles } from '../utils/constant'
import CustomLoaderButton from '../components/CustomLoaderButton'
import * as yup from 'yup'
import {toast} from 'react-toastify'
import { useState } from 'react'
import { axiosClient } from "../utils/axiosClient.js";
import {faker} from '@faker-js/faker'
import {useMainContext} from '../context/mainContext'

const AddEmployeePage = () => {
    const[loading,setLoading]=useState(false); 
    const {fetchUserProfile} = useMainContext()

  const [initialValues , setInitialValues]=useState({
    name:'',
    salary:0,
    role:'',
    image:'',
    mobile:'',
    email:'',
    address:''
  })

  const validationSchema=yup.object({
    'name':yup.string().required("Name is Required"),
    'salary':yup.number().min(1,"Salary Can Not Be Negative or Zero").required("Salary is Required"), 
    'role':yup.string().required("Role is Required"),
    'email':yup.string().required("Email is Required").email("Enter Valid Email"),
    'mobile':yup.string().required("Mobile No is Required"),
    'address':yup.string().required("Address is Required")
   })
   
   const TestData=()=>{
       setInitialValues({
          name:faker.person.fullName(),
          salary:faker.number.int({min:20000,max:50000}),
          role:EmployeeRoles[Math.floor(Math.random()*EmployeeRoles.length)],
          image:faker.image.avatar(),
          mobile:faker.number.int({min:7000000000,max:10000000000}),
          email:faker.person.firstName()+"@gmail.com",
          address:faker.lorem.sentence(10)
       })
   }

  const onSubmitHandler = async(values,helpers)=>{
    try{
        setLoading(true)
        const response = await axiosClient.post('/add-employee',values,{
           headers:{
             'Authorization':'Bearer '+ localStorage.getItem("token")
           }
       })
       const data=await response.data
       console.log(data)
       helpers.resetForm()
       await fetchUserProfile()

       toast.success(data.message);
       setInitialValues({  
          name:'',
          salary:0,
          role:'',
          image:'',
          mobile:'',
          email:'',
          address:''
       })
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
        <Form className='w-[90%] mx-auto py-10 border-b border-r border-2 border-gray-300 bg-gray-100 shadow-xl rounded-lg pl-4 pr-4'>

            <div className="mb-3 flex items-center justify-end">
                 <button type='button' onClick={TestData} className=" px-4 py-2 bg-indigo-600 border-2 border-indigo-800 hover:bg-indigo-800 text-white rounded">Test</button>
            </div>

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
                <CustomLoaderButton isLoading={loading} text='Add Employee'/>
            </div>

        </Form>
    </Formik>
    </>
  )
}

export default AddEmployeePage