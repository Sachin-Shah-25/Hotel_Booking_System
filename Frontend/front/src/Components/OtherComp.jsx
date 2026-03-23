import React from 'react'
import { Link } from 'react-router-dom'

function OtherComp() {
  return (
    <div className="col-12">
                        <Link to={`/hotel-view/3`} className='col mb-3' style={{ textDecoration: 'none', color: 'black' }}>
                            <div className="card mb-3 px-3" style={{ maxWidth: '540px' }}>
                                <div className="row g-0 pb-3">
                                    <div className="col-md-4 gy-3">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR132TBAD0-GhGhN8_2Xr-3obkFd4NzFbk6Hg&s" className="img-fluid rounded-start" alt="..."  style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                                       
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">{"data.name"}</h5>
                                            <p className="card-text mb-0">{"data.description.substring(0,60)+"}</p>
                                            <p className="card-text"><small className="text-muted">{"data.rating"}<i className="fa-solid fa-star"></i></small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
  )
}

export default OtherComp
