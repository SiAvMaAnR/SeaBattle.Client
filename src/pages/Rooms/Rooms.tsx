import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../App";
import JoinRoom from "../../components/JoinRoom/JoinRoom";
import RoomList from "../../components/RoomList/RoomList";
import "./Rooms.css";


const Rooms = () => {
    const socket = useContext(SocketContext);
    const navigate = useNavigate();

    useEffect(() => {
        socket.on("room:join", (isSuccess: boolean, message: string) => {
            if (isSuccess) {
                navigate("/game");
            }
        });

        socket.on("room:leave", ({ isSuccess, message }: {
            isSuccess: boolean,
            message: string
        }) => {
            if (isSuccess) {
                navigate('/rooms');
            }
        })

        socket.emit("room:leave");

        return () => {
            socket.off("room:join");
            socket.off("room:leave");
        }
    }, [socket, navigate]);

    return (
        <div className="rooms">
            <RoomList />
            <JoinRoom />
        </div>
    );
};

export default Rooms;
