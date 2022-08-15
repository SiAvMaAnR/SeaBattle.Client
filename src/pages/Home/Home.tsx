import React, { useContext, useEffect } from "react";
import { SocketContext } from "../../App";
import JoinRoom from "../../components/JoinRoom/JoinRoom";
import Rooms from "../../components/RoomList/RoomList";
import "./Home.css";


const Home = () => {
    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.emit("room:leave");

        return () => { }
    }, []);

    return (
        <div className="main">
            <Rooms />
            <JoinRoom />
        </div>
    );
};

export default Home;
