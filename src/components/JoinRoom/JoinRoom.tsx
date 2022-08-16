import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../../App';

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
            <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
            <button onClick={() => joinHandler()}>join</button>
        </div>
    )
}

export default JoinRoom