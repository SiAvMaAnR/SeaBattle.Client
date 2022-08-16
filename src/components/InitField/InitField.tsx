import React, { useContext, useEffect, useState } from 'react'
import { Socket } from 'socket.io-client';
import Coordinate from '../../common/types/coordinate';
import Field from '../Field/Field';
import "./InitField.css";
import { SocketContext } from '../../App';
import Cell from '../Cell/enums/CellEnum';

const InitField = () => {
    const socket = useContext(SocketContext);

    const [field, setField] = useState<number[][]>([]);


    useEffect(() => {
        socket.on("game:field:my", (field: number[][]) => {
            setField(field);
        });

        socket.on("game:field:init", (field: number[][]) => {
            console.log(field);

            setField(field);
        });

        socket.emit("game:field:my");

        return () => {
            socket.off("game:field:init");
            socket.off("game:field:my");
        }
    }, [socket]);



    function clickCellHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>, coordinate: Coordinate) {
        setField(field => field.map((row, y) => {
            return row.map((cell, x) => {
                const isCurrentCell = coordinate.y === y && coordinate.x === x;

                if (isCurrentCell) {
                    cell = (cell === Cell.Empty) ? Cell.Exists : Cell.Empty;
                }

                return cell;
            })
        }))

    }

    function clickSaveHandler() {
        socket.emit("game:field:init", field);
    }

    return (
        <div className='container'>
            <div className='title'>InitField</div>
            <Field field={field} onclick={clickCellHandler} />

            <button onClick={clickSaveHandler}>Save</button>
        </div>
    );
}

export default InitField;