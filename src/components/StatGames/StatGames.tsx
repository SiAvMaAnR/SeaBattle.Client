import React, { useEffect, useState } from 'react';
import statisticApi from '../../api/statisticApi';
import { useToken } from '../../hooks';
import GameStat, { IGameStat } from '../GameStat/GameStat';
import "./StatGames.css";

const StatGames = ({ searchField }: {
    searchField: string
}) => {
    const [token, setToken] = useToken();
    const [games, setGames] = useState<IGameStat[]>([]);

    useEffect(() => {
        statisticApi.getGames(token, searchField)
            .then((response) => {
                setGames(response?.data ?? []);
            })
            .catch((err) => { });
    }, [token, searchField]);

    return (
        <div className='stat-games'>
            <div className='stat-header'>
                <div>{"Статус"}</div>
                <div>{"Ходов"}</div>
                <div>{"Попаданий"}</div>
                <div>{"Промахов"}</div>
                <div>{"Враг"}</div>
                <div>{"Дата"}</div>
            </div>
            <div className='stat-content'>
                {games.map((game) =>
                    <GameStat key={game.id} gameStat={game}></GameStat>
                )}
            </div>

        </div>
    )
}


export default StatGames;