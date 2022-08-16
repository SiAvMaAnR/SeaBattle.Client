import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SocketContext } from "../../App";
import EnemyField from "../../components/EnemyField/EnemyField";
import Game from "../../components/Game/Game";
import Init from "../../components/Init/Init";
import MyField from "../../components/MyField/MyField";
import "./Room.css";


const Room = () => {
    const socket = useContext(SocketContext);
    // const [message, setMessage] = useState<string>("");
    const [isStart, setIsStart] = useState(false);
    const [isInit, setIsInit] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        socket.on("room:get:current", (roomId: string) => {
            if (!roomId) {
                navigate('home');
                return;
            }

            socket.emit("game:start");
        })

        socket.on("game:start", ({ isStart, isFirstMove }: {
            isStart: boolean,
            isFirstMove: boolean
        }) => {

            if (!isStart) {
                return;
            }
            setIsStart(true);
            socket.emit("game:create", isFirstMove);
        });

        socket.emit("room:get:current");

        return () => {
            socket.off("game:start");
            socket.emit("room:leave");
        }
    }, [socket, navigate]);



    return (
        <div>
            {(isStart)
                ? (isInit)
                    ? <Game />
                    : <Init setIsInit={setIsInit} />
                : <div>Wait player</div>}
        </div>
    );
};

export default Room;
