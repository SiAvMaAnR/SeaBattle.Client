import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";
import Room from "./pages/Room/Room";
import InitField from "./pages/InitField/InitField";

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

    <SocketContext.Provider value={socket}>
      <div>{isConnected ? "Connected" : "Not connected"}</div>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/room/:name" element={<Room />} />
          <Route path="/init" element={<InitField />} />
        </Routes>
      </BrowserRouter>
    </SocketContext.Provider>
  );
}

export default App;
export { SocketContext };