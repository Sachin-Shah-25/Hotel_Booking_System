import React, { useContext, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AppContext } from './ContextProv/AppProvider'
import HotelOfferCard from './Components/HotelOfferCard'
import ReviewComp from './Components/ReviewComp'
import AllReview from './Components/AllReview'
import Intro from './Components/Intro'
import { div } from 'framer-motion/client'
import { motion } from 'framer-motion'
import Footer from './Components/Footer'
import user1 from './assets/user1.png'
function HotelView() {
    const { getHotelDetailsById, AllReviews, selectHotelDetail, hotelData, getUser } = useContext(AppContext)
    const { id } = useParams()
    const boxRef = useRef(null)



    useEffect(() => {
        getHotelDetailsById(id)
    }, [id])
    console.log(selectHotelDetail)
    if (!selectHotelDetail) return
    return (
        <div>
            <Intro />
            <div className='container-fluid gx-5'>
                <div className="mt-2">
                    <a className="navbar-brand" href="/"><div style={{ height: '50px', width: '50px' }}><img src={
                        getUser && getUser.profile
                            ? `http://localhost:8000/static/images/${getUser.profile}`
                            : user1
                           } className="img-fluid  rounded-circle" alt="..." style={{
                                height: '100%',
                                width: '100%',
                                objectFit: "cover",
                                border: "1px solid #7352d7"
                            }} /></div></a>

                </div>
                <div id='hotelview' className="row border py-3 px-3">
                    <h1 className='fs-2'>{selectHotelDetail.city}</h1>
                    <p className='text'> {selectHotelDetail.description}</p>
                    <div className="col-lg-8 col-md-8">
                        <div className="row">
                            <div className="col-8 overflow-hidden " ref={boxRef} >

                                <motion.img
                                    drag
                                    dragConstraints={boxRef}
                                    initial={{ scale: 1 }}
                                    whileHover={{ scale: 1.2, transition: { duration: 1, ease: "easeOut" } }}
                                    src={selectHotelDetail.thumbnail}
                                    style={{ width: '100%' }}
                                    alt="..."
                                    draggable={false}

                                />
                            </div>
                            <div className="col-4">
                                <div className="col"> <img src={`${selectHotelDetail.thumbnail}`} className="img-fluid rounded-start" style={{ width: '100%', transform: 'scaleX(-1)' }} alt="..." /></div>
                                <div className="col mt-3"> <img src={`${selectHotelDetail.thumbnail}`} className="img-fluid rounded-start" style={{ width: '100%' }} alt="..." /></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 view_detail col-md-4 border rounded-3 py-3">
                        <h1 className='fs-2'>{selectHotelDetail.name} <span></span></h1>
                        <p className='mt-3'>  <span className='bg-primary text-white rounded p-1 ' style={{ fontSize: '0.7rem', fontStyle: 'italic' }}>{selectHotelDetail.getParticularRoom.type}</span> <span className='ms-3'>{selectHotelDetail.getParticularRoom.capacity} guests</span></p>
                        <p className='mb-1'><span className=''><i className="fa-solid fa-indian-rupee-sign"></i>{selectHotelDetail.getParticularRoom.pricePerNight}</span> <span>Price Per Night</span> <span>+ GST</span></p>

                        <p className="card-text"><small className="text-muted">{selectHotelDetail.rating}<i style={{ color: 'orange' }} className="fa-solid fa-star"></i></small></p>
                        <Link to={"/booking"} className="btn btn-primary fw-bold">BOOK NOW</Link>
                        <div className="card mt-5" >

                            {
                                AllReviews[0]
                                    ? <ReviewComp rev={AllReviews[0]} ></ReviewComp>
                                    : ""
                            }
                        </div>
                    </div>
                </div>

                <div className='mt-5'>
                    <h4>Amenities</h4>
                    <div className="d-flex gap-3 mt-1  py-2 rounded">
                        {
                            !selectHotelDetail.getParticularRoom.amenities
                                ? ""
                                : selectHotelDetail.getParticularRoom.amenities.map((elem) => {
                                    return <div className="bg-secondary rounded px-3 py-1 text-white">
                                        <span><i className="fa-solid fa-star"></i></span>
                                        <span className='ms-3'>{elem}</span>
                                    </div>
                                })
                        }

                    </div>
                </div>
                <div className="card mt-5" style={{ border: "none " }}>

                    {
                        AllReviews && AllReviews.map((rev) => {
                            return <AllReview key={rev._id} rev={rev} ></AllReview>
                        })

                    }
                </div>

                <div className=" row gx-3 gy-5 suggest_container mt-1 mb-5">

                    {
                        hotelData
                            ? hotelData.slice(-10).map((elem) => {
                                return <HotelOfferCard data={elem} ></HotelOfferCard>
                            })
                            : ""
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default HotelView
