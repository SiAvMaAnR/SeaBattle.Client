import React from 'react';
import "./ShipsPanel.css";

const ShipsPanel = () => {

    function onDragStart(event: React.DragEvent<HTMLDivElement>) {
        console.log("DragStart",event.target);
    }

    return (
        <div className='panel'>
            <div onDragStart={(e) => onDragStart(e)} draggable="true" className='dd-cell' />


            <div onDragStart={(e) => onDragStart(e)} draggable="true" className='dd-cell' />
        </div>
    )
}

export default ShipsPanel;