import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import intro from "../assets/intro.mp4"
function Intro() {
    const [showIntro, SethideIntro] = useState(true)
    useEffect(() => {
        const time_Out = setTimeout(() => {
            SethideIntro(false)
        }, 3000)

        return () => clearTimeout(time_Out)
    }, [])
    return (
        <AnimatePresence>
            {showIntro && (
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    style={{
                        position: "fixed",
                        zIndex: 999,
                        height: "100%",
                        width: "100%",
                        overflow: "hidden",
                    }}
                >
                    <video
                        src={intro}
                        muted
                        autoPlay
                        style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                            display: "block",
                        }}
                        onLoadedMetadata={(e) => {
                            e.target.playbackRate = 2.0; 
                        }}
                    ></video>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Intro
