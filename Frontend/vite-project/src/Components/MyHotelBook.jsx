import React, { useContext } from 'react'
import { AppContext } from '../ContextProv/AppProvider'

function MyHotelBook({booking}) {
  const {setReviewId} =useContext(AppContext)
  return (
 

    <div
      className="card shadow-sm mb-4 p-5 border-0"
      style={{
        borderRadius: '15px',
        overflow: 'hidden',
        background: '#f8f9fa'
      }}
      key={"index"}
    >
      <div className="row g-5">
        {/* Left Image Section */}
        <div className="col-md-4">
          <img
            src={booking.hotelId.thumbnail}
            className="img-fluid h-100 w-100 rounded"
            alt={"booking.hotelName"}
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Right Detail Section */}
        <div className="col-md-8">
          <div className="card-body">
            <h4 className="card-title mb-2 text-primary fw-bold">
              {booking.fullName}
            </h4>
            <p className="card-text mb-1">
              <strong>Location:</strong> {booking.hotelId.city+" , "+booking.hotelId.name}
            </p>
            <p className="card-text mb-1">
              <strong>Check-in:</strong> {booking.checkIn}
            </p>
            <p className="card-text mb-1">
              <strong>Check-out:</strong> {booking.checkOut}
            </p>
            <p className="card-text mb-3">
              <strong>Guests:</strong> {booking.guests}
            </p>
            <button className="btn btn-outline-danger btn-sm" onClick={()=> alert("Your booking will cancel within 1 hour")}>Cancel Booking</button>
            <button className="btn btn-outline-success btn-sm ms-5" onClick={()=> setReviewId(booking.roomId._id)}>Review</button>
          </div>
        </div>
      </div>
</div>

  )
}

export default MyHotelBook
