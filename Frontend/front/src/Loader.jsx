function Loader(){


    return <>
    <div className="loader_bg" style={{height:"100vh",overflow:"hidden"}}>
     <div className="loader_div" style={{height:"100vh",overflow:"hidden"}}>
        <div className="overlay"style={{height:"100vh",width:"100%"
            ,display:"flex",
            alignItems:"center",
            justifyContent:"center"
        }}>
            <div>
            <div className="load" style={{height:"50px",width:"50px",
                borderTop:"2px solid white",
                borderRadius:"50%"}}>
                    
                </div>
                <h1 style={{color:"white",fontFamily:"cursive"}}>Loading....</h1>
                </div>
        </div>
     </div>
    </div>
    </>
}

export default Loader