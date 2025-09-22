import React from 'react'
import v from "../assets/react.svg"
import { RiStarSFill } from "react-icons/ri";
import user1 from '../assets/user1.png'
import Face1 from '../assets/Face1.jpeg'
import Face2 from '../assets/Face3.jpeg'
import Face3 from '../assets/Face3.jpeg'
import Face4 from '../assets/Face4.jpeg'
import Face5 from '../assets/Face5.jpeg'

function Test({img,id}) {
    let arr=[Face1,Face2,Face3,Face4,Face5]
    return (
        <div className='col-2 bg-white test ' style={{ boxShadow: "0px 0px 1px 0px black", borderRadius: "5px", padding: "8px 8px" }}  >
            <div className='d-flex'>
                <div className='' style={{ width: "60px", height: "60px" }}>
                    <img src={arr[id]} alt="" className='border border-dark' style={{ borderRadius: "100%", objectFit: "cover", width: "100%", height: "100%" }} />
                </div>
                <div className='ms-3'>
                    <h5 className='mb-0' style={{ paddingBottom: "0" }}>Richard</h5>
                    <div>
                        <span style={{color:"orange"}}><RiStarSFill /> </span>
                        <span style={{color:"orange"}}><RiStarSFill /> </span>
                        <span style={{color:"orange"}}><RiStarSFill /> </span>
                        <span style={{color:"orange"}}><RiStarSFill /> </span>
                    </div>
                </div>
            </div>
            <div className='mt-3'>
                <h6 style={{ lineHeight: "18px", fontSize: "0.7rem" }}>Lorerum.labore distinctio architecto sed dolores ipsum. Consequuntur, voluptas.</h6>
            </div>
        </div>
    )
}

export default Test
