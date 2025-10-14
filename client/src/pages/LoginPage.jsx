import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from 'yup'
import {toast} from 'react-toastify'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import CustomLoaderButton from "../components/CustomLoaderButton.jsx";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../utils/axiosClient.js";
import { useMainContext } from "../context/mainContext.jsx";

const LoginPage = () => {

  const [isShow,setIsShow]=useState(false)
  const [Captcha,setCaptcha]=useState('')
  const [loading,setLoading]=useState(false)
  const navigate =useNavigate()

   
  const {fetchUserProfile}=useMainContext()

  const initialValues ={
  email:'',
  password:'',
  captcha:''
}

const validationschema=yup.object({
  email:yup.string().email("Email must be valid").required("EMail is Required"),
  password:yup.string().required("Password is Required"),
  captcha:yup.string().required("Captcha is Required"),
})

const onSubmitHandler = async(values,helpers)=>{
  try{
    setLoading(true)
    //validate captcha
    if(values.captcha!=eval(Captcha)){
      toast.error("Enter valid Captcha")
      return
    }
    delete values.captcha
    const response=await axiosClient.post('/login',values)
    const data =await response.data
    localStorage.setItem("token",data.token)
    toast.success(data.message)
    await fetchUserProfile()
    navigate('/')
    helpers.resetForm()
    toast.success("Success!")
  }catch(error){
    toast.error(error?.response?.data?.error || error?.message)
  }finally{
    setLoading(false)
  }
}
let  Captchaoperators = ['+','-']

const generateCaptcha = () =>{

  let str=`${Math.floor(Math.random()*100)}${Captchaoperators[Math.floor(Math.random()*Captchaoperators.length)]}${Math.floor(Math.random()*100)}`
  setCaptcha(str)
}

useEffect(()=>{
  generateCaptcha()
},[])

  return (
    <div className='min-h-[80vh] flex items-center justify-center flex-col'>
      <Formik
         validationSchema={validationschema}
         initialValues={initialValues}
         onSubmit={onSubmitHandler}
      >
          <Form className='w-[98%]  md:w-1/2 xl:w-1/3 border-3 py-10 px-4 rounded border-gray-500'>
         <div className="mb-3">
          <label htmlFor="email">Email :</label>
          <Field name="email" type="email" className="w-full py-2 border-1 border-gray-400 rounded px-3 placeholder:font-pmedium outline-0" placeholder='Enter Your Email'/>
          <ErrorMessage name='email' className='text-red-500 text-xs' component={'p'}/>
         </div>
         <div className="mb-3">
           <label htmlFor="password">Password :</label>
            <div className="flex w-full border-1 border-gray-400 rounded items-center justify-between px-4">
            <Field name="password" type={isShow? "text":"password"} className=" py-2 w-full placeholder:font-pmedium outline-0" placeholder='Enter Your Password'/>
          
            <button type='button'onClick={()=>setIsShow(!isShow)} className="text-gray-500 text-2xl">
              {
                isShow? <FaEyeSlash/>:<FaEye/>
              }
            </button>
            </div>
            <ErrorMessage name='password' className='text-red-500 text-xs' component={'p'}/>
         </div>

         <div className="flex mb-3 items-center justify-between">
            <p className="text-center w-1/2">{Captcha}</p>
            <button onClick={generateCaptcha} type="button" className="text-center w-1/2">
            <LuRefreshCw /></button>
            <div className="flex flex-col w-full">
              <Field placeholder="Enter Captcha" name="captcha" className="w-full py-2 border-2 border-gray-400 rounded px-3 placeholder:font-pmedium outline-0"/>
              <ErrorMessage name='captcha' className='text-red-500 text-xs' component={'p'}/>
            </div>
         </div>

         <div className="mb-3 bg-indigo-500">
            <CustomLoaderButton  isLoading={loading} text="Login"/>
         </div>

         <div className="mb-3">
           <p className="text-end">
            Don't Have An Account ? <Link to ={'/register'}
            className="font-psemibold text-indigo-600">Register</Link>
           </p>
         </div>
      </Form>
      </Formik>
    </div>
  )
}

export default LoginPage