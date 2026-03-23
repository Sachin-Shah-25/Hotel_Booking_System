import React, { useContext, useEffect, useRef, useState } from 'react'
import Navabar from './Navabar'
import { AppContext } from './ContextProv/AppProvider'
import HotelCardComp from './Components/HotelCardComp'
import {LoadingCom} from './Components/LoadingCom'
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

import NotFound from './Components/NotFound'
import { motion, scale } from 'framer-motion'




function Home() {
    let arr = ["Face1", "Face2", "Face3", "Face4", "Face5"]
    const { currHotelDetail, setHotelData, setCurrHotelDetail, hotelData } = useContext(AppContext)
    const lastRef = useRef(null)
    const moveTo = useRef(null)
    const page = useRef(10)
    const scrollTop = useRef(0)
    const [loading, setLoading] = useState(false);
    const [showLoading, HideLoading] = useState(true)
    //   useEffect(()=>{
    // fetch("http://localhost:8000/add/hoteldata").then((res)=>{
    //     console.log(res)
    // }).catch(e=>console.log(e.message))
    //   },[])

    useEffect(() => {
        console.log("MOUNTED");
       
        const observer = new IntersectionObserver((entries) => {
            console.log("hi")
            if (page.current >= hotelData.length) {
                HideLoading(false);
                return;
            }
            if (entries[0].isIntersecting) {
                console.log("1")
                if (loading) return
                setLoading(true)
                setCurrHotelDetail(prev => {

                    const arr = [...prev, ...hotelData.slice(page.current, page.current + 10)]
                    console.log(arr)
                    page.current = page.current + 10
                    console.log("2")

                    return arr
                })

                setTimeout(() => {
                    setLoading(false)
                }, 300);

            }
        })
        console.log("hii")
        observer.observe(lastRef.current)
        return () => observer.disconnect();

    }, [])

    useEffect(() => {
        moveTo.current.scrollIntoView({
            behavior: "smooth"
        })
    }, [currHotelDetail])

    return (
        <div className='' style={{ width: "100%" }}>
            <Navabar />
            <div className="h-full" style={{ background: "#ebebeb" }}>
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
                <div className="container mt-2" ref={moveTo}>
                    {console.log(currHotelDetail)}
                    {
                        currHotelDetail.length == 0
                            ? <NotFound />
                            : <div className='w-full'>
                                <div className='mt-5'>
                                    <h1>Featured Hotels</h1>

                                    <div  className='row gx-3 gy-1  mt-2 w-full   rounded-3'>
                                        {currHotelDetail.map((elem, id) => {
                                            return <HotelCardComp data={elem} key={elem._id}></HotelCardComp>
                                        })
                                        }

                                    </div>
                                    {
                                        showLoading ?
                                            // ? <div ref={lastRef} style={{ marginTop: "10vh", width: "100%", display: "flex", justifyContent: "center", gap: "10px" }}>
                                            //     <motion.div
                                            //         initial={{ opacity: 0, scale: 0.8 }}
                                            //         animate={{ opacity: 1, scale: 1.1 }}
                                            //         transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                                            //     >
                                            //         <div style={{ width: "15px", height: "15px", borderRadius: "50%", backgroundColor: "gray" }} ></div>
                                            //     </motion.div>
                                            //     <motion.div
                                            //         initial={{ opacity: 0, scale: 0.8 }}
                                            //         animate={{ opacity: 1, scale: 1.1 }}
                                            //         transition={{ duration: 0.9, repeat: Infinity, repeatType: "reverse" }}
                                            //     >
                                            //         <div style={{ width: "15px", height: "15px", borderRadius: "50%", backgroundColor: "gray" }} ></div>
                                            //     </motion.div>
                                            //     <motion.div
                                            //         initial={{ opacity: 0, scale: 0.8 }}
                                            //         animate={{ opacity: 1, scale: 1.1 }}
                                            //         transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                                            //     >
                                            //         <div style={{ width: "15px", height: "15px", borderRadius: "50%", backgroundColor: "gray" }} ></div>
                                            //     </motion.div>
                                            // </div>
                                            <LoadingCom ref={lastRef} ></LoadingCom>
                                            : ""
                                    }
                                </div>

                                {/* <div className='mt-5 mb-5'>
                                    <h1> Special Offers</h1>

                                    <div className='special_offer_image mt-3 d-flex ' style={{ gap: "20px" }} >
                                        <div className='offer_image1' style={{ height: "250px", width: "350px" }}>
                                            <img src={bg1} className='' style={{ borderRadius: "20px", width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                                        </div>
                                        <div className='offer_image2' style={{ height: "250px", width: "100%" }}>
                                            <img src={bg2} className='' style={{ borderRadius: "20px", width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                                        </div>
                                    </div>

                                </div> */}

                                <div className='services_container mt-5' >
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
                                <div className='px-2' style={{ marginTop: "80px", paddingBottom: "40px" }}>
                                    <div className='mt-5'>
                                        <h1 id='test_head' >Testimonials</h1>
                                    </div>
                                    <div className='row g-3' style={{
                                    }}>
                                        {
                                            arr.map((item, index) => {
                                                return <Test img={item} key={index} id={index} ></Test>
                                            })
                                        }
                                    </div>
                                </div>
                                <div className=' overflow-hidden' >

                                </div>
                            </div>
                    }


                </div>
                <Footer />
            </div>

        </div>
    )
}

export default Home
