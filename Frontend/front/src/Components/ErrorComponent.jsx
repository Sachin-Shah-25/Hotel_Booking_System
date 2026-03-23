import React from 'react';

function ErrorComponent({info,setIsError}) {
  console.log(info);

  setTimeout(()=>{
    setIsError({show:false})
  },1000)
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8f9fa"
      }}
    >
      <h1 style={{ fontSize: "80px", margin: 0 }}>{info.errorCode}</h1>
      <p style={{ fontSize: "20px", color: "gray" }}>
        {info.errorMessage}
      </p>
    </div>
  );
}

export default ErrorComponent;