import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { useAuth, useToken, useUser } from "./hooks";
import Game from "./pages/Game/Game";
import Login from "./pages/Login/Login";
import Rooms from "./pages/Rooms/Rooms";

const socket = io("http://localhost:3000");


const SocketContext = createContext(socket);
const TokenContext = createContext<([token: string | null, setToken: Function])>([null, new Function()]);
const AuthContext = createContext<([isLogged: boolean, login: Function, logout: Function])>([false, new Function(), new Function()]);
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


  return (
    <div className="app">
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
                  </Routes>
                  :
                  <Routes>
                    <Route path="/*" element={<Login />} />
                  </Routes>
                }
              </BrowserRouter>
            </SocketContext.Provider>
          </UserContext.Provider>
        </AuthContext.Provider>
      </TokenContext.Provider >
    </div >

  );
}

export default App;
export { SocketContext, AuthContext, TokenContext, UserContext };