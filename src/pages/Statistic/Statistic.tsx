import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchStatistic from "../../components/SearchStatistic/SearchStatistic";
import StatCommon from "../../components/StatCommon/StatCommon";
import StatGames from "../../components/StatGames/StatGames";
import StatPagination from "../../components/StatPagination/StatPagination";
import "./Statistic.css";

const Statistic = () => {

    const [searchField, setSearchField] = useState<string>("");

    useEffect(() => {



        return () => {

        }
    }, []);

    return (
        <div className="statistic">
            <SearchStatistic setSearchField={setSearchField} searchField={searchField} />
            <StatCommon searchField={searchField}/>
            <StatGames searchField={searchField} />
            <StatPagination />
        </div>
    );
};

export default Statistic;
