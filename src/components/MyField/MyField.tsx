import React, { useContext, useEffect, useState } from 'react'
import CoordinateType from '../../common/types/coordinate';
import Field from '../Field/Field';
import { SocketContext } from '../../App';
import "./MyField.css";

const MyField = () => {

    const [field, setField] = useState<number[][]>([]);
    const socket = useContext(SocketContext);


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
        console.log(coordinate);

    }

    return (
        <div className='container'>
            <div className='title'>MyField</div>
            <Field field={field} onclick={clickCellHandler} />
        </div>
    );
}

export default MyField;