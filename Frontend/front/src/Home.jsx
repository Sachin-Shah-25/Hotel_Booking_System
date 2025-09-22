import React, { useContext, useEffect } from 'react'
import Navabar from './Navabar'
import { AppContext } from './ContextProv/AppProvider'
import HotelCardComp from './Components/HotelCardComp'
import Intro from './Components/Intro'
import intro from './assets/intro.mp4'

import bg1 from './assets/bg1.JPG'
import bg2 from './assets/bg2.JPG'
import Test from './Components/Test'
import Footer from './Components/Footer'
import logo1 from './assets/logo1.png'

import { IoWifi } from "react-icons/io5";
import { MdOutlineSportsGymnastics } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { MdOutlinePool } from "react-icons/md";
import { LuClub } from "react-icons/lu";



function Home() {
    let arr=["Face1","Face2","Face3","Face4","Face5"]


    const { currHotelDetail } = useContext(AppContext)
    return (
        <div className='' style={{ width: "100%" }}>
            <Navabar />
            <div className="" style={{ background: "#ebebeb" }}>
                <Intro />
                <div style={{ width: "100%", height: "450px", position: "relative" }}>
                    <video src={intro} muted controls={false}
                        autoPlay loop={true} style={{ width: "100%", display: "block", height: "100%", objectFit: "cover" }} alt="" />

                    <div className='' style={{ position: "absolute", top: "50px", left: "50%", transform: "translateX(-50%)" }}>
                        <div className='d-flex justify-content-center'>
                            <div className='' style={{ width: "80px", height: "80px" }}>
                                <img src={logo1} style={{ width: "100%", height: "100%" }} alt="" />
                            </div>
                        </div>
                        <h1 className='text-center' style={{ fontSize: "7rem", display: "block", color: 'transparent', WebkitTextStroke: "2px white" }}>HOUE</h1>
                        <h1 className='text-center text-white' style={{ fontSize: "3rem" }}>Find Your Perfect Stay</h1>
                    </div>
                </div>
                <div className='container mt-2'>
                    <div className='mt-5'>
                        <h1>Featured Hotels</h1>

                        <div className='row gx-3 gy-1  mt-2 w-full   rounded-3'>
                            {
                                currHotelDetail
                                    ? currHotelDetail.map((elem, id) => {
                                        return <HotelCardComp data={elem} key={id}></HotelCardComp>
                                    })
                                    : <div className='d-flex align-items-center justify-content-center p-5' style={{
                                        height: '300px'
                                    }}>
                                        <h1 className='fw-bold' style={{
                                            color: 'gray',
                                            fontSize: '3.5rem'
                                        }}>Nothing To Show</h1>
                                    </div>
                            }

                        </div>
                    </div>

                    <div className='mt-5 mb-5'>
                        <h1> Special Offers</h1>

                        <div className='special_offer_image mt-3 d-flex ' style={{ gap: "20px" }} >
                            <div className='offer_image1' style={{ height: "250px", width: "100%" }}>
                                <img src={bg1} className='' style={{ borderRadius: "20px", width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                            </div>
                            <div className='offer_image2' style={{ height: "250px", width: "100%" }}>
                                <img src={bg2} className='' style={{ borderRadius: "20px", width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                            </div>
                        </div>

                    </div>

                    <div className='services_container' >
                        <h1 >Services</h1>
                        <div className='services'>
                            <div className='service_left'>
                                <div>
                                    <span> <IoWifi /> </span>
                                    <span>Free Wi-Fi</span>
                                </div>
                                <div>
                                    <span> <MdOutlinePool /> </span>
                                    <span>Pool Spa</span>
                                </div>
                                <div>
                                    <span> <MdOutlineSportsGymnastics /> </span>
                                    <span>Spa Gym</span>
                                </div>

                            </div>
                            <div className='service_right'>
                                <div>
                                    <span> <IoFastFoodOutline /> </span>
                                    <span>Free Breakfast</span>
                                </div>
                                <div>
                                    <span> <LuClub /> </span>
                                    <span>Club</span>
                                </div>
                                <div>
                                    <span> <MdSupportAgent /> </span>
                                    <span>24/7 Support</span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='' style={{ marginTop: "80px", paddingBottom: "40px" }}>
                        <div className='mt-5'>
                            <h1 id='test_head' >Testimonials</h1>
                        </div>
                        <div className='mt-3 test_container d-flex  gutter-0 justify-content-between'>
                           {
                            arr.map((item,index)=>{
                                return <Test img={item} key={index} id={index} ></Test>
                            })
                           }
                        </div>
                    </div>
                </div>
            </div>
            <div className=' overflow-hidden' >
                <Footer />

            </div>
        </div>
    )
}

export default Home
