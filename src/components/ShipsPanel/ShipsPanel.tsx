import React from 'react';
import "./ShipsPanel.css";

const ShipsPanel = ({  children }: {
    children: React.ReactNode
}) => {



    return (
        <div className='panel'>
            {children}
        </div>
    )
}

export default ShipsPanel;