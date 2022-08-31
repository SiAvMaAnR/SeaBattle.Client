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

const StatCommon = ({ searchField }: {
  searchField: string
}) => {

  const [token, setToken] = useToken();
  const [stats, setStats] = useState<ICommonStat>();

  useEffect(() => {
    statisticApi.getCommon(token, searchField)
      .then((response) => {
        setStats(response?.data ?? {});
      })
      .catch((err) => { });
  }, [token, searchField]);


  function percentWins(): number {
    if (!stats?.countGames || !stats?.countWins) {
      return 0;
    }
    return Number((stats.countWins * 100 / stats.countGames).toFixed(2));
  }

  return (
    <div className='stat-common'>
      <div className='container'>
        <div className='stat-cell'>
          <div className='head'>Всего ходов</div>
          <div className='content'>{stats?.sumMoves ?? 0}</div>
        </div>
        <div className='stat-cell'>
          <div className='head'>Всего побед</div>
          <div className='content'>{stats?.countWins ?? 0}</div>
        </div>
        <div className='stat-cell'>
          <div className='head'>Процент побед</div>
          <div className='content'>{percentWins() ?? 0}%</div>
        </div>
        <div className='stat-cell'>
          <div className='head'>Всего игр</div>
          <div className='content'>{stats?.countGames ?? 0}</div>
        </div>
        <div className='stat-cell'>
          <div className='head'>Всего попаданий</div>
          <div className='content'>{stats?.sumHits ?? 0}</div>
        </div>
      </div>
    </div>
  )
}

export default StatCommon;