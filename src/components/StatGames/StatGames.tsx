import GameStat, { IGameStat } from '../GameStat/GameStat';
import "./StatGames.css";

const StatGames = ({ games }: {
    games: IGameStat[]
}) => {

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