import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from './ContextProv/AppProvider'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie'
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import ErrorComponent from './Components/ErrorComponent.jsx'
import axios from 'axios'
const VITE_LOGIN = import.meta.env.VITE_LOGIN

function SignIn() {
    const { loginUserFun, setUser } = useContext(AppContext);
    const navigate = useNavigate()
    const [onFocus, offFocus] = useState(null)
    const [showPass, hidePass] = useState(null)
    const [showInvalid, hideInvalid] = useState(false);
    const [isError, setIsError] = useState({ show: false });



    const googleLoginFun = () => {
        try {
            window.location.href = "http://localhost:8000/auth/google";
        } catch (error) {
            console.log("e. ", error.message)
        }
    }
    const loginFun = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const { email, password } = Object.fromEntries(formData)

        // toast.error("Invalid Details")
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            // toast.error("Invalid Email")
            hideInvalid("Invalid Email")
            return;
        }
        if (!password) {
            hideInvalid("Enter Correct Password")
            return;
        }

        const loadingId = toast.loading("Searching...")
        setTimeout(async () => {
            // const msg = await loginUserFun(formData)
            // toast.dismiss(loadingId)
            // if (msg.success) {
            //     navigate("/")
            //     toast.success("Login Successfully")
            // }
            // else {
            //     if (msg.res.status == 404) {
            //         setIsError({
            //             show:true,
            //             errorCode:msg.res.status,
            //             errorMessage:msg.res.response.data.message || "Somethin went wrong"
            //         });

            //     }
            //     else if (msg.res.status == 409) {
            //          setIsError({
            //             show:true,
            //             errorCode:msg.res.status,
            //             errorMessage:msg.res.response.data.message || "Somethin went wrong"
            //         });
            //     }
            //     else {
            //         setIsError({
            //             show:true,
            //             errorCode:msg.res.status || 500,
            //             errorMessage:msg.res.response.data.message || "Internal Server Error"
            //         });
            //     }
            // }
            toast.dismiss(loadingId)
            const res = await axios.post(VITE_LOGIN, formData, {
                withCredentials: 'include'
            }).then((data) => {
                if (data.status != 200) {
                    setIsError({
                        show: true,
                        errorCode: data.res.status,
                        errorMessage: data.res.response.data.message || "Somethin went wrong"
                    });
                    return;
                }
                setUser(data.data.mydata)
                // return { "success": true, "res": "Successfull" }
                navigate("/")
            }).catch((e) => {
                setIsError({
                    show: true,
                    errorCode: e.response.status,
                    errorMessage: e.response.data.message || "Somethin went wrong"
                });

            })

            // return res


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
            <div className='form_container d-flex flex-column align-items-center'>
                <form className='auth_form sign_form' onSubmit={(e) => loginFun(e)} style={{ margin: 'auto', marginTop: ' 50px' }}>

                    {
                        showInvalid
                            ? <div className="w-full text-center mb-5" style={{ color: 'red' }}>!! {showInvalid}</div>
                            : ""
                    }

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input onFocus={() => {
                            offFocus("email")
                            hideInvalid(false)
                        }}
                            onBlur={() => {
                                offFocus(null)

                            }} style={{ borderColor: onFocus === "email" ? "#7352D7" : "gray" }} type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>


                    <div className="mb-3">
                        <div className='flex-grow-1 align-items-center'>
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <div className="d-flex align-items-center " style={{ borderColor: onFocus === "password" ? "#7352D7" : "gray", borderWidth: "1px", borderStyle: "solid", borderRadius: "3px", padding: "0 8px" }} >
                                <input onFocus={() => {
                                    offFocus("password")
                                    hideInvalid(false)
                                }}
                                    onBlur={() => {
                                        offFocus(null)

                                    }} type={showPass ? "text" : "password"} style={{ border: "none" }} name="password" className="form-control" id="exampleInputPassword1" />
                                <div> {
                                    showPass
                                        ? <FaRegEye style={{ cursor: "pointer" }} onClick={() => hidePass(null)} ></FaRegEye>
                                        : <FaEyeSlash style={{ cursor: "pointer" }} onClick={() => hidePass("password")} ></FaEyeSlash>
                                }</div>
                            </div>
                        </div>
                    </div>



                    <button type="submit" style={{ backgroundColor: "#7352d7", border: "none", float: "right" }} className="btn btn-primary fw-bold">SIGNIN</button>
                    <div className='mt-3'>
                        <span>New Customer ?</span>
                        <a href="/signup" className='nav-link' style={{ display: 'inline', color: "#7352d7" }}>SignUp</a>
                    </div>
                </form>
                {/* <div className='text-center mt-5'>
                    <button className='py-1 btn btn-primary fw-bold' style={{ backgroundColor: "#7352d7", border: "none" }} onClick={() => googleLoginFun()} >Sign In With Google</button>
                </div> */}
            </div>
            <div className='form_right'>

            </div>
        </div>
    )
}

export default SignIn
