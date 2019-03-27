import React from 'react';
import RideItem from './RideItem';
import Spinner from './Spinner';

const RideList = ({paths, isLoading, clickedPathId, handleClick}) => (
  <>
    <h3>Live View {isLoading ? <Spinner /> : <>✅</> } </h3>
    <ul id="live-view-list" className="unstyle-list">
      {paths.map(({name, id, speed}) => {
        const isClicked = clickedPathId === id;
        return (
          <RideItem name={name} id={id} speed={speed} isClicked={isClicked} handleClick={handleClick}/>
        )
      })}
    </ul>
  </>
);

export default RideList;
