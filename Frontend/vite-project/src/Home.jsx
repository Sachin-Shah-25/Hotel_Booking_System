import React, { useContext } from 'react'
import Navabar from './Navabar'
import { AppContext } from './ContextProv/AppProvider'
import HotelCardComp from './Components/HotelCardComp'

function Home() {

    
    const {currHotelDetail}=useContext(AppContext)
    return (
        <div className="conainer-fluid">
            <Navabar />
            <div className='container mt-5'>


                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner" style={{
                        height: '450px'
                    }}>
                        <div className="carousel-item active" style={{

                        }}>
                            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c" className="img-fluid rounded-start" alt="..." style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }} />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb" className="img-fluid rounded-start" alt="..." style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }} />
                        </div>
                        <div className="carousel-item">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR132TBAD0-GhGhN8_2Xr-3obkFd4NzFbk6Hg&s" className="img-fluid rounded-start" alt="..." style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }} />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>


                <div className='row gx-5 mt-5 gy-4'>
                    {
                        currHotelDetail
                        ? currHotelDetail.map((elem,id)=>{
                            return <HotelCardComp data={elem} key={id}></HotelCardComp>
                        })
                        : <div className='d-flex align-items-center justify-content-center p-5' style={{
                            height:'300px'
                        }}>
                            <h1 className='fw-bold' style={{
                                color:'gray',
                                fontSize:'3.5rem'
                            }}>Nothing To Show</h1>
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}

export default Home
