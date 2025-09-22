import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './Home'
import HotelView from './HotelView'
import Signup from './Signup'
import SignIn from './SignIn'
import Profile from './Profile'
import Booking from './Booking'
import Cookies from 'js-cookie'
import { AppContext } from './ContextProv/AppProvider'
import LocomotiveScroll from 'locomotive-scroll';

function App() {
  const locomotiveScroll=new LocomotiveScroll()
  const { getUserFun } = useContext(AppContext);
  useEffect(() => {
    if (Cookies.get('AAUU_IIDD')) {
      getUserFun()
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>} />
        <Route path='/hotel-view/:id' element={<HotelView></HotelView>} />
        <Route path='/signup' element={<Signup></Signup>} />
        <Route path='/signin' element={<SignIn></SignIn>} />
        <Route path='/myprofile' element={<Profile></Profile>} />
        <Route path='/booking' element={<Booking></Booking>} />
      </Routes>
      <ToastContainer position='top-center' />

    </BrowserRouter>
  )
}

export default App
