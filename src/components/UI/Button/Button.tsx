import React from 'react';
import "./Button.css";

const Button = ({ onClick, additionalClass, children }: {
  onClick: Function,
  additionalClass?: string,
  children: string
}) => {
  return (
    <button className={`button ${additionalClass}`} onClick={(e) => onClick(e)}>{children}</button>
  )
}

export default Button;