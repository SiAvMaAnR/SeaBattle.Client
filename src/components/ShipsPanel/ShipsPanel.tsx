import React from 'react';
import "./ShipsPanel.css";

const ShipsPanel = ({ onClick }: {
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, lenght: number) => void
}) => {



    return (
        <div className='panel'>
            <div className='container'>
                <div onClick={(e) => onClick(e, 1)} className='ship s1'></div>
                <div onClick={(e) => onClick(e, 2)} className='ship s2'></div>
                <div onClick={(e) => onClick(e, 3)} className='ship s3'></div>
                <div onClick={(e) => onClick(e, 4)} className='ship s4'></div>
            </div>
        </div>
    )
}

export default ShipsPanel;