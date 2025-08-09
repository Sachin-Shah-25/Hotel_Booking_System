import  { useContext, useState } from 'react'
import { AppContext } from './ContextProv/AppProvider'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
const VITE_LOGOUT = import.meta.env.VITE_LOGOUT

function Navabar({ hide }) {
  const { filterFun, getUser } = useContext(AppContext)
  const navigate = useNavigate()

const logoutFun=()=>{
  try {
    axios.get(VITE_LOGOUT,{withCredentials:'include'})
      .then((res) => {
        if(res.status==200){
          
          toast.success("You have logout")
          navigate("/signin")
        }
      }).catch((e) => {
        console.log(e.message)
      })
  } catch (error) {
    console.log(error.message)
  }
}



  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/myprofile"><div style={{ height: '50px', width: '50px' }}><img src={
          getUser.profile
            ? `http://localhost:8000/static/images/${getUser.profile}`
            : `http://localhost:8000/static/images/user3.png` } className="img-fluid rounded-circle" alt="..." style={{
              height: '100%',
              width: '100%'
            }} /></div></a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav my-2 ps-0 my-lg-0 navbar-nav-scroll" style={{ "--bs-scroll-height": "100px" }}>
            <ul className='ps-0' style={{ listStyle: 'none', textDecoration: 'none' }} >
              <li className='fw-bold'>{
                !getUser.username
                ? "Unkonwn"
                : getUser.username
                }</li>
              <li className='' style={{
                fontSize: '0.8rem'
              }}>{
                  getUser.email
                    ? getUser.email.substring(0, 10) + "...."
                    : ""
                }</li>

            </ul>
            {/* // login karan hai kyonki model update karn ahai gmail show k liye  */}
          </ul>
          {
            hide
              ? <ul className="navbar-nav d-flex justify-content-center mb-2 mb-lg-0" style={{
                width: '100%',
                gap: '50px'
              }}>
                <li className="nav-item">
                  <a className="btn btn-primary nav-link active px-2 py-1 fw-bold text-white" aria-current="page" href="/" style={{ backgroundColor: '#5e88c5' }}>Home</a>
                </li>
                <li className="nav-item">
                  <a className="btn btn-primary nav-link active px-2 py-1 fw-bold text-white" aria-current="page" href="#" style={{ backgroundColor: '#5e88c5' }}>View All</a>
                </li>
                <li className="nav-item">
                  <a className="btn btn-primary nav-link active px-2 py-1 fw-bold text-white" aria-current="page" href="#" style={{ backgroundColor: '#5e88c5' }}>Services</a>
                </li>
                <li className="nav-item">
                  <a className="btn btn-primary nav-link active px-2 py-1 fw-bold text-white" aria-current="page" href="#" style={{ backgroundColor: '#5e88c5' }}>Contact</a>
                </li>
              </ul>
              : <form className="d-flex col-md-8 ms-auto ms-5">
                <input className="form-control me-2" type="search" placeholder="City name...." aria-label="Search" onChange={(e) => filterFun(e.target.value)} />

              </form>
          }

          <div className="nav-link ms-auto" id='logoutbtn'>
            {
              Cookies.get('AAUU_IIDD')
                ? <button style={{ display: 'block' }} onClick={() => {
                  logoutFun()
                }} className="btn btn-outline-primary" href='/signin' type="submit">Logout</button>
                : <a style={{ display: 'block' }} className="btn btn-outline-primary" href='/signin' type="submit">Login</a>
            }

          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navabar
