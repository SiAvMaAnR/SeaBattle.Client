import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../../App';
import "./JoinRoom.css";

const JoinRoom = () => {
    const socket = useContext(SocketContext);
    const [name, setName] = useState<string>("");


    useEffect(() => {

    }, []);

    function joinHandler() {
        socket.emit("room:join", name);
    }

    return (
        <div className='join-room'>
            <div className='container'>
                <input type="text" placeholder='Введите комнату' onChange={(e) => setName(e.target.value)} value={name} />
                <button onClick={() => joinHandler()}>Присоединиться</button>
            </div>
        </div>
    )
}

export default JoinRoom