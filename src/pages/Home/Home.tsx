import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../App";
import JoinRoom from "../../components/JoinRoom/JoinRoom";
import RoomList from "../../components/RoomList/RoomList";
import "./Home.css";


const Home = () => {
    const socket = useContext(SocketContext);
    const navigate = useNavigate();

    useEffect(() => {
        socket.on("room:join", (isSuccess: boolean, message: string) => {
            if (isSuccess) {
                navigate("room");
            }
        })

        return () => {
            socket.off("room:join");
        }
    }, [socket, navigate]);

    return (
        <div className="home">
            <RoomList />
            <JoinRoom />
        </div>
    );
};

export default Home;
