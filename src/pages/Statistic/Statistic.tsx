import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StatCommon from "../../components/StatCommon/StatCommon";
import StatGames from "../../components/StatGames/StatGames";
import "./Statistic.css";

const Statistic = () => {

    const navigate = useNavigate();

    useEffect(() => {



        return () => {

        }
    }, []);

    return (
        <div className="statistic">
            <StatCommon/>
            <StatGames/>
        </div>
    );
};

export default Statistic;
