import React, { useContext, useEffect, useState } from "react";
import EnemyField from '../EnemyField/EnemyField';
import MyField from '../MyField/MyField';
import { SocketContext } from '../../App';
import Coordinate from "../../common/types/coordinate";
import "./Game.css"

const Game = () => {

    const socket = useContext(SocketContext);
    const [isWin, setIsWin] = useState<boolean>(false);
    const [isEnd, setIsEnd] = useState<boolean>(false);
    const [isMyMove, setIsMyMove] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("В бой!");
    const [winMessage, setWinMessage] = useState<string>("Идет битва");

    useEffect(() => {
        socket.on("game:shoot:init", (coordinate: Coordinate) => {
            console.log(coordinate);
            socket.emit("game:shoot:process", coordinate);
        });

        socket.on("game:shoot:process", (isHit: boolean, coordinate: Coordinate) => {
            console.log(isHit, coordinate);
            socket.emit("game:shoot:result", isHit, coordinate);

            setMessage((isHit) ? "Попадание!" : "Промазал!");
        });

        socket.on("game:shoot:result", ({ myField, enemyField }: {
            myField: number[][],
            enemyField: number[][]
        }) => {
            socket.emit("game:field:my");
            socket.emit("game:field:enemy");
        });

        socket.on("game:result", (isWin: boolean) => {
            setIsEnd(true);
            setIsWin(isWin);

            setWinMessage((isWin) ? "Победа" : "Поражение");
            setMessage((isWin) ? "Респект" : "Повезет в другой раз");
        });

        socket.on("game:move", (isMove: boolean) => {
            setIsMyMove(isMove);
        });

        return () => {
            socket.off("game:shoot:init");
            socket.off("game:shoot:process");
            socket.off("game:shoot:result");
            socket.off("game:result");
            socket.off("game:move");
        }
    }, [socket]);



    return (
        <div>
            <div className="header">
                <div className="result">{winMessage}</div>
                <div className="message">{message}</div>
                <div className="move">{isMyMove ? "Твой ход" : "Ходит противник"}</div>
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

export default Game