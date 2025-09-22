import React, { useContext, useEffect, useState } from 'react'
import Navabar from './Navabar'
import { AppContext } from './ContextProv/AppProvider'
import MyHotelBook from './Components/MyHotelBook'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

function Profile() {
    const { myHotelBookedFun, reviewId, AllReviews,setReviewId, HotelBooked, updateProfileFun, getUser } = useContext(AppContext)
    const [getImage, setImage] = useState("")
    const navigate = useNavigate()

    const profileSubFun = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const fetchImage = Object.fromEntries(formData)
        if (!getImage || !fetchImage.image.name || fetchImage.image.size == 0) {
            toast.error("Image Not Found")
            return
        }
        const loadingToast = toast.loading("Uploading...")
        setTimeout(() => {
            updateProfileFun(formData)
            toast.dismiss(loadingToast)
            window.location.reload()
        }, 2000)

    }


    const addreviewFun = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const {review}=Object.fromEntries(formData)

        if (!review) {
            toast.error("Filed Requried")
            return
        }
        const SAVEING_TOAST = toast.loading("....")
        setTimeout(() => {
            toast.dismiss(SAVEING_TOAST)

            axios.post("http://localhost:8000/api/sendreview", formData, {
                withCredentials: 'include',
                headers: {
                    'roomId': reviewId
                }
            })
                .then((data) => {
                    toast.success("Thanks for your review")
                }).catch((e) => {
                    toast.error("Something went wrong")
                })
                setReviewId("")
        }, 2000)
    }

    useEffect(() => {
        if (!Cookies.get('AAUU_IIDD')) {
            navigate('/signin')
        }
        myHotelBookedFun()
    }, [])
    return (
        <div>
            <Navabar hide={true}></Navabar>
            {
                reviewId
                    ? <div style={{ zIndex: '999' }} className='row position-absolute  left-50 col-4 top-20 translate-middle'>
                        <form onSubmit={(e) => addreviewFun(e)} className='position-realative text-center'>
                              <div className='d-flex'>
                            <textarea class="form-control" placeholder="...." id="specail" name='review' style={{ height: '100px', resize: 'none' }}></textarea>
                          <i style={{
                            cursor:'pointer'
                          }} class="fa-regular fa-circle-xmark cursor-pointer" onClick={(e) => {
                            setReviewId("")
                          }}></i></div>
                            <button className=" position-realative btn btn-primary  mt-5">Add Review</button>
                        </form></div>
                    : ""
            }


            <div className=" container-fluid" >
                <div className="row g-3" style={{
                    marginTop: '20px'
                }}>
                    <div className="col-9 gy-4 " style={{
                        padding: '10px 20px'
                    }}>
                        {
                            HotelBooked && HotelBooked.length != 0
                                ? HotelBooked.map((elem) => {
                                    return <MyHotelBook booking={elem}></MyHotelBook>
                                })
                                : <div className='d-flex align-items-center justify-content-center p-5' style={{
                                    height: '300px'
                                }}>
                                    <h1 className='fw-bold' style={{
                                        color: 'gray',
                                        fontSize: '3.5rem'
                                    }}>No bookings yet .</h1>
                                </div>
                        }

                    </div>
                    <div className="col-3 p-2">
                        <form onSubmit={(e) => profileSubFun(e)} className="col d-flex flex-column p-5" encType='multipart/form-data'>
                            <label htmlFor="updateprofile" className='rounded-circle ms-auto' style={{
                                height: '200px',
                                width: '200px',
                                cursor: 'pointer'
                            }}>
                                <img className='rounded-circle'

                                    src={
                                        getImage || `http://localhost:8000/static/images/${getUser.profile ? getUser.profile : "user3.png"}`
                                    }

                                    alt="" style={{
                                        height: '100%',
                                        width: '100%',
                                        objectFit: 'cover'
                                    }} />
                            </label>
                            <input type="file" name="image" style={{ display: 'none' }} accept='image/*' id="updateprofile" onChange={(e) => {
                                setImage(URL.createObjectURL(e.target.files[0]))

                            }}

                            />
                            <button className="btn btn-primary mt-5">Update Profile</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Profile
