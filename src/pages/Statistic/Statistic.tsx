import React, { useEffect, useState } from "react";
import statisticApi from "../../api/statisticApi";
import { IGameStat } from "../../components/GameStat/GameStat";
import SearchStatistic from "../../components/SearchStatistic/SearchStatistic";
import StatCommon from "../../components/StatCommon/StatCommon";
import StatGames from "../../components/StatGames/StatGames";
import StatPagination from "../../components/StatPagination/StatPagination";
import { useToken } from "../../hooks";
import "./Statistic.css";



const Statistic = () => {

    const [page, setPage] = useState<number>(0);
    const [searchField, setSearchField] = useState<string>("");
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
        <div className="statistic">
            <SearchStatistic setSearchField={setSearchField} searchField={searchField} />
            <StatCommon searchField={searchField} />
            <StatGames games={games} />
            <StatPagination />
        </div>
    );
};

export default Statistic;
