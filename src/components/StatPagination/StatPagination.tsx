import React from 'react';
import CellPagination from '../CellPagination/CellPagination';
import "./StatPagination.css";

const StatPagination = ({ setNumberPage, numberPage, totalPages }: {
  setNumberPage: React.Dispatch<React.SetStateAction<number>>,
  numberPage: number,
  totalPages: number
}) => {

  function firstHandler() {
    setNumberPage(0);
  }

  function prevHandler() {
    if (numberPage !== 0) {
      setNumberPage(page => page - 1);
    }
  }

  function nextHandler() {
    if (numberPage + 1 !== totalPages) {
      setNumberPage(page => page + 1);
    }
  }

  function lastHandler() {
    setNumberPage(totalPages - 1);
  }

  return (
    <div className='stat-pagination'>
      <div className='container'>
        <button className='pag-btn' onClick={firstHandler}>First</button>
        <button className='pag-btn' onClick={prevHandler}>Prev</button>

        <CellPagination setNumberPage={setNumberPage} totalPages={totalPages}>{numberPage - 2}</CellPagination>
        <CellPagination setNumberPage={setNumberPage} totalPages={totalPages}>{numberPage - 1}</CellPagination>
        <CellPagination setNumberPage={setNumberPage} active={" active"} totalPages={totalPages}>{numberPage}</CellPagination>
        <CellPagination setNumberPage={setNumberPage} totalPages={totalPages}>{numberPage + 1}</CellPagination>
        <CellPagination setNumberPage={setNumberPage} totalPages={totalPages}>{numberPage + 2}</CellPagination>

        <button className='pag-btn' onClick={nextHandler}>Next</button>
        <button className='pag-btn' onClick={lastHandler}>Last</button>
      </div>
    </div>
  )
}

export default StatPagination;