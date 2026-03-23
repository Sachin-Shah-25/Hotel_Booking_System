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
        <div className='mt-5 bg-white' >
            <div className='d-flex footter_left px-5' style={{ background: "#4e46bf", color: "white" }}>

                <div className="footer_right p-4">
                    <h4 className="mb-4">Quick Navigation</h4>

                    <div className="row">

                        <div className="col-6 col-md-3 mb-3">
                            <div className="d-flex mt-2 align-items-center">
                                <FaUser />
                                <span className="ms-2 fw-medium">About Us</span>
                            </div>

                            <div className="d-flex mt-2 align-items-center">
                                <MdMeetingRoom />
                                <span className="ms-2 fw-medium">Rooms</span>
                            </div>

                            <div className="d-flex mt-2 align-items-center">
                                <FaBlogger />
                                <span className="ms-2 fw-medium">Blog</span>
                            </div>
                        </div>

                        <div className="col-6 col-md-3 mb-3">
                            <div className="d-flex mt-2 align-items-center">
                                <IoCall />
                                <span className="ms-2 fw-medium">Home</span>
                            </div>

                            <div className="d-flex mt-2 align-items-center">
                                <FaMapMarkerAlt />
                                <span className="ms-2 fw-medium">Booking</span>
                            </div>

                            <div className="d-flex mt-2 align-items-center">
                                <MdEmail />
                                <span className="ms-2 fw-medium">Contact Us</span>
                            </div>
                        </div>

                        <div className="col-6 col-md-3 mb-3">
                            <div className="d-flex mt-2 align-items-center">
                                <IoMdContacts />
                                <span className="ms-2 fw-medium">Contact Us</span>
                            </div>

                            <div className="d-flex mt-2 align-items-center">
                                <FaUser />
                                <span className="ms-2 fw-medium">Google Maps</span>
                            </div>

                            <div className="d-flex mt-2 align-items-center">
                                <FaUser />
                                <span className="ms-2 fw-medium">Email</span>
                            </div>
                        </div>

                        <div className="col-6 col-md-3 mb-3 d-flex flex-md-column gap-3 fs-4">
                            <FaFacebook />
                            <FaInstagramSquare />
                            <FaYoutube />
                            <FaSquareXTwitter />
                        </div>

                    </div>
                </div>
            </div>

            <div className='d-flex footer_bottom '>
                {/* <div className=' footer_bottom_left d-flex flex-column align-items-center justify-content-center'>
                    <h1>Softom Aligment</h1>
                    <div className='d-flex gap-4 fs-3 mt-1'>
                        <div> <FaFacebook /> </div>
                        <div> <FaInstagramSquare /> </div>
                        <div> <FaYoutube /> </div>
                        <div> <FaSquareXTwitter /> </div>
                    </div>
                </div> */}
                <div className=" footer_bottom_right bg-dark d-flex justify-content-center text-white pb-5 ">
                    <div className='pt-5 ' style={{ padding: "0px 20px" }}>
                        <h3>Newsletter</h3>
                        <div className='' style={{ width: "100%" }}>
                            <input type="text"
                                className='bg-dark'
                                placeholder='Email Subscription' style={{
                                    width: "100%",
                                    border: "2px solid white",
                                    background: "black",
                                    padding: "6px 5px",
                                    color: "white",
                                    borderRadius: "10px"
                                }} />
                        </div>
                        <div className='col d-flex mt-1 justify-content-end'>
                            <button className='' style={{ border: "none", padding: "5px 12px", backgroundColor: "orange", borderRadius: "10px", color: "white", fontWeight: "bold", marginTop: "5px" }}>Subscribe</button>
                        </div>
                        <div className='mt-5'>
                            <h5 className='mb-0'>Payment methods</h5>
                            <img src={payment} alt="" className='mt-0 pt-0' style={{ width: "100%", height: "100%" }} />
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
