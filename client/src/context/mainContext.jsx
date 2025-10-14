import React, { createContext, useContext, useEffect,useState } from 'react'
import { axiosClient } from '../utils/axiosClient'
import {removeUser, setUser} from '../redux/slice/auth.slice'
import { toast } from 'react-toastify'
import {useDispatch} from 'react-redux'
import ScreenLoaderComponent from '../components/ScreenLoaderComponent'
import { useNavigate } from 'react-router-dom'

export const mainContext=createContext()
export const useMainContext =()=>useContext(mainContext)

export const MainContextProvider = ({children}) => {

  const [loading,setLoading]=useState(true)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const logoutHandler = () =>{
     localStorage.removeItem("token")
     navigate("/login")
     dispatch(removeUser())
     toast.success("Logout Success")
  }

  const fetchUserProfile=async()=>{
    try{
      setLoading(true)
      const token=localStorage.getItem("token") || ''
      if(!token) return

      const response=await axiosClient.get('/profile',{
        headers:{
          'Authorization':'Bearer ' +token
        }
      })
      const data=await response.data
      dispatch(setUser(data))
    }catch(error){
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    fetchUserProfile()
  },[])

  if(loading){
    return <ScreenLoaderComponent/>
  }
  return (
    <mainContext.Provider value={{fetchUserProfile,logoutHandler}}>{children}</mainContext.Provider>
  )
}

// export default MainContextProvider
// import React ,{ createContext, useState } from "react";

// export const MainContext = createContext();

// export const MainContextProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
  
//   const [loading,setLoading]=useState(true)

//   const fetchUserProfile=async()=>{

//   }

//   return (
//     <MainContext.Provider value={{ user, setUser }}>
//       {children}
//     </MainContext.Provider>
//   );
// };

