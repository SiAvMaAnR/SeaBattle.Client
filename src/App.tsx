import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Home from "./pages/Home/Home";
import Room from "./pages/Room/Room";
import "./App.css";


const socket = io("http://localhost:3000");
const SocketContext = createContext(socket);

function App() {

  const [isConnected, setIsConnected] = useState(socket.connected);


  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    }
  }, []);


  return (
    <div className="app">
      <SocketContext.Provider value={socket}>
        <div>{isConnected ? "Connected" : "Not connected"}</div>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/room" element={<Room />} />
          </Routes>
        </BrowserRouter>
      </SocketContext.Provider>
    </div>

  );
}

export default App;
export { SocketContext };