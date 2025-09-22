import { motion, scale } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'

function HotelCardComp({ data }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 1 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1 }}
            whileHover={{
                scale: 1.1,
                transition: { duration: 0.3, ease: "easeInOut" }
            }}
            className="col-sm-6 col-md-6 p-2 " style={{borderRadius:"10px"}}>
                
            <Link to={`/hotel-view/${data.id}`} className='col mb-3 bg-white' style={{ textDecoration: 'none', color: 'black' }}>
                <div className="card mb-3 px-3 rounded-3 " style={{ maxWidth: '540px' ,borderRadius:"20px" }}>
                    <div className="row g-0 pb-3 rounded-3">
                        <div className="col-md-4 gy-3">
                            <motion.img
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.3, ease: "easeInOut" }
                                }}
                                initial={{ opacity: 0, scale: 1 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 3, ease: "easeIn" }}
                                src={`${data.thumbnail}`} alt="..." style={{ width: '100%', height: '100%', objectFit: 'cover',borderRadius:"15px" }} />

                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{data.name}</h5>
                                <p className="card-text mb-0">{data.description.substring(0, 60) + "..."}</p>
                                <p className="card-text"><small className="text-muted">{data.rating}<i className="fa-solid fa-star" style={{color:"orange"}}></i></small></p>
                            </div>
                        </div>
                        <div className='w-full' style={{display:'flex',justifyContent:"end"}}>
                            {/* <motion.button
                            whileHover={{
                                boxShadow:"0px 0px 4px 0px #3b309b"
                                
                            }}
                            className='float-right' style={{backgroundColor:"#3b309b",
                                border:"none",
                                color:"white",
                                borderRadius:"5px",
                                padding:"5px 9px",
                                fontWeight:"bold",
                            }}>Book Now</motion.button> */}
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

export default HotelCardComp
