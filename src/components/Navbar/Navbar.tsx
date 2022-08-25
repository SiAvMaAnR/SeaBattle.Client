import React, { useContext, useEffect, useState } from 'react'
import "./Navbar.css";
import { AuthContext, SocketContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isConnected }: {
    isConnected: boolean
}) => {
    const socket = useContext(SocketContext);
    const [isLogged, login, logout] = useContext(AuthContext)
    const [room, setRoom] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        socket.on("room:get:current", (roomId: string) => {
            setRoom(roomId);
        });

        return () => {
            socket.off("room:get:current");
        }
    }, [socket])


    function leaveHandler() {
        socket.emit("room:leave");
    }


    function logoutHandler() {
        logout();
    }

    function homeHandler() {
        navigate("/rooms")
    }

    return (
        <div className='navbar'>
            <div className='connected'>
                <div onClick={homeHandler}> {(isConnected) ? "Connected" : "Not connected"}</div>
            </div>

            <div className='leave'>
                {room && isLogged && <button onClick={() => leaveHandler()}>Leave</button>}
                {isLogged && <button onClick={() => logoutHandler()}>Logout</button>}
            </div>
        </div>
    )
}

export default Navbar;