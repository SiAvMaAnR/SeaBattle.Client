import React from 'react';
import "./CellPagination.css";

const CellPagination = ({ children, totalPages, active, setNumberPage }: {
    children: number,
    totalPages: number,
    active?: string,
    setNumberPage: (value: number) => void
}) => {

    const className = "cell-pag" + (active ?? "");

    function clickHandler() {
        setNumberPage(children);
    }

    return (
        (children >= 0 && children + 1 <= totalPages)
            ? <div className={className} onClick={() => clickHandler()} >{children + 1}</div>
            : <div className={'cell-pag'}></div>
    )
}

export default CellPagination;