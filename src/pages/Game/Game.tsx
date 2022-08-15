import React from 'react';
import EnemyField from '../../components/EnemyField/EnemyField';
import MyField from '../../components/MyField/MyField';
import "./Game.css"

const Game = () => {
    return (
        <div className='main'>
            <div className='my-field'>
                <MyField />
            </div>
            <div className='enemy-field'>
                <EnemyField />
            </div>
        </div>
    )
}

export default Game