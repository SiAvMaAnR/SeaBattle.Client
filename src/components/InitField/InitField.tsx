import React, { useContext, useEffect, useState } from 'react'
import Coordinate from '../../common/types/coordinate';
import Field from '../Field/Field';
import "./InitField.css";
import { SocketContext } from '../../App';
import Cell from '../Cell/enums/CellEnum';
import Button from '../UI/Button/Button';

const InitField = ({ setIsInit }: {
    setIsInit: Function
}) => {
    const socket = useContext(SocketContext);

    const [field, setField] = useState<number[][]>([]);
    const [name, setName] = useState("Init");


    useEffect(() => {
        socket.on("game:field:my", (field: number[][]) => {
            setField(field);
        });

        socket.on("game:field:init", (field: number[][]) => {
            console.log(field);
            setField(field);
            setIsInit(true);
        });

        socket.emit("game:field:my");

        return () => {
            socket.off("game:field:my");
            socket.off("game:field:init");
        }
    }, [socket, setIsInit]);



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
        <div className='init-field'>
            <Field name={name} field={field} onclick={clickCellHandler} />
            <Button onClick={() => clickSaveHandler()}>Ready</Button>
        </div>
    );
}

export default InitField;