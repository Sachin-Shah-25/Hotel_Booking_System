import React from 'react'
import {motion,scale}from 'framer-motion'
export const LoadingCom=React.forwardRef((value,ref)=>{

    return (
    <div ref={ref} style={{ marginTop:value? "0" : "10vh", width: value?"":"100%", display: "flex", justifyContent: "center", gap: "10px" }}>
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.1 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        >
            <div style={{ width: value?"8px": "15px", height: value?"8px": "15px", borderRadius: "50%", backgroundColor: "gray" }} ></div>
        </motion.div>
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.1 }}
            transition={{ duration: 0.9, repeat: Infinity, repeatType: "reverse" }}
        >
            <div style={{ width: value?"8px": "15px", height: value?"8px": "15px", borderRadius: "50%", backgroundColor: "gray" }} ></div>
        </motion.div>
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.1 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        >
            <div style={{ width: value?"8px": "15px", height: value?"8px": "15px", borderRadius: "50%", backgroundColor: "gray" }} ></div>
        </motion.div>
    </div>

    )
})