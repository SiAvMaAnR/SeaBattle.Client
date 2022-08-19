import React from 'react'
import "./Wait.css";


const Wait = ({ message }: {
    message: string
}) => {
    return (
        <div className='wait-component'>
            <div className='wait-content'>
                {message}
            </div>
        </div>
    )
}

export default Wait;