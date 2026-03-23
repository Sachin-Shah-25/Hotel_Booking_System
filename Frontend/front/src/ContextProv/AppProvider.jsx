import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
import ErrorComponent from '../Components/ErrorComponent'
const VITE_ALL_DATA = import.meta.env.VITE_ALL_DATA
const VITE_SIGNUP = import.meta.env.VITE_SIGNUP
const VITE_LOGIN = import.meta.env.VITE_LOGIN
const VITE_BOOKING_URL = import.meta.env.VITE_BOOKING_URL
const VITE_MY_PROFILE = import.meta.env.VITE_MY_PROFILE
const VITE_MY_BOOKING = import.meta.env.VITE_MY_BOOKING
const VITE_UPDATE_PROFILE = import.meta.env.VITE_UPDATE_PROFILE

export const AppContext = createContext()

const ContextProvider = ({ children }) => {
    const [err, setErr] = useState("")
    const [hotelData, setHotelData] = useState([])
    const [currHotelDetail, setCurrHotelDetail] = useState([])
    const [selectHotelDetail, setSelectHotelDetail] = useState()
    const [getUser, setUser] = useState("")
    const [HotelBooked, setHotelBooked] = useState([])
    const [AllReviews, setAllReviews] = useState([])
    const [reviewId, setReviewId] = useState("")




    const getDataOfHotels = async () => {
        try {
            const res = await axios.get(VITE_ALL_DATA);
            console.log(res.data.mydata)
            const data = res.data?.mydata
            if (!data || data.length == 0) {
                throw new Error("No Data Found")
            }
            setHotelData(data)
            setCurrHotelDetail(data.slice(0,10))
        }
        catch (e) {
            console.log("Error : ", e.message)
        }
        // axios.get(VITE_ALL_DATA)
        //     .then((data) => {

        //         if (data.data.mydata.length == 0) {
        //             throw new Error("Something went wrong")
        //         }
        //         const getData = [...data.data.mydata]
        //         setHotelData(getData)
        //         setCurrHotelDetail([...getData.slice(0, 10)])

        //     }).catch(e => {
        //         console.log("Error ", e.message)
        //     })
    }
    const getHotelDetailsById = async (id) => {
        console.log("hi")
        try {
            const res = await axios.get(`${VITE_ALL_DATA}/${id}`)
            console.log("my data ",res.data)

            const data = res.data?.mydata
            const reviews = res.data?.allreviews
            if (!data || data.length == 0) {
                throw new Error("No Found")
            }
            setSelectHotelDetail(data)
            setAllReviews(reviews)
        }
        catch (e) {
            console.log("Error : ", e.message)
        }
        // axios.get(`${VITE_ALL_DATA}/${id}`)
        //     .then((data) => {
        //         if (data.status != 200) {
        //             setErr("Not Found")
        //             throw new Error("Something Went Wrong")
        //         }
        //         if (data.data.mydata.length == 0) {
        //             setErr("Not Found")
        //             throw new Error("Something went wrong ")
        //         }
        //         setAllReviews([...data.data.allreviews])
        //         setSelectHotelDetail(data.data.mydata)

        //     }).catch(e => {
        //         if(e.status==404){
        //             toast.error(e.response.data.message)
        //         }
        //         else {
        //             console.log("Error ",e.message)
        //         }
        //     })
    }
    const filterFun = (value) => {
        if (value == "" || !value) {
            setCurrHotelDetail([...hotelData.slice(0, 10)])
            return
        }
        const filterData = hotelData.filter((elem) =>
            elem.city.toLowerCase().includes(value.toLowerCase())
        )
        if (filterData.length == 0) {
            toast.info("Not Found")
            return
        }
        console.log(filterData)
        setCurrHotelDetail(filterData)
    }
    const registerUserFun = (data) => {

        // const res = axios.post(VITE_SIGNUP, data, {
        //     withCredentials: 'include'
        // }).then((data) => {
        //     if (data.status != 200) {
        //         setErr("Something Went Wrong")
        //         throw new Error("Something Went Wrong")
        //     }
        //     return { "success": true, "res": "Successfull" }
        // }).catch((e) => {
        //     return { "success": false, "res": e }
        // })
        // return res;
    }
    const loginUserFun = async (data) => {

        // const res =await axios.post(VITE_LOGIN, data, {
        //     withCredentials: 'include'
        // }).then((data) => {
        // if (data.status != 200) {
        //     throw new Error("Something Went Wrong")
        // }
        // setUser(data.data.mydata)
        // return { "success": true, "res": "Successfull" }
        // }).catch((e) => {
        // console.log(e)
        // return { "success": false, "res": e }

        //    return <ErrorComponent></ErrorComponent>
        // })
        // return res
    }

    const hotelBookingFun = (data) => {
        console.log("booking ",Object.fromEntries(data))
        const res = axios.post(VITE_BOOKING_URL, data, {
            withCredentials: 'include'
        }).then((data) => {
            if (data.status != 201 && data.status != 200) {
                throw new Error("Something went wrong")
            }
            return { "success": true, "res": "Successfull", mydata: data.data.mydata }
        }).catch((e) => {
            console.log(e.message)
            return { "success": false, "res": e }
        })
        return res
    }

    const getUserFun = () => {
            console.log("getUserFun")

        axios.get(VITE_MY_PROFILE, {
            withCredentials: true
        }).then((data) => {
            console.log("ge ue ", data.data.mydata)
            setUser(data.data.mydata)
        }).catch((e) => {
            console.log("error")
            console.log("Error : ", e.message)
        })
    }

    const myHotelBookedFun = () => {
        axios.get(VITE_MY_BOOKING, {
            withCredentials: true
        })
            .then((data) => {
                if (data.status != 200) throw new Error("Something Went Wrong")
                const getMyData = data.data.mydata
                const filterData = getMyData.map((elem, id) => {
                    const check_In = elem.checkIn.split("T")[0]
                    const check_Out = elem.checkOut.split("T")[0]
                    const updateData = { ...elem, checkIn: check_In, checkOut: check_Out }
                    return updateData
                })
                console.log(filterData)
                setHotelBooked(filterData)
            }).catch((e) => {
                console.log(e)
            })
    }

    const updateProfileFun = (profile) => {
        console.log("my ",Object.fromEntries(profile))
        axios.post(VITE_UPDATE_PROFILE, profile, {
            withCredentials: 'include'
        })
            .then((res) => {
                const PROFILE_UPDATE = toast.loading("Updating...")
                setTimeout(() => {
                    if (toast.isActive(PROFILE_UPDATE)) toast.dismiss(PROFILE_UPDATE)

                }, 1000)
            }).catch((err) => {
                if (err.status == 404) {
                    toast.error(err.response.data.message)
                }
                else {
                    toast.error("Something Went Wrong")
                }
            })
    }

    useEffect(() => {
        getDataOfHotels()
    }, [])

    return <AppContext.Provider value={{ err, hotelData, setErr, currHotelDetail, getHotelDetailsById, selectHotelDetail, filterFun, registerUserFun, loginUserFun, getUser, setUser, getUserFun, hotelBookingFun, myHotelBookedFun, HotelBooked, updateProfileFun, setAllReviews, AllReviews, reviewId, setReviewId ,setCurrHotelDetail}}>
        {children}
    </AppContext.Provider>
}

export default ContextProvider

