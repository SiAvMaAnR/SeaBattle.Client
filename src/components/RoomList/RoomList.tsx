import React, { useEffect, useContext, useState, useMemo, useCallback } from 'react'
import { SocketContext } from '../../App';
import RoomType from '../../common/types/room';
import RoomItem from '../RoomItem/RoomItem';
import Room from '../RoomItem/RoomItem';


const RoomList = () => {
    const [activeRooms, setActiveRooms] = useState<RoomType[]>([]);

    const socket = useContext(SocketContext);

    const callbackInterval = useCallback(() => {
        socket.emit('room:get:all');
    }, [socket]);

    useEffect(() => {

        socket.on("room:get:all", (rooms: RoomType[]) => {
            setActiveRooms(rooms);
        });

        callbackInterval();
        const interval = setInterval(callbackInterval, 2000);


        return () => {
            clearInterval(interval);
            socket.off("room:get:all");
        }
    }, [callbackInterval, socket]);




    return (
        <div>
            {activeRooms.map(room => <RoomItem key={room.id} id={room.id} name={room.name} count={room.count} />)}
        </div>
    )
}


export default RoomList;