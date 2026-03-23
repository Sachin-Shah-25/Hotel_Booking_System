import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from './ContextProv/AppProvider'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from 'axios'
import ErrorComponent from './Components/ErrorComponent'
const VIEW_AUTH_GOOGLE_URL = import.meta.env.VIEW_AUTH_GOOGLE_URL
const VITE_SIGNUP = import.meta.env.VITE_SIGNUP

function Signup() {
  const { registerUserFun, setUser } = useContext(AppContext)
  const [onFocus, offFocus] = useState(null)
  const [showPass, hidePass] = useState(null)
  const [showInvalid, hideInvalid] = useState(false)
  const [isError, setIsError] = useState({ show: false });
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
    const { username, email, password, password1 } = Object.fromEntries(getFormData)


    if (!username || !email || !password || !password1) {
      // toast.error("Invalid Details")
      hideInvalid("Invalid Details")
      return
    }
    else if (password != password1) {
      // toast.error("Password Doesn't Match")
      hideInvalid("Password Doesn't Match")
      return

    }
    else if (password.length <= 6) {
      // toast.error("Password too short")
      hideInvalid("Invalid Details")
      return
    }
    else {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(email)) {
        // toast.error("Invalid Email")
        hideInvalid("Invalid Email")
        return
      }
    }

    const loadingId = toast.loading("Saving...")
    setTimeout(async () => {
        console.log("1")
      toast.dismiss(loadingId)
      const res = axios.post(VITE_SIGNUP, getFormData, {
        withCredentials: 'include'
      }).then((data) => {
        console.log("2")
        if (data.status != 200) {
          setIsError({
            show: true,
            errorCode: data.res.status,
            errorMessage: data.res.response.data.message || "Somethin went wrong"
          });
          return;
        }
        setUser(data.data.mydata)
        navigate("/")
      }).catch((e) => {
        console.log("3")

        setIsError({
          show: true,
          errorCode: e.response.status,
          errorMessage: e.response.data.message || "Somethin went wrong"
        });
      })
      // const msg = await registerUserFun(getFormData)
      // if (msg.success) {
      //   navigate("/signin")
      // }
      // else {
      //   if (msg.res.status == 409) {

      //     toast.error(msg.res.response.data.message)
      //   }
      //   else if(msg.res.status==404) {
      //    toast.error("Page Not Found")
      //   }
      // }

      // toast.success("login")
    }, 2000)
  }
  useEffect(() => {
    if (Cookies.get('AAUU_IIDD')) navigate("/")
  }, [])
  if (isError.show) {
    return <ErrorComponent info={isError} setIsError={setIsError}  ></ErrorComponent>;
  }
  return (
    <div className='d-flex' style={{ backgroundColor: "#eeedf2" }}>
      <div className='form_left'></div>
      <div className='form_container d-flex flex-column align-items-center '>
        <form className='auth_form' onSubmit={(e) => registerFormFun(e)} style={{ margin: 'auto', marginTop: '50px' }}>

          {
            showInvalid
              ? <div className="w-full text-center mb-2" style={{ color: 'red' }}>!! {showInvalid}</div>
              : ""
          }

          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input onFocus={() => offFocus("username")}
              onBlur={() => {
                offFocus(null)
                hideInvalid(false)
              }} style={{ borderColor: onFocus === "username" ? "#7352D7" : "gray" }} type="text" name='username' className="form-control" id="username" aria-describedby="emailHelp" />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input onFocus={() => offFocus("email")}
              onBlur={() => {
                offFocus(null)
                hideInvalid(false)
              }} style={{ borderColor: onFocus === "email" ? "#7352D7" : "gray" }} type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>


          <div className="mb-3 d-flex gap-4 pass">

            <div className='flex-grow-1 align-items-center'>
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <div className="d-flex align-items-center " style={{ borderColor: onFocus === "password" ? "#7352D7" : "gray", borderWidth: "1px", borderStyle: "solid", borderRadius: "3px", padding: "0 8px" }} >
                <input style={{ border: "none" }} type={showPass === "password" ? "text" : "password"} name="password" className="form-control" id="exampleInputPassword1" />
                <div> {
                  showPass && showPass != "password1"
                    ? <FaRegEye style={{ cursor: "pointer" }} onClick={() => hidePass(null)} ></FaRegEye>
                    : <FaEyeSlash style={{ cursor: "pointer" }} onClick={() => hidePass("password")} ></FaEyeSlash>
                }</div>
              </div>
            </div>

            {/* exampleInputPassword2 */}
            <div className='flex-grow-1 align-items-center'>
              <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
              <div className="d-flex align-items-center " style={{ borderColor: onFocus === "password1" ? "#7352D7" : "gray", borderWidth: "1px", borderStyle: "solid", borderRadius: "3px", padding: "0 8px" }} >
                <input style={{ border: "none" }} type={showPass === "password1" ? "text" : "password"} name='password1' className="form-control" id="exampleInputPassword2" />
                <div>
                  {
                    showPass && showPass != "password"
                      ? <FaRegEye style={{ cursor: "pointer" }} onClick={() => hidePass(null)} ></FaRegEye>
                      : <FaEyeSlash style={{ cursor: "pointer" }} onClick={() => hidePass("password1")} ></FaEyeSlash>
                  }
                </div>
              </div>
            </div>

          </div>

          <button type="submit" className="btn btn-primary fw-bold" style={{ backgroundColor: "#7352d7", border: "none" }}>SIGN UP</button>
          <div className='mt-3'>
            <span>Already Customer ?</span>
            <a href="/signin" className='nav-link' style={{ display: 'inline', color: "#7352d7" }}>Sign In</a>
          </div>
        </form>
        {/* <div className='text-center mt-5'>
          <button className='py-1 btn btn-primary fw-bold' style={{ backgroundColor: "#7352d7", border: "none" }} onClick={() => googleSignupFun()} >Sign up With Google</button>
        </div> */}

      </div>
      <div className='form_right'>

      </div>
    </div>
  )
}

export default Signup
