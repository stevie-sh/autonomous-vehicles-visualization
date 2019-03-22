import {prop, props, map, compose, reverse} from 'ramda';
import * from 'd3';

const preprocess = (ride) => {
  const color =  Math.random(0,1);

  const coords = prop('coords', ride);


  //Note: also reverse position of coords here from lat,lng to lng,lat
  const formatCoords = props(['lng', 'lat'])

  const path = map(formatCoords, coords);
  return {
    color: color,
    name: name,
    path: path
  }
}


export default preprocess;
