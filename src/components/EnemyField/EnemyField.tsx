import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../../App';
import Coordinate from '../../common/types/coordinate';
import Field from '../Field/Field';
import "./EnemyField.css";


const EnemyField = () => {

  const [field, setField] = useState<number[][]>([]);
  const socket = useContext(SocketContext);


  useEffect(() => {
    socket.on("game:field:enemy", (field: number[][]) => {
      setField(field);
    });


    socket.emit("game:field:enemy");

    return () => {
      socket.off("game:field:enemy");
    }
  }, [socket]);


  function clickCellHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>, coordinate: Coordinate) {
    console.log(coordinate);
    socket.emit("game:shoot:init", coordinate);
  }


  return (
    <div className='container'>
      <div className='title'>EnemyField</div>
      <Field field={field} onclick={clickCellHandler} />
    </div>

  )
}

export default EnemyField;