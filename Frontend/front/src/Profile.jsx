import React, { useContext, useEffect, useState } from 'react'
import Navabar from './Navabar'
import { AppContext } from './ContextProv/AppProvider'
import MyHotelBook from './Components/MyHotelBook'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

function Profile() {
    const { myHotelBookedFun, reviewId, AllReviews, setReviewId, HotelBooked, updateProfileFun, getUser } = useContext(AppContext)
    const [getImage, setImage] = useState("")
    const navigate = useNavigate()

    const profileSubFun = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const fetchImage = Object.fromEntries(formData)
        console.log(fetchImage)
        if (!getImage || !fetchImage.image.name || fetchImage.image.size == 0) {
            toast.error("Image Not Found")
            return
        }
        const loadingToast = toast.loading("Uploading...")
        setTimeout(() => {
            console.log("setTimeOut", Object.fromEntries(formData))
            updateProfileFun(formData)
            toast.dismiss(loadingToast)
            window.location.reload()
        }, 2000)

    }


    const addreviewFun = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const { review } = Object.fromEntries(formData)

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
                        <form encrypt="multipart/form-data" onSubmit={(e) => addreviewFun(e)} className='position-realative text-center'>
                            <div className='d-flex'>
                                <textarea class="form-control" placeholder="...." id="specail" name='review' style={{ height: '100px', resize: 'none' }}></textarea>
                                <i style={{
                                    cursor: 'pointer'
                                }} class="fa-regular fa-circle-xmark cursor-pointer" onClick={(e) => {
                                    setReviewId("")
                                }}></i></div>
                            <button className=" position-realative btn btn-primary  mt-5">Add Review</button>
                        </form></div>
                    : ""
            }


            <div className="container-fluid">
                <div className="row g-3 mt-3">

                    <div className="col-12 col-lg-8 p-3">
                        {HotelBooked && HotelBooked.length !== 0 ? (
                            HotelBooked.map((elem, i) => (
                                <MyHotelBook key={i} booking={elem} />
                            ))
                        ) : (
                            <div
                                className="d-flex align-items-center justify-content-center text-center"
                                style={{ minHeight: "250px" }}
                            >
                                <h2 className="fw-bold text-muted">
                                    No bookings yet.
                                </h2>
                            </div>
                        )}
                    </div>

                    <div className="col-12 col-lg-4">
                        <div
                            className="p-4 text-center"
                            style={{
                                background: "#fff",
                                borderRadius: "15px",
                                boxShadow: "0 5px 20px rgba(0,0,0,0.1)"
                            }}
                        >
                            <form
                                onSubmit={profileSubFun}
                                encType="multipart/form-data"
                                className="d-flex flex-column align-items-center"
                            >
                                <label
                                    htmlFor="updateprofile"
                                    style={{
                                        height: "150px",
                                        width: "150px",
                                        cursor: "pointer"
                                    }}
                                >
                                    <img
                                        className="rounded-circle"
                                        src={
                                            getImage ||
                                            `http://localhost:8000/static/images/${getUser?.profile || "user3.png"
                                            }`
                                        }
                                        alt="profile"
                                        style={{
                                            height: "100%",
                                            width: "100%",
                                            objectFit: "cover",
                                            border: "3px solid #7352d7"
                                        }}
                                    />
                                </label>

                                <input
                                    type="file"
                                    name="image"
                                    id="updateprofile"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={(e) =>
                                        setImage(URL.createObjectURL(e.target.files[0]))
                                    }
                                />

                                <button className="btn btn-primary w-100 mt-4">
                                    Update Profile
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Profile
