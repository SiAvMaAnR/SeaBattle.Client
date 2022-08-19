import React, { useContext, useEffect } from 'react'
import { SocketContext } from '../../App';

const RoomItem = ({ id, name, count }: {
    id: number,
    name: string,
    count: number
}) => {
    const socket = useContext(SocketContext);

    useEffect(() => {
        
    }, []);

    function joinHandler() {
        socket.emit("room:join", name);
    }

    return (
        <div className='room-item'>
            id: {id} | name: {name} | count: {count}
            <button onClick={() => joinHandler()}>join</button>
        </div>
    )
}

export default RoomItem;