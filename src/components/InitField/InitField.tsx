import React, { useContext, useEffect, useMemo, useState } from 'react'
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
    const [saves, setSaves] = useState<ISave[]>([]);
    const [activeId, setActiveId] = useState<number>(0);
    const [isChange, setIsChange] = useState<boolean>(false);
    const [tempSave, setTempSave] = useState<ISave>();
    const defaultShips = useMemo(() => [0, 0, 0, 0, 0], []);
    const defaultField = useMemo(() => Array(10).fill(Array(10).fill(0)), [])

    useEffect(() => {
        socket.on("game:field:my", (field: number[][]) => {
            setField(field);
            setSaves([{
                field: field,
                ships: defaultShips
            }]);
        });


        socket.emit("game:field:my");

        return () => {
            socket.off("game:field:my");
        }
    }, [socket, defaultShips]);

    useEffect(() => {
        console.log("SAVES: ", saves);
        console.log("TEMP: ", tempSave);

    }, [saves, tempSave]);


    useEffect(() => {
        if (countCell <= 0) {
            setSaves(saves => [...saves, {
                field: field,
                ships: saves[saves.length - 1]?.ships?.map((ship, index) => (index === activeId) ? ++ship : ship),
            }]);
            setTempSave(save => {
                return {
                    field: field,
                    ships: save?.ships?.map((ship, index) => (index === activeId) ? ++ship : ship) ?? defaultShips,
                }
            });

            setActiveId(0);
        }
    }, [countCell]);

    async function clickCellHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>, coordinate: CoordinateType | undefined) {

        if (isReady || countCell <= 0 || block || activeId === 0) return;

        const newField = field.map((row, y) => {
            return row.map((cell, x) => {
                const isCurrentCell = coordinate?.y === y && coordinate?.x === x;

                if (isCurrentCell && cell === Cell.Empty) {
                    cell = Cell.Exists;
                    setCountCell(count => count - 1);
                    setIsChange(true);
                }

                return cell;
            })
        });

        setField(newField);
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
            const newField = tempSave?.field ?? [...field];
            setField(newField);
            setIsChange(false);
        }


        setActiveId((activeId === shipId) ? 0 : shipId);
        setTempSave(save => {
            return saves[saves.length - 1] ?? {
                field: save?.field,
                ships: save?.ships
            }
        });
    }


    function clearFieldHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        setField(field => field.filter(row => row.fill(0)));
        setTempSave({
            field: [],
            ships: defaultShips
        });
        setCountCell(0);
        setActiveId(0);
        setSaves([{
            field: field,
            ships: defaultShips
        }]);
    }


    function backFieldHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {

        setSaves(saves => {
            const newSaves = saves.filter((save, index) => index !== saves.length - 1) ?? {
                field: defaultField,
                ships: defaultShips
            };
            const saveField = newSaves[newSaves.length - 1]?.field ?? field.map(row => row.fill(0));
            setField(saveField);
            return newSaves;
        });


        setCountCell(0);
        setActiveId(0);
    }

    function clickReadyHandler() {
        if (!isReady) {
            socket.emit("game:field:init", field);
        }
        socket.emit("game:ready", !isReady);
    }


    const lastSave = saves[saves.length - 1];

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
                    <div className='ship-info'>
                        <div className='info'>{lastSave?.ships?.at(1) ?? "*"}</div>
                        <div onClick={(e) => clickShipHandler(e, 1)} id={"s1"} className={`ship${activeId === 1 ? " active" : ""}`}></div>
                    </div>

                    <div className='ship-info'>
                        <div className='info'>{lastSave?.ships?.at(2) ?? "*"}</div>
                        <div onClick={(e) => clickShipHandler(e, 2)} id={"s2"} className={`ship${activeId === 2 ? " active" : ""}`}></div>
                    </div>


                    <div className='ship-info'>
                        <div className='info'>{lastSave?.ships?.at(3) ?? "*"}</div>
                        <div onClick={(e) => clickShipHandler(e, 3)} id={"s3"} className={`ship${activeId === 3 ? " active" : ""}`}></div>
                    </div>

                    <div className='ship-info'>
                        <div className='info'>{lastSave?.ships?.at(4) ?? "*"}</div>
                        <div onClick={(e) => clickShipHandler(e, 4)} id={"s4"} className={`ship${activeId === 4 ? " active" : ""}`}></div>
                    </div>
                </div>
            </ShipsPanel >
        </div >
    );

}


interface ISave {
    field: number[][],
    ships: number[]
}


export default InitField;