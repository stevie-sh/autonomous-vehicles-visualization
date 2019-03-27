import React from 'react';
const RideItem = ({name, id, speed, isClicked, handleClick}) => {
  return (
    <li 
      key={id} 
      style={isClicked ? {backgroundColor: 'pink'} : {backgroundColor: 'initial'}} 
      className="unstyle-list-item"
      onClick={() => handleClick(id)}
      >
      <span>{name}</span>
      <span> {speed || -1} mph</span>
      <span> > </span>
    </li>
  )
}

export default RideItem;
