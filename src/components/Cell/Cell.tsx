import React, { useEffect, useState } from 'react'
import CellEnum from './enums/CellEnum'
import CSS from 'csstype';
import "./Cell.css";
import Coordinate from '../../common/types/coordinate';

const Cell = ({ onclick, coord, children }: {
    children: CellEnum,
    onclick: Function,
    coord: Coordinate
}) => {

    const [cell, setCell] = useState<CSS.Properties>({});
    const [coordinate, setCoordinate] = useState<Coordinate>();


    useEffect(() => {

        setCoordinate(coord);

        switch (children) {
            case CellEnum.Empty: setCell({ background: "white" }); break;
            case CellEnum.Exists: setCell({ background: "blue" }); break;
            case CellEnum.Missed: setCell({ background: "#8A2BE2" }); break;
            case CellEnum.Killed: setCell({ background: "red" }); break;
            default: setCell({ background: "black" }); break;
        }
    }, [children, coord]);

    return (
        <div onClick={(e) => onclick(e, coordinate)} className='cell' style={cell} />
    )
}

export default Cell;