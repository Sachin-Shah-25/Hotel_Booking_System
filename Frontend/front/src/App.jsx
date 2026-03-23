import React, { Suspense, useContext, useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import Home from './Home'
// import HotelView from './HotelView'
// import Signup from './Signup'
// import SignIn from './SignIn'
// import Profile from './Profile'
// import Booking from './Booking'
import Cookies from 'js-cookie'
import { AppContext } from './ContextProv/AppProvider'
import LocomotiveScroll from 'locomotive-scroll';

const Home = React.lazy(() => import("./Home"))
const HotelView = React.lazy(() => import("./HotelView"))
const Signup = React.lazy(() => import("./Signup"))
const Loader = React.lazy(() => import("./Loader"))
const SignIn = React.lazy(() => import("./SignIn"))
const Profile = React.lazy(() => import("./Profile"))
const Booking = React.lazy(() => import("./Booking"))

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const locomotiveScroll = new LocomotiveScroll()
  const { getUserFun } = useContext(AppContext);
  useEffect(() => {
    if (Cookies.get('AAUU_IIDD')) {
      getUserFun()
    }
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [])

  return (<>
    <div className={`loader ${isLoading ? "show" : "hide"}`}>
      <Loader />
    </div>
    <div className={`loader ${isLoading ? "hide" : "show"}`}>
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route path='/' element={<Home></Home>} />
            <Route path='/hotel-view/:id' element={<HotelView></HotelView>} />
            <Route path='/signup' element={<Signup></Signup>} />
            <Route path='/signin' element={<SignIn></SignIn>} />
            <Route path='/myprofile' element={<Profile></Profile>} />
            <Route path='/booking' element={<Booking></Booking>} />
          </Routes>
          <ToastContainer position='top-center' />
        </Suspense>
      </BrowserRouter>
    </div>
  </>

  )
}

export default App
