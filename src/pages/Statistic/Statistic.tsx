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

    const [numberPage, setNumberPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [searchField, setSearchField] = useState<string>("");
    const [token, setToken] = useToken();
    const [games, setGames] = useState<IGameStat[]>([]);
    const [dateSort, setDateSort] = useState<"asc" | "desc">("desc");
    const pageSize = 10;

    useEffect(() => {
        statisticApi.getGames(token, searchField, numberPage, pageSize, dateSort)
            .then((response) => {
                setGames(response?.data?.games ?? []);
                setTotalPages(response?.data?.pages ?? 0);
            })
            .catch((err) => { });
    }, [token, searchField, numberPage, dateSort]);


    useEffect(() => {
        setNumberPage(0);
    }, [searchField, dateSort])

    return (
        <div className="statistic">
            <SearchStatistic setSearchField={setSearchField} searchField={searchField} />
            <StatCommon searchField={searchField} />
            <StatGames games={games} sort={dateSort} setSort={setDateSort} />
            <StatPagination setNumberPage={setNumberPage} numberPage={numberPage} totalPages={totalPages} />
        </div>
    );
};

export default Statistic;
