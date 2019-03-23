import {prop, props, map, compose, reverse} from 'ramda';
import {interpolateCubehelixDefault} from 'd3-scale-chromatic';
import {rgb, cubehelix, hex} from 'd3-color';

const preprocess = (ride) => {

  const generateColor = () => {
    const rgbColorStr = interpolateCubehelixDefault(Math.random())
    const rgbColor = rgb(rgbColorStr)
    const hexColor = rgbColor.hex()
    return hexColor;
  }

  const color = generateColor();
  const coords = prop('coords', ride);
  const name = 'default-name';

  //Note: also reverse position of coords here from lat,lng to lng,lat
  const formatCoords = props(['lng', 'lat'])

  const path = map(formatCoords, coords);
  return {
    color,
    name,
    path
  }
}


export default preprocess;
