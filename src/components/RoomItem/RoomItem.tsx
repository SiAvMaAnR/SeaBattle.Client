import React, { useContext, useEffect } from 'react'
import { SocketContext } from '../../App';
import "./RoomItem.css"

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


            <div className='id'>Id: {id} </div>
            <div className='name'>Name: {name} </div>
            <div className='count'>Count: {count} </div>
            <div className='join' onClick={() => joinHandler()}>Войти</div>
        </div>
    )
}

export default RoomItem;