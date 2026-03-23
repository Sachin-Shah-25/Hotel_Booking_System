import { useContext, useEffect, useId, useState } from 'react'
import { AppContext } from './ContextProv/AppProvider'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
function Booking() {
    const { hotelBookingFun, selectHotelDetail, getUser } = useContext(AppContext)
    const [getMinDate, setMinDate] = useState("")
    const [getMaxDate, setMaxDate] = useState("")
    const navigate = useNavigate()
    console.log("form dAta ", selectHotelDetail)
    const bookingFun = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const { fullName, guestName, phoneNumber, guests, checkIn, checkOut, } = Object.fromEntries(formData)
        console.log(checkOut)
        if (!fullName || !phoneNumber || !guests || !checkIn || !checkOut) {
            toast.error("Invalid Details")
            return;
        }
        if (phoneNumber.length != 10) {
            toast.error("Invalid Phone Number")
            return
        }
        if (guests > 3) {
            toast.error("Sorry maximum 3 guest")
            return
        }
        if (checkIn === checkOut) {
            toast.error("Our booking have full for Today Select Different Date")
            return
        }
        if (checkIn > checkOut) {
            toast.error("Please Select Checout Date")
            return
        }

        const userId = getUser.userId
        const roomId = selectHotelDetail.getParticularRoom._id
        const hotelId = selectHotelDetail._id
        formData.append("userId", userId)
        formData.append("roomId", roomId)
        formData.append("hotelId", hotelId)

        console.log(Object.fromEntries(formData))





        const msg = await hotelBookingFun(formData)
        if (msg.success) {
            toast.success("Your booking is confirmed! Thank you for choosing us")
            navigate("/")
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

    }
    useEffect(() => {
        if (!selectHotelDetail) {
            navigate("/")
        }
        else {
            console.log(selectHotelDetail)
            const getDateArr = selectHotelDetail.getParticularRoom.availability
            console.log(getDateArr)
            const getMin = getDateArr[0]
            const getMax = getDateArr[getDateArr.length - 1]
            console.log(getMin, " ", getMax)
            setMinDate(getMin)
            setMaxDate(getMax)

        }
        if (!Cookies.get('AAUU_IIDD')) {
            toast.error("Please Login Again! ")
            navigate("/signin")
        }
    }, [])
    return (
        <div className="container-fluid" style={{ minHeight: "100vh" }}>
            <div className="row h-100">

                <div
                    className="col-md-6 d-flex flex-column justify-content-center text-white p-5"
                    style={{
                        background: "linear-gradient(to bottom right, #7352d7, #3a1c71)"
                    }}
                >
                    <h1 style={{ fontWeight: "700", fontSize: "40px" }}>
                        Book Your Perfect Stay 🏨
                    </h1>

                    <p style={{ marginTop: "20px", fontSize: "18px", opacity: 0.9 }}>
                        Experience comfort and luxury like never before.
                        Reserve your room in just a few clicks.
                    </p>

                    <ul style={{ marginTop: "30px", lineHeight: "2" }}>
                        <li>✔ Easy Booking</li>
                        <li>✔ Best Price Guarantee</li>
                        <li>✔ 24/7 Support</li>
                    </ul>
                </div>

                {/* RIGHT SIDE FORM */}
                <div className="col-md-6 d-flex justify-content-center align-items-center bg-light">
                    <div
                        style={{
                            width: "100%",
                            maxWidth: "420px",
                            background: "#fff",
                            padding: "30px",
                            borderRadius: "20px",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
                        }}
                    >
                        <h3 className="mb-3 text-center">Booking Form</h3>

                        <form onSubmit={bookingFun}>

                            <div className="mb-3">
                                <label className="form-label">Full Name</label>
                                <input type="text" name="fullName" className="form-control custom-input" />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Reference Name</label>
                                <input type="text" name="guestName" className="form-control custom-input" />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Phone Number</label>
                                <input type="text" maxLength={10} name="phoneNumber" className="form-control custom-input" />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Guests</label>
                                <input type="number" maxLength={3} name="guests" className="form-control custom-input" />
                            </div>

                            <div className="row g-2 mb-3">
                                <div className="col-6">
                                    <input type="date" name='checkIn' max={getMaxDate ? getMaxDate : ""} min={getMinDate ? getMinDate : ""} name="checkIn" className="form-control custom-input" />
                                </div>
                                <div className="col-6">
                                    <input type="date" name='checkOut' max={getMaxDate ? getMaxDate : ""} min={getMinDate ? getMinDate : ""} name="checkOut" className="form-control custom-input" />
                                </div>
                            </div>

                            <div className="mb-3">
                                <textarea
                                    name="special"
                                    placeholder="Special Request..."
                                    className="form-control custom-input"
                                    style={{ height: "90px" }}
                                ></textarea>
                            </div>

                            <motion.button
                                whileHover={{
                                    scale: 1.1,
                                    background:"linear-gradient(to bottom right, #3a1c71, #7352d7)",
                                    transition: { duration: 0.3, ease: "easeInOut" }
                                }}
                                initial={{ opacity: 1,color:"white", scale: 1,background:"linear-gradient(to bottom right, #7352d7, #3a1c71)" }}
                               
                                className="btn w-100 custom-btn">
                                Book Now
                            </motion.button>

                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Booking
