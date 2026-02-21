import React, { useEffect, useState } from "react"
import { io } from "socket.io-client"

const socket = io("http://localhost:3000")

function App() {
  const [buffer, setBuffer] = useState([])

  useEffect(() => {
    socket.on("bufferUpdate", (data) => {
      setBuffer(data)
    })

    return () => {
      socket.off("bufferUpdate")
    }
  }, [])

  return (
  <div
    style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1e3c72, #2a5298)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: "40px",
      color: "white",
      fontFamily: "Segoe UI"
    }}
  >
    <h1 style={{ marginTop: "170px" }}>
      Simulación Productor - Consumidor
    </h1>

    <p style={{ marginTop: "10px"}}>
      Elementos en buffer: {buffer.length}
    </p>

    <div
      style={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "15px",
        display: "flex",
        gap: "15px",
        minHeight: "10px",
        alignItems: "center"
      }}
    >
      {buffer.map((item, index) => (
        <div
          key={index}
          style={{
            width: "90px",
            height: "80px",
            borderRadius: "10px",
            backgroundColor: "#2a5298",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            transition: "0.3s"
          }}
        >
          {item}
        </div>
      ))}
    </div>
  </div>
)
}

export default App