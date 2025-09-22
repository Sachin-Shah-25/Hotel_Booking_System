import React from 'react'
import { FaUser } from "react-icons/fa6";
import user1 from '../assets/user1.png'
import payment from '../assets/payment.png'
import { MdMeetingRoom } from "react-icons/md";
import { FaBlogger } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { MdMessage } from "react-icons/md";
import { TbNetwork } from "react-icons/tb";
import { IoMdContacts } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { FaFacebook } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import logo from '../assets/logo.JPG'
function Footer() {
    return (
        <div className=' mt-5 bg-white  pt-5'>
                <div className='d-flex footter_left'>
            <div className='col-6' style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <div className='' style={{ width: "70px", height: "70px" }}>
                    <img src={logo} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                </div>
                <div>
                    <h4 className='h4'>Your Comfort, Our Priority</h4>
                </div>
            </div>
            <div className=' footer_right'>
                <h1>Quick Navigation</h1>
                <div className='d-flex justify-content-between'>
                    <div>
                        <div className='d-flex mt-2 align-items-center'>
                            <span> <FaUser /> </span>
                            <span className='ms-2' style={{ fontWeight: 500 }}>About Us</span>
                        </div>
                        <div className='d-flex mt-2 items-center'>
                            <span> <MdMeetingRoom /> </span>
                            <span className='ms-2' style={{ fontWeight: 500 }}>Rooms</span>
                        </div>
                        <div className='d-flex mt-2 items-center'>
                            <span> <FaBlogger /> </span>
                            <span className='ms-2' style={{ fontWeight: 500 }}>Blog</span>
                        </div>

                    </div>

                    <div>
                        <h1></h1>
                        <div className='d-flex mt-2 align-items-center'>
                            <span> <IoCall /> </span>
                            <span className='ms-2' style={{ fontWeight: 500 }}>Home</span>
                        </div>
                        <div className='d-flex mt-2 items-center'>
                            <span> <FaMapMarkerAlt /> </span>
                            <span className='ms-2' style={{ fontWeight: 500 }}>Booking</span>
                        </div>
                        <div className='d-flex mt-2 items-center'>
                            <span> <MdEmail /> </span>
                            <span className='ms-2' style={{ fontWeight: 500 }}>Contact Us</span>
                        </div>

                    </div>

                    <div>
                        <h1></h1>
                        <div className='d-flex mt-2 align-items-center'>
                            <span> <IoMdContacts /> </span>
                            <span className='ms-2' style={{ fontWeight: 500 }}>Contact Us</span>
                        </div>
                        <div className='d-flex mt-2 items-center'>
                            <span> <FaUser /> </span>
                            <span className='ms-2' style={{ fontWeight: 500 }}>Google Maps</span>
                        </div>
                        <div className='d-flex mt-2 items-center'>
                            <span> <FaUser /> </span>
                            <span className='ms-2' style={{ fontWeight: 500 }}>Email</span>
                        </div>

                    </div>
                </div>
            </div>
            </div>

            <div className='d-flex pt-5 footer_bottom '>
                <div className=' footer_bottom_left d-flex flex-column align-items-center justify-content-center'>
                    <h1>Softom Aligment</h1>
                    <div className='d-flex gap-4 fs-3 mt-1'>
                        <div> <FaFacebook/> </div>
                        <div> <FaInstagramSquare/> </div>
                        <div> <FaYoutube/> </div>
                        <div> <FaSquareXTwitter/> </div>
                    </div>
                </div>
                <div className=" footer_bottom_right bg-dark d-flex justify-content-center text-white pb-5 ">
                    <div className='pt-5 ' style={{padding:"0px 20px"}}>
                        <h3>Newsletter</h3>
                        <div className='' style={{width:"100%"}}>
                            <input type="text"
                            className='bg-dark'
                            placeholder='Email Subscription' style={{
                                width:"100%",
                                border:"2px solid white",
                                background:"black",
                                padding:"6px 5px"
                                }} />
                        </div>
                        <div className='col d-flex mt-1 justify-content-end'>
                            <button className='' style={{border:"none",padding:"3px 8px",backgroundColor:"orange"}}>Subscribe</button>
                        </div>
                        <div className='mt-5'>
                            <h5 className='mb-0'>Payment methods</h5>
                            <img src={payment} alt="" className='mt-0 pt-0' style={{width:"100%",height:"100%"}} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-center p-5'>
                <h6>© 2025 HotelBooking. All Rights Reserved</h6>
            </div>
        </div>
    )
}

export default Footer
