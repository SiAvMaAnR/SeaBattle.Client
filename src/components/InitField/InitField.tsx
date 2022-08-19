import React, { useContext, useEffect, useState } from 'react'
import Coordinate from '../../common/types/coordinate';
import Field from '../Field/Field';
import "./InitField.css";
import { SocketContext } from '../../App';
import Cell from '../Cell/enums/CellEnum';
import Button from '../UI/Button/Button';

const InitField = ({ isReady, setIsReady }: {
    isReady: boolean,
    setIsReady: Function
}) => {
    const socket = useContext(SocketContext);

    const [field, setField] = useState<number[][]>([]);
    const [name, setName] = useState<string>("Инициализация поля");


    useEffect(() => {
        socket.on("game:field:my", (field: number[][]) => {
            setField(field);
        });

        socket.emit("game:field:my");

        return () => {
            socket.off("game:field:my");
        }
    }, [socket]);



    function clickCellHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>, coordinate: Coordinate) {

        if (isReady) return;
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
        if (!isReady) {
            socket.emit("game:field:init", field);
        }
        socket.emit("game:ready", !isReady);

    }


    return (
        <div className='init-field'>
            <Field name={"Инициализация поля"} field={field} onclick={clickCellHandler} />
            <Button additionalClass={isReady ? "ready" : "not-ready"} onClick={() => clickSaveHandler()}>{isReady ? "Не готов" : "Готов"}</Button>
        </div>
    );

}



export default InitField;