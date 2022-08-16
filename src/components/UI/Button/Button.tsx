import React from 'react';
import "./Button.css";

const Button = ({ onClick, children }: {
  onClick: Function,
  children: string
}) => {
  return (
    <button className='button' onClick={(e) => onClick(e)}>{children}</button>
  )
}

export default Button;