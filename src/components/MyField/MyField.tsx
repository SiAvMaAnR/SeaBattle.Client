import React, { useContext, useEffect, useState } from 'react'
import CoordinateType from '../../common/types/coordinate';
import Field from '../Field/Field';
import { SocketContext } from '../../App';
import "./MyField.css";

const MyField = () => {
    const socket = useContext(SocketContext);
    const [field, setField] = useState<number[][]>([]);
    const [name, setName] = useState<string>("Я");



    useEffect(() => {
        socket.on("game:field:my", (field: number[][]) => {
            setField(field);
        });

        socket.emit("game:field:my");

        return () => {
            socket.off("game:field:my");
        }

    }, [socket]);

    function clickCellHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>, coordinate: CoordinateType) {
        // console.log(coordinate);
    }

    useEffect(() => {
        socket.emit("game:move");
    });

    return (
        <div className='container'>
            <Field name={name} field={field} onclick={clickCellHandler} />
        </div>
    );
}

export default MyField;