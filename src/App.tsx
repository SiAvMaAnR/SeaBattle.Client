import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { useAuth, useToken, useUser } from "./hooks";
import Game from "./pages/Game/Game";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Rooms from "./pages/Rooms/Rooms";
import Statistic from "./pages/Statistic/Statistic";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import 'boxicons';

const socket = io("http://localhost:3000");


const SocketContext = createContext(socket);
const TokenContext = createContext<([token: string | null, setToken: (token: string | null) => void])>([null, (token) => { }]);
const AuthContext = createContext<([isLogged: boolean, login: (token: string) => void, logout: () => void])>([false, (token) => { }, () => { }]);
const UserContext = createContext<[object]>([{}]);

function App() {

  const [token, setToken] = useToken();
  const [isLogged, login, logout] = useAuth([token, setToken]);
  const [user] = useUser([token, isLogged, logout]);
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


  useEffect(() => {
    socket.emit("jwt", token);
  }, [token])

  return (
    <div className="app" onContextMenu={(e) => { e.preventDefault() }}>
      <DndProvider backend={HTML5Backend}>
        <TokenContext.Provider value={[token, setToken]}>
          <AuthContext.Provider value={[isLogged, login, logout]}>
            <UserContext.Provider value={[user]}>
              <SocketContext.Provider value={socket}>
                <BrowserRouter>
                  <Navbar isConnected={isConnected}></Navbar>

                  {(isLogged)
                    ?
                    <Routes>
                      <Route path="/*" element={<Rooms />} />
                      <Route path="/game" element={<Game />} />
                      <Route path="/statistic" element={<Statistic />} />
                    </Routes>
                    :
                    <Routes>
                      <Route path="/*" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                    </Routes>
                  }
                </BrowserRouter>
              </SocketContext.Provider>
            </UserContext.Provider>
          </AuthContext.Provider>
        </TokenContext.Provider >
      </DndProvider>
    </div >

  );
}

export default App;
export { SocketContext, AuthContext, TokenContext, UserContext };