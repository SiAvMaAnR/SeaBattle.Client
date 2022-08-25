import React from 'react';
import "./GameStat.css";

interface IGameStat {
    id: number
    countMyMoves: number
    isWin: boolean
    countHits: number
    countMisses: number
    enemy: string
    datetime: Date
    userId: number
}


const GameStat = ({ gameStat }: {
    gameStat: IGameStat
}) => {

    return (
        <div className='game-stat'>
            <div>{gameStat.isWin ? "Победа" : "Поражение"}</div>
            <div>{gameStat.countMyMoves}</div>
            <div>{gameStat.countHits}</div>
            <div>{gameStat.countMisses}</div>
            <div>{gameStat.enemy}</div>
            <div>{new Date(gameStat.datetime).toLocaleString()}</div>
        </div>
    )
}

export type { IGameStat };
export default GameStat;