import {prop, props, map, compose, reverse} from 'ramda';
import {interpolateCubehelixDefault} from 'd3-scale-chromatic';
import {rgb, cubehelix, hex} from 'd3-color';
import uuidv4 from './uuid';
import calculateAverageSpeed from './averageSpeeds'
import Chance from 'chance';

const preprocess = (ride) => {
  const generateColor = () => {
    const rgbColorStr = interpolateCubehelixDefault(Math.random())
    const rgbColor = rgb(rgbColorStr)
    const hexColor = rgbColor.hex()
    return hexColor;
  }

  const color = generateColor();
  const coords = prop('coords', ride);

  const chance = new Chance()
  const name = chance.name({nationality: 'it'}) //lol

  const speed = calculateAverageSpeed(ride);

  //Note: also reverse position of coords here from lat,lng to lng,lat
  const formatCoords = props(['lng', 'lat'])
  const id = uuidv4();

  const path = map(formatCoords, coords);
  return {
    id,
    color,
    name,
    speed,
    path,
  }
}


export default preprocess;
