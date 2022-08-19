import React, { useEffect, useContext, useState, useMemo, useCallback } from 'react'
import { SocketContext } from '../../App';
import RoomItem from '../RoomItem/RoomItem';
import "./RoomList.css";


const RoomList = () => {
    const [activeRooms, setActiveRooms] = useState<RoomRequest[]>([]);

    const socket = useContext(SocketContext);

    const callbackInterval = useCallback(() => {
        socket.emit('room:get:all');
    }, [socket]);

    useEffect(() => {

        socket.on("room:get:all", (rooms: RoomRequest[]) => {
            setActiveRooms(rooms);
        });

        callbackInterval();
        const interval = setInterval(callbackInterval, 1000);


        return () => {
            clearInterval(interval);
            socket.off("room:get:all");
        }
    }, [callbackInterval, socket]);




    return (
        <div className='room-list'>
            <div className='container'>
                {activeRooms.map(room => <RoomItem key={room.id} id={room.index} name={room.id} count={room.count} />)}
            </div>
        </div>
    )
}

type RoomRequest = {
    index: number,
    id: string,
    count: number
}

export default RoomList;