import React, { useContext, useEffect, useState } from "react";
import EnemyField from '../EnemyField/EnemyField';
import MyField from '../MyField/MyField';
import { SocketContext } from '../../App';

import "./Game.css"
import Coordinate from "../../common/types/coordinate";

const Game = () => {

    const socket = useContext(SocketContext);
    const [isWin, setIsWin] = useState<boolean>(false);
    const [isEnd, setIsEnd] = useState<boolean>(false);

    useEffect(() => {
        socket.on("game:shoot:init", (coordinate: Coordinate) => {
            console.log(coordinate);
            socket.emit("game:shoot:process", coordinate);
        });

        socket.on("game:shoot:process", (isHit: boolean, coordinate: Coordinate) => {
            console.log(isHit, coordinate);
            socket.emit("game:shoot:result", isHit, coordinate);
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
        });

        return () => {
            socket.off("game:shoot:init");
            socket.off("game:shoot:process");
            socket.off("game:shoot:result");
            socket.off("game:result");
        }
    })


    return (
        <div>
            <div className="result">{(isEnd) && (isWin) ? "YOU WIN" : "YOU ЛОСЬ"}</div>
            <div className='main'>
                <div className='my-field'>
                    <MyField />
                </div>
                <div className='enemy-field'>
                    <EnemyField />
                </div>
            </div>
        </div>
    )
}

export default Game