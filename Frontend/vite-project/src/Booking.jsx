import { useContext, useEffect, useState } from 'react'
import { AppContext } from './ContextProv/AppProvider'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
function Booking() {
    const { hotelBookingFun, selectHotelDetail, getUser } = useContext(AppContext)
    const [getMinDate,setMinDate]=useState("")
    const [getMaxDate,setMaxDate]=useState("")
    const navigate = useNavigate()

    const bookingFun = async (e) => {
        e.preventDefault()
       
        const formData = new FormData(e.target)
const {fullName,guestName,phoneNumber,guests,checkIn,checkOut,} = Object.fromEntries(formData)
        if(!fullName || !phoneNumber || !guests || !checkIn || !checkOut){
            toast.error("Invalid Details")
            return;
        }
        if(phoneNumber.length!=10){
            toast.error("Invalid Phone Number")
            return
        }
        if(guests>3){
            toast.error("Sorry maximum 3 guest")
            return
        }
        if(checkIn===checkOut){
            toast.error("Our booking have full for Today Select Different Date")
            return 
        }
        if (checkIn> checkOut){
            toast.error("Please Select Checout Date")
            return
        }

        const userId = getUser.userId
        const roomId = selectHotelDetail.room._id
        const hotelId = selectHotelDetail._id
        formData.append("userId", userId)
        formData.append("roomId", roomId)
        formData.append("hotelId", hotelId)



        const msg= await hotelBookingFun(formData)
        if (msg.success) {
            toast.success("Your booking is confirmed! Thank you for choosing us")
                    navigate("/")
                }
                else {
                    if (msg.res.status == 404) {
                        toast.error(msg.res.response.data.message)
                    }
                    else if(msg.res.status==409){
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
            const getDateArr=selectHotelDetail.room.availability
            const getMin=getDateArr[0]
            const getMax=getDateArr[getDateArr.length-1]
            setMinDate(getMin)
            setMaxDate(getMax)
            
        }
        if (!Cookies.get('AAUU_IIDD')){
            toast.error("Please Login Again! ")
            navigate("/signin")
        }
    }, [])
    return (
        <div className='d-flex justify-content-center' style={{
            width: '100%'
        }}>
            <div id='bookingForm' style={{
                marginTop: '30px'
            }}>
                <form className='pb-5' method='post' onSubmit={(e) => bookingFun(e)}>
                    <div class="mb-2">
                        <label htmlFor="fullname" class="form-label">Full Name</label>
                        <input type="text" name='fullName' class="form-control p-1" id="fullname" />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="guestname" class="form-label">Book Form New Name</label>
                        <input type="text" name='guestName' class="form-control p-1" id="guestname" />
                        <div id="emailHelp" class="form-text">Leave blank if booking for yourself</div>
                    </div>
                    <div class="mb-2">
                        <label htmlFor="phonenumber"  class="form-label">Phone Number</label>
                        <input type="text" maxLength={10} name='phoneNumber' class="form-control p-1" id="phonenumber" />
                    </div>

                    <div class="mb-2">
                        <label htmlFor="numguest" class="form-label">Number of Guests</label>
                        <input type="number" maxLength={3} name='guests' class="form-control p-1" id="numguest" />
                    </div>

                    <div class="mb-2 row gx-3 mt-4">
                        <div className="col-6">
                            <label htmlFor="checkin" class="form-label">Check In</label>
                            <input type="date" name='checkIn'
                            max={
                                getMaxDate
                                ? getMaxDate
                                : ""
                            }
                            min={
                                getMinDate
                                ? getMinDate
                                : ""
                            }
                            class="form-control p-1" id="checkin" />
                        </div>
                        <div className="col-6">
                            <label htmlFor="checkout" class="form-label">Check Out</label>
                            <input type="date" name='checkOut'
                            max={
                                getMaxDate
                                ? getMaxDate
                                : ""
                            }
                            min={
                                getMinDate
                                ? getMinDate
                                : ""
                            }
                            class="form-control p-1" id="checkout" /></div>
                    </div>
                    <div className="mb-2 mt-5">
                        <label htmlFor="specail" class="form-label">Special Request ( Optional )</label>
                        <div class="form-floating">
                            <textarea class="form-control" placeholder="Leave a comment here" id="specail" name='special' style={{ height: '100px', resize: 'none' }}></textarea>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary">Book Now</button>
                </form>
            </div>
        </div>
    )
}

export default Booking
