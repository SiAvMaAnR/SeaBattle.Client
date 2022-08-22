import React, { useContext, useEffect, useState } from "react";
import EnemyField from '../EnemyField/EnemyField';
import MyField from '../MyField/MyField';
import { SocketContext } from '../../App';
import "./GameProcess.css"

const GameProcess = () => {

    const socket = useContext(SocketContext);
    const [isEnd, setIsEnd] = useState<boolean>(false);
    const [isMyMove, setIsMyMove] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("В бой!");
    const [moveMessage, setMoveMessage] = useState<string>("");


    useEffect(() => {
        socket.on("game:shoot", (isHit: boolean) => {

            socket.emit("game:field:my");
            socket.emit("game:field:enemy");
            socket.emit("game:check");

            setMessage(isHit ? "Попадание!" : "Промазал!");
        });

        socket.on("game:check", (isWin: boolean) => {
            setIsEnd(true);
            setMessage((isWin) ? "Победа" : "Поражение");
        });

        socket.on("game:move", (isMove: boolean) => {
            setIsMyMove(isMove);


            const message = isEnd
                ? ""
                : isMove ? "Твой ход" : "Ходит противник";

            setMoveMessage(message);
        });


        return () => {
            socket.off("game:shoot");
            socket.off("game:check");
            socket.off("game:move");
        }
    }, [socket, isEnd]);


    return (
        <div className="game-process">
            <div className="header">
                <div className="message">{message}</div>
                <div className="move">{moveMessage}</div>
            </div>

            <div className='fields'>
                <div className='my-field'>
                    <MyField />
                </div>
                <div className='enemy-field'>
                    <EnemyField isEnd={isEnd} />
                </div>
            </div>
        </div>
    )
}

export default GameProcess;