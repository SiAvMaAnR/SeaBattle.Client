import GameStat, { IGameStat } from '../GameStat/GameStat';
import "/node_modules/boxicons/css/boxicons.css";
import "./StatGames.css";

const StatGames = ({ games, setSort, sort }: {
    games: IGameStat[],
    setSort: React.Dispatch<React.SetStateAction<"asc" | "desc">>,
    sort: "asc" | "desc"
}) => {

    function clickDateHandler() {
        setSort(sort => {
            return (sort === "desc") ? "asc" : "desc"
        });
    }

    return (
        <div className='stat-games'>
            <div className='stat-header'>
                <div>{"Статус"}</div>
                <div>{"Ходов"}</div>
                <div>{"Попаданий"}</div>
                <div>{"Промахов"}</div>
                <div>{"Враг"}</div>
                <div className={sort} onClick={clickDateHandler}>
                    {"Дата"}
                    <i className='bx bx-down-arrow'></i>
                </div>
            </div>
            <div className='stat-content'>
                {games.map((game) =>
                    <GameStat key={game.id} gameStat={game}></GameStat>
                )}
            </div>

        </div >
    )
}


export default StatGames;