import React, { useEffect, useState } from 'react'
import CoordinateType from '../../common/types/coordinate';
import Field from '../Field/Field';
import "./EnemyField.css";


const EnemyField = () => {

  const [field, setField] = useState<number[][]>([]);


  useEffect(() => {
    const array: number[][] = Array(10).fill(0).map(row => new Array(10).fill(0));
    setField(array);

    console.log(array)
  }, []);


  function clickCellHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>, coordinate: CoordinateType) {
    console.log(coordinate);
  }


  return (
    <div className='container'>
      <div className='title'>EnemyField</div>
      <Field field={field} onclick={clickCellHandler} />
    </div>

  )
}

export default EnemyField;