import React, { useContext, useEffect } from 'react'
import { AppContext } from './ContextProv/AppProvider'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie'

function SignIn() {
    const { loginUserFun} = useContext(AppContext);
    const navigate = useNavigate()

    const googleLoginFun = () => {
        try {
            window.location.href = "http://localhost:8000/auth/google";
        } catch (error) {
            console.log("e. ", error.message)
        }
    }
    const loginFun =  (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const { email, password } = Object.fromEntries(formData)

        if (!email || !password) {
            toast.error("Invalid Details")
            return
        }
      
        else {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regex.test(email)) {
                toast.error("Invalid Email")
                return
            }
        }
        const loadingId=toast.loading("Searching...")
        setTimeout(async()=>{
            const msg = await loginUserFun(formData)
            toast.dismiss(loadingId)
            if (msg.success) {
                navigate("/")
                toast.success("Login Successfully")
            }
            else {
                if (msg.res.status == 404) {
                    toast.error(msg.res.response.data.message)
                }
                else if (msg.res.status == 409) {
                    toast.error(msg.res.response.data.message)
                }
                else {
                    toast.error("Something Went Wrong")
                }
            }


        },2000)
    }
    useEffect(() => {
        if (Cookies.get('AAUU_IIDD')) navigate("/")
    }, [])

    return (
      <div className='d-flex' style={{backgroundColor:"#eeedf2"}}>
          <div className='form_left'></div>
            <div className='form_container d-flex flex-column align-items-center'>
                <form className='auth_form sign_form' onSubmit={(e) => loginFun(e)} style={{  margin: 'auto', marginTop: ' 150px' }}>



                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="text" name='password' className="form-control" id="exampleInputPassword1" />
                    </div>

                    <button type="submit" style={{backgroundColor:"#7352d7",border:"none",float:"right"}} className="btn btn-primary fw-bold">SIGNIN</button>
                    <div className='mt-3'>
                        <span>New Customer ?</span>
                        <a href="/signup" className='nav-link'  style={{ display: 'inline',color:"#7352d7" }}>SignUp</a>
                    </div>
                </form>
                <div className='text-center mt-5'>
                    <button className='py-1 btn btn-primary fw-bold'  style={{backgroundColor:"#7352d7",border:"none"}} onClick={() => googleLoginFun()} >Sign In With Google</button>
                </div>
            </div>
              <div  className='form_right'>
      
      </div>
        </div>
    )
}

export default SignIn
