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
    <div style={{ textAlign: "center", fontFamily: "Arial" }}>
      <h1>Estado del Buffer</h1>
      <div>
        {buffer.map((item, index) => (
          <div
            key={index}
            style={{
              display: "inline-block",
              width: "60px",
              height: "60px",
              margin: "5px",
              lineHeight: "60px",
              border: "2px solid black",
              fontWeight: "bold"
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