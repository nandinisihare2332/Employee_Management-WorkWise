import React from 'react'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {Route,Routes} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import ProtectedLayout from './layout/ProtectedLayout';
import AddEmployeePage from './pages/AddEmployeePage';
import AllEmployeePage from './pages/AllEmployeePage';
import UpdateEmployeePage from './pages/UpdateEmployeePage';
import Resources from "./pages/Resources";

const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route Component={ProtectedLayout}>
          <Route path='/'Component={DashboardPage}/>
          <Route path='/add-employee' Component={AddEmployeePage}/>
          <Route path='/all-employee' Component={AllEmployeePage}/>
          <Route path='/update-employee/:id' Component={UpdateEmployeePage}/>
          <Route path="/resources" element={<Resources />} />
        </Route>
          
         <Route path='/login' Component={LoginPage}/>
         <Route path='/register' Component={RegisterPage}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App