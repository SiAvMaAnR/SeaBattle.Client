import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Game from "./pages/Game/Game";
import Rooms from "./pages/Rooms/Rooms";


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
        <Navbar isConnected={isConnected}></Navbar>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Rooms />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </BrowserRouter>
      </SocketContext.Provider>
    </div>

  );
}

export default App;
export { SocketContext };