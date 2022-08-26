import React, { useEffect, useState } from 'react'
import CellEnum from './enums/CellEnum'
import CSS from 'csstype';
import CoordinateType from '../../common/types/coordinate';
import "./Cell.css";


const Cell = ({ onclick, coord, onContextMenu, children }: {
    children: CellEnum,
    onclick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, coordinate: CoordinateType | undefined) => void,
    onContextMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, coordinate: CoordinateType | undefined) => void,
    coord: CoordinateType,
}) => {

    const [cell, setCell] = useState<CSS.Properties>({});
    const [coordinate, setCoordinate] = useState<CoordinateType>();

    useEffect(() => {


        setCoordinate(coord);

        switch (children) {
            case CellEnum.Empty: setCell({ background: "white" }); break;
            case CellEnum.Exists: setCell({ background: "#00008B" }); break;
            case CellEnum.Missed: setCell({ background: "#87CEFA" }); break;
            case CellEnum.Killed: setCell({ background: "red" }); break;
            default: setCell({ background: "black" }); break;
        }
    }, [children, coord]);

    return (
        <div onClick={(e) => onclick(e, coordinate)} onContextMenu={(e) => onContextMenu(e, coordinate)} className='cell' style={cell} />
    )
}

export default Cell;