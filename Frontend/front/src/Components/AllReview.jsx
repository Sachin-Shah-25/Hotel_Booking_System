import React from 'react'

function AllReview({ rev }) {
    return (
        <div className="row p-2 border rounded mt-3">
            <div className="col-lg-1">
                <img src={
                    !rev.userId.profile
                        ? "http://localhost:8000/static/images/user3.png"
                        : `http://localhost:8000/static/images/${rev.userId.profile}`

                } style={{
                    height: '60px',
                    width: '60px',
                    objectFit: "cover"
                }} className="rounded-circle" alt="..." />
            </div>
            <div className="col-8 px-0" style={{
                fontSize: '0.7rem'
            }}>
                <div className="card-body py-0 ">
                    <h6 className="card-title mb-0 text-capitalize">{rev.userId.username}</h6>
                    <p className="card-text bg-[#f7fbff] fs-normal mt-1 text-capitalize py-1 mt-2 px-2 rounded ">{rev.review}</p>
                </div>
            </div>
        </div>
    )
}

export default AllReview
