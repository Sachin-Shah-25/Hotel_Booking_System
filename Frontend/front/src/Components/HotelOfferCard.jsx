import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'

function HotelOfferCard({ data }) {

    return (
        <motion.div initial={{ opacity: 0, scale: 1 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1 }}
            whileHover={{
                scale: 1.1,
                transition: { duration: 0.3, ease: "easeInOut" }
            }} className="col-lg-3 col-md-4 col-sm-6">

            <div className="card">
                <motion.img
                    whileHover={{
                        scale: 0.5,
                        borderRadius:"10px",
                        transition: { duration: 1, ease: "easeInOut" }
                    }}
                    src={`${data.thumbnail}`} alt="..." />
                <div className="card-body">
                    <h5 className="card-title text-center">{data.name}</h5>
                    <div className='text-center'>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                    </div>
                    <p className="card-text text-center">{data.description}</p>
                    <p className="card-text text-center"><i className="fa-solid fa-indian-rupee-sign"></i> {data.pricePerNight} Per Night</p>
                    <div className='text-center'>
                        <Link to={`/hotel-view/${data.id}`} className="btn" style={{ color: 'blue' }}>Check</Link>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default HotelOfferCard
