import React, { useEffect, useState } from 'react';
import statisticApi from '../../api/statisticApi';
import { useToken } from '../../hooks';
import "./StatCommon.css";


interface ICommonStat {
  sumMoves: number
  countWins: number
  countGames: number
  sumHits: number
}

const StatCommon = () => {

  const [token, setToken] = useToken();
  const [stats, setStats] = useState<ICommonStat>();

  useEffect(() => {
    statisticApi.getCommon(token)
      .then((response) => {
        setStats(response?.data ?? {});
      })
      .catch((err) => { });
  }, [token]);


  function percentWins(): number {
    if (!stats?.countGames || !stats?.countWins) {
      return -1;
    }
    return Number((stats.countWins * 100 / stats.countGames).toFixed(2));
  }

  return (
    <div className='stat-common'>
      <div className='container'>
        <div className='stat-cell'>
          <div className='head'>Всего ходов</div>
          <div className='content'>{stats?.sumMoves}</div>
        </div>
        <div className='stat-cell'>
          <div className='head'>Всего побед</div>
          <div className='content'>{stats?.countWins}</div>
        </div>
        <div className='stat-cell'>
          <div className='head'>Процент побед</div>
          <div className='content'>{percentWins()}%</div>
        </div>
        <div className='stat-cell'>
          <div className='head'>Всего игр</div>
          <div className='content'>{stats?.countGames}</div>
        </div>
        <div className='stat-cell'>
          <div className='head'>Всего попаданий</div>
          <div className='content'>{stats?.sumHits}</div>
        </div>
      </div>
    </div>
  )
}

export default StatCommon;