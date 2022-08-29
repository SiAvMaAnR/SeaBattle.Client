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
    const [activeId, setActiveId] = useState<number>(0);
    const [isChange, setIsChange] = useState<boolean>(false);
    const [tempSave, setTempSave] = useState<number[][]>([]);

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

    useEffect(() => {
        console.log(oldFields);
    }, [oldFields])

    async function clickCellHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>, coordinate: CoordinateType | undefined) {


        if (isReady || countCell <= 0 || block) return;
        if (activeId === 0) return;
        let count = countCell;

        const newField = field.map((row, y) => {
            return row.map((cell, x) => {
                const isCurrentCell = coordinate?.y === y && coordinate?.x === x;

                if (isCurrentCell && cell === Cell.Empty) {
                    cell = Cell.Exists;
                    setCountCell(count => count - 1);
                    setIsChange(true);
                    count--;
                }

                return cell;
            })
        });

        setField(newField);

        if (count <= 0) {
            setOldFields([...oldFields, newField]);
            setTempSave(newField);
            setActiveId(0);
        }
    }


    function clickGodCellHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>, coordinate: CoordinateType | undefined) {
        e.preventDefault();

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


    function clickShipHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>, shipId: number) {

        setCountCell(shipId);

        //корабль не доставлен/ осущ. изменения сетки/ есть выбранный корабль
        if (countCell > 0 && isChange && activeId !== 0) {
            const newField = tempSave ?? [...field];
            setField(newField);
            setIsChange(false);
        }


        setActiveId((activeId === shipId) ? 0 : shipId);
        setTempSave(oldFields[oldFields.length - 1] ?? [...field]);
    }


    function clearFieldHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        setField(field => field.filter(row => row.fill(0)));
        setTempSave([]);
        setCountCell(0);
        setActiveId(0);
    }


    function backFieldHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {

        oldFields.pop();

        const oldField = oldFields[oldFields.length - 1] ?? field.map(row => row.fill(0));

        setField(oldField);
        setCountCell(0);
        setActiveId(0);
    }

    function clickReadyHandler() {
        if (!isReady) {
            socket.emit("game:field:init", field);
        }
        socket.emit("game:ready", !isReady);
    }


    return (
        <div className='init-field'>

            <div className='buttons'>
                <Button additionalClass={isReady ? "ready" : "not-ready"} onClick={() => clickReadyHandler()}>{isReady ? "Не готов" : "Готов"}</Button>
                <Button onClick={backFieldHandler}>{"Отменить"}</Button>
                <Button onClick={clearFieldHandler}>{"Очистить"}</Button>
            </div>

            <Field clearFieldHandler={clearFieldHandler}
                onContextMenu={clickGodCellHandler}
                name={"Инициализация поля"}
                field={field}
                onclick={clickCellHandler} />

            <ShipsPanel>
                <div className='container'>
                    <div onClick={(e) => clickShipHandler(e, 1)} id={"s1"} className={`ship${activeId === 1 ? " active" : ""}`}></div>
                    <div onClick={(e) => clickShipHandler(e, 2)} id={"s2"} className={`ship${activeId === 2 ? " active" : ""}`}></div>
                    <div onClick={(e) => clickShipHandler(e, 3)} id={"s3"} className={`ship${activeId === 3 ? " active" : ""}`}></div>
                    <div onClick={(e) => clickShipHandler(e, 4)} id={"s4"} className={`ship${activeId === 4 ? " active" : ""}`}></div>
                </div>
            </ShipsPanel >
        </div >
    );

}



export default InitField;