import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SocketContext } from "../../App";
import GameProcess from "../../components/GameProcess/GameProcess";
import InitField from "../../components/InitField/InitField";
import Wait from "../../components/Wait/Wait";
import "./Game.css";


const Game = () => {
    const socket = useContext(SocketContext);
    const [isStart, setIsStart] = useState<boolean>(false);
    const [isInit, setIsInit] = useState<boolean>(false);
    const [isReady, setIsReady] = useState<boolean>(false);
    const [isAccess, setIsAccess] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {

        socket.on("room:get:current", (roomId: string) => {
            if (!roomId) {
                navigate('/rooms');
                return;
            }

            socket.emit("game:start");
        });

        socket.on("game:start", (isStart: boolean) => {

            if (!isStart) {
                return;
            }
            setIsStart(true);
        });

        socket.on("room:leave", (isSuccess: boolean) => {
            if (isSuccess) {
                navigate('/rooms');
            }
        })

        socket.on("room:players:ready", (isAccess: boolean) => {
            setIsAccess(isAccess);
        });

        socket.on("game:field:init", (field: number[][]) => {
            setIsInit(true);
            socket.emit("room:players:ready");

        });

        socket.on("game:ready", (isReady: boolean) => {
            setIsReady(isReady);
            socket.emit("room:players:ready");
        });


        socket.emit("room:get:current");

        return () => {
            socket.off("game:start");
            socket.off("room:get:current");
            socket.off("room:leave");
            socket.off("room:players:ready");
            socket.off("game:field:init");
            socket.off("game:ready");
        }
    }, [socket, navigate]);



    return (
        <div className="game">
            {(isStart)
                ? (isAccess)
                    ? <GameProcess />
                    : <InitField isReady={isReady} setIsReady={setIsReady} />
                : <Wait message={"Wait for another player!"} />}
        </div>
    );
};

export default Game;
