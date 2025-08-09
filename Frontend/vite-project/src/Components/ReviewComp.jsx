import React from 'react'

function ReviewComp({rev}) {
  return (
    <div className="row g-0 p-2">
                            <div className="col-2">
                                <img src={
                                    !rev.userId.profile
                                    ? "http://localhost:8000/static/images/user3.png"
                                    :`http://localhost:8000/static/images/${rev.userId.profile}`

                                }style={{
                                    height: '60px',
                                    width: '60px'
                                }} className="rounded-circle" alt="..." />
                            </div>
                            <div className="col-md-8 mx-3" style={{
                                fontSize: '0.7rem'
                            }}>
                                <div className="card-body py-0 px-0">
                                    <h6 className="card-title mb-0">{rev.userId.username}</h6>
                                    <p className="card-text fs-normal">{rev.review}</p>
                                </div>
                            </div>
                        </div>
  )
}

export default ReviewComp
