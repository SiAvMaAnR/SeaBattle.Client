import React from 'react'
import InitField from '../InitField/InitField';

const Init = ({ setIsInit }: {
    setIsInit: Function
}) => {

    function clickHandler() {
        setIsInit(true);
    }

    return (
        <div>
            <div>Init</div>
            <div><InitField /></div>
            <button onClick={() => clickHandler()}>Init</button>
        </div>
    )
}

export default Init;