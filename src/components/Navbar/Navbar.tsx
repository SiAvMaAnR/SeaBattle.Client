import React, { useContext } from 'react'
import "./Navbar.css";
import { SocketContext } from '../../App';

const Navbar = ({ isConnected }: {
    isConnected: boolean
}) => {
    const socket = useContext(SocketContext);

    function leave() {
        socket.emit("room:leave");
    }

    return (
        <div className='navbar'>
            <div className='connected'>
                <div> {(isConnected) ? "Connected" : "Not connected"}</div>
            </div>

            <div className='leave'>
                <button onClick={() => leave()}>Leave</button>
            </div>
        </div>
    )
}

export default Navbar;