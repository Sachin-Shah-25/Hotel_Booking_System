import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from './ContextProv/AppProvider'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
const VIEW_AUTH_GOOGLE_URL=import.meta.env.VIEW_AUTH_GOOGLE_URL

function Signup() {
  const { registerUserFun} = useContext(AppContext)
  const navigate = useNavigate()


  const googleSignupFun = () => {
    try {
      window.location.href = VIEW_AUTH_GOOGLE_URL;
    } catch (error) {
      console.log("error ", error.message)
    }
  }
  const registerFormFun = (e) => {
    e.preventDefault()
    const getFormData = new FormData(e.target)
    const { username, email, password } = Object.fromEntries(getFormData)


    if (!username || !email || !password) {
      toast.error("Invalid Details")
      return
    }
    else if (password.length <= 6) {
      toast.error("Password too short")
      return
    }
    else {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(email)) {
        toast.error("Invalid Email")
        return
      }
    }

    const loadingId = toast.loading("Saving...")
    setTimeout(async () => {
      const msg = await registerUserFun(getFormData)
      if (msg.success) {
        navigate("/signin")
      }
      else {
        if (msg.res.status == 409) {

          toast.error(msg.res.response.data.message)
        }
        else {
          toast.error("Something Went Wrong")
        }
      }
      toast.dismiss(loadingId)
      toast.success("login")
    }, 2000)
  }
  useEffect(() => {
    if (Cookies.get('AAUU_IIDD')) navigate("/")
  }, [])
  return (
    <div className='container-fluid'>
      
      <div className='d-flex flex-column align-items-center'>
        <form className='' onSubmit={(e) => registerFormFun(e)} style={{ width: '30%', margin: 'auto', marginTop: '50px' }}>

          <div class="mb-3">
            <label htmlFor="username" class="form-label">Username</label>
            <input type="text" name='username' class="form-control" id="username" aria-describedby="emailHelp" />
          </div>

          <div class="mb-3">
            <label htmlFor="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" name='email' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div class="mb-3">
            <label htmlFor="exampleInputPassword1" class="form-label">Password</label>
            <input type="text" name='password' class="form-control" id="exampleInputPassword1" />
          </div>

          <button type="submit" class="btn btn-primary fw-bold">SIGN UP</button>
          <div className='mt-3'>
            <span>Already Customer ?</span>
            <a href="/signin" className='nav-link' style={{ display: 'inline' }}>Sign In</a>
          </div>
        </form>
        <div className='text-center mt-5'>
          <button className='py-1 btn btn-primary fw-bold' onClick={() => googleSignupFun()} >Sign up With Google</button>
        </div>

      </div>
    </div>
  )
}

export default Signup
