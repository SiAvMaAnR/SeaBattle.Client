import React, { useContext, useEffect, useState } from 'react'
import CoordinateType from '../../common/types/coordinate';
import Field from '../Field/Field';
import { SocketContext } from '../../App';
import Cell from '../Cell/enums/CellEnum';
import Button from '../UI/Button/Button';
import ShipsPanel from '../ShipsPanel/ShipsPanel';
import "./InitField.css";


const InitField = ({ isReady, setIsReady }: {
    isReady: boolean,
    setIsReady: Function
}) => {
    const socket = useContext(SocketContext);

    const [field, setField] = useState<number[][]>([]);
    const [name, setName] = useState<string>("Инициализация поля");
    const [countCell, setCountCell] = useState<number>(0);
    const [block, setBlock] = useState<boolean>(false);
    const [oldFields, setOldFields] = useState<number[][][]>([]);

    useEffect(() => {
        socket.on("game:field:my", (field: number[][]) => {
            setField(field);
            setOldFields([field]);
        });


        socket.emit("game:field:my");

        return () => {
            socket.off("game:field:my");
        }
    }, [socket]);



    function clickCellHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>, coordinate: CoordinateType | undefined) {

        console.log("right");

        if (isReady || block) return;
        if (countCell <= 0) return;

        const newField = field.map((row, y) => {
            return row.map((cell, x) => {
                const isCurrentCell = coordinate?.y === y && coordinate?.x === x;

                if (isCurrentCell && cell === Cell.Empty) {
                    cell = Cell.Exists;
                    setCountCell(count => count - 1);
                }

                return cell;
            })
        });

        setField(newField);
    }


    function clickGodCellHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>, coordinate: CoordinateType | undefined) {
        e.preventDefault();
        console.log("left");

        if (isReady) return;

        const newField = field.map((row, y) => {
            return row.map((cell, x) => {
                const isCurrentCell = coordinate?.y === y && coordinate?.x === x;

                if (isCurrentCell) {
                    cell = (cell === Cell.Empty) ? Cell.Exists : Cell.Empty;
                }

                return cell;
            })
        });

        setField(newField);
    }


    function clickShipHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>, lenght: number) {

        console.log(countCell);


        if (countCell > 0) {
            setField(oldFields.pop() ?? []);
        }

        setCountCell(lenght);
        setOldFields([...oldFields, field]);
    }


    function clearFieldHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        setField(field => field.filter(row => row.fill(0)));
        setCountCell(0);
    }


    function backFieldHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const oldField = oldFields.pop() ?? [...field];
        
        console.log(oldField);

        setField(oldField);
        setCountCell(0);
    }

    function clickSaveHandler() {
        if (!isReady) {
            socket.emit("game:field:init", field);
        }
        socket.emit("game:ready", !isReady);
    }


    return (
        <div className='init-field'>
            <Field clearFieldHandler={clearFieldHandler}
                onContextMenu={clickGodCellHandler}
                name={"Инициализация поля"}
                field={field}
                onclick={clickCellHandler} />
            <div className='buttons'>
                <Button onClick={clearFieldHandler}>{"Очистить"}</Button>
                <Button additionalClass={isReady ? "ready" : "not-ready"} onClick={() => clickSaveHandler()}>{isReady ? "Не готов" : "Готов"}</Button>
                <Button onClick={backFieldHandler}>{"Отменить"}</Button>
            </div>

            <ShipsPanel onClick={clickShipHandler}></ShipsPanel>
        </div>
    );

}



export default InitField;