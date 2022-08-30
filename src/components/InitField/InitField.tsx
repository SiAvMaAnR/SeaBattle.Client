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
    const [curCoords, setCurCoords] = useState<CoordinateType[]>([]);
    const [lastSave, setLastSave] = useState<ISave>();
    const defaultShips = useMemo(() => [1, 0, 0, 0, 0], []);
    const defaultField = useMemo(() => Array(10).fill(Array(10).fill(0)), []);
    const maxShips = useMemo(() => [1, 4, 3, 2, 1], [])

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
        // console.log("SAVES: ", saves);
        // console.log("TEMP: ", tempSave);
        // console.log("COORDS: ", curCoords);

        setLastSave(saves[saves.length - 1]);

    }, [saves, tempSave, curCoords]);


    useEffect(() => {
        if (countCell <= 0) {
            setCurCoords([]);

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


    function checkCellsAround(coordinate: CoordinateType | undefined): boolean {

        let startY = coordinate?.y ?? -1;
        let startX = coordinate?.x ?? -1;


        if (startY === -1 || startX === -1) {
            return false;
        }

        const minY = (startY - 1 < 0) ? startY : startY - 1;
        const minX = (startX - 1 < 0) ? startX : startX - 1;

        const maxY = (startY + 1 > 9) ? 9 : startY + 1;
        const maxX = (startX + 1 > 9) ? 9 : startX + 1;



        for (let y = minY; y <= maxY; y++) {
            for (let x = minX; x <= maxX; x++) {

                const current = curCoords.find(coord => coord.y === y && coord.x === x);


                if (field[y][x] === Cell.Exists && !current) {
                    return false;
                }
            }
        }

        return true;
    }


    function checkMaxShips(shipId: number): boolean {

        const lastSave = saves[saves.length - 1];

        const ships = lastSave?.ships;

        if (!ships) {
            return true;
        }

        for (let i = 0; i < ships.length; i++) {
            if (ships[i] >= maxShips[i] && shipId === i) {
                return false;
            }
        }

        return true;
    }


    function checkDirection(curCoords: CoordinateType[], coordinate: CoordinateType | undefined): boolean {

        if (curCoords.length === 0) {
            return true;
        }

        const y = coordinate?.y ?? -1;
        const x = coordinate?.x ?? -1;

        const lastCoord = curCoords[curCoords.length - 1];

        const penultimateCoord = curCoords[curCoords.length - 2]

        if (y === -1 || x === -1 || !lastCoord) {
            return false;
        }

        const yDiff = Math.abs(lastCoord.y - y);
        const xDiff = Math.abs(lastCoord.x - x);

        const firstCondition = yDiff === 1 && xDiff === 0;
        const secondCondition = yDiff === 0 && xDiff === 1;
        const thirdCondition = !penultimateCoord || penultimateCoord.y === y || penultimateCoord.x === x;


        return ((firstCondition || secondCondition) && thirdCondition);
    }


    function clickCellHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>, coordinate: CoordinateType | undefined) {

        if (isReady || countCell <= 0 || block || activeId === 0) return;

        const newField = field.map((row, y) => {
            return row.map((cell, x) => {
                const isCurrentCell = coordinate?.y === y && coordinate?.x === x;

                const isCorrect = checkCellsAround(coordinate)
                    && checkMaxShips(activeId)
                    && (checkDirection(curCoords, coordinate) || checkDirection(curCoords.reverse(), coordinate));

                if (isCurrentCell && cell === Cell.Empty && isCorrect) {
                    cell = Cell.Exists;
                    setCountCell(count => count - 1);
                    setIsChange(true);
                    setCurCoords(coords => [...coords, coordinate]);
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
        setCurCoords([]);
        setTempSave(save => {
            return saves[saves.length - 1] ?? {
                field: save?.field,
                ships: save?.ships
            }
        });
    }


    function clearFieldHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (isReady) {
            return;
        }

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

        if (isReady) {
            return;
        }

        setSaves(saves => {
            const newSaves = saves.filter((save, index) => index === 0 || index !== saves.length - 1) ?? {
                field: defaultField,
                ships: defaultShips
            };
            const saveField = newSaves[newSaves.length - 1]?.field ?? field.map(row => row.fill(0));
            setField(saveField);
            return newSaves;
        });

        setCurCoords([]);
        setCountCell(0);
        setActiveId(0);
    }

    function checkUsingAllShips(): boolean {
        for (let i = 0; i < maxShips.length; i++) {
            if (maxShips[i] !== lastSave?.ships[i]) {
                return false;
            }
        }
        return true;
    }

    function clickReadyHandler() {
        if (!checkUsingAllShips()) {
            return;
        }

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
                    <div className='ship-info'>
                        <div className='info'>{maxShips[1] - (lastSave?.ships?.at(1) ?? 0)}</div>
                        <div onClick={(e) => clickShipHandler(e, 1)} id={"s1"} className={`ship${activeId === 1 ? " active" : ""}`}></div>
                    </div>

                    <div className='ship-info'>
                        <div className='info'>{maxShips[2] - (lastSave?.ships?.at(2) ?? 0)}</div>
                        <div onClick={(e) => clickShipHandler(e, 2)} id={"s2"} className={`ship${activeId === 2 ? " active" : ""}`}></div>
                    </div>


                    <div className='ship-info'>
                        <div className='info'>{maxShips[3] - (lastSave?.ships?.at(3) ?? 0)}</div>
                        <div onClick={(e) => clickShipHandler(e, 3)} id={"s3"} className={`ship${activeId === 3 ? " active" : ""}`}></div>
                    </div>

                    <div className='ship-info'>
                        <div className='info'>{maxShips[4] - (lastSave?.ships?.at(4) ?? 0)}</div>
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