import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SocketContext } from "../../App";
import "./Room.css";


const Room = () => {
    const socket = useContext(SocketContext);
    const { name } = useParams();
    const [message, setMessage] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {

        socket.on("game:start", ({ isStart, isFirstMove }: {
            isStart: boolean,
            isFirstMove: boolean
        }) => {

            if (!isStart) {
                setMessage("The game has not started, maybe not enough players");
                return;
            }
            socket.emit("game:create", isFirstMove);
            navigate("/init");
        });

        return () => {
            socket.off("game:start");
        }
    }, []);



    function clickHandler() {
        socket.emit("game:start");
    }

    return (
        <div>
            {name} : {message}

            <button onClick={() => clickHandler()}>Start</button>
        </div>
    );
};

export default Room;
