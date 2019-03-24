import React, {Component} from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL, {FullscreenControl} from 'react-map-gl'
import DeckGL, {LineLayer, PathLayer} from 'deck.gl';
import SideNav from './SideNav';
import {clone} from 'ramda';
import sampleData from './sample.json';
const {REACT_APP_MAPBOX_TOKEN} = process.env;

const hexToRgb = hex =>
  hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
             ,(m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16))

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      },
      paths : []
    }
  }

  _onViewportChange = (viewport) => {
    if (viewport.longitude > 0) {
      viewport.longitude = 0;
    }
    this.setState({viewport})
  }

  componentDidMount() {
    this.setState({paths: sampleData})
    setTimeout(this.updatePath, 7000)
  }

  updatePath = (id = 0) => {
    this.setState(({paths}) => {
      const newPaths = clone(paths);
      console.log('trigger', paths)
      newPaths[0].path.push([10.99, 10.99])
      console.log('post', newPaths)
      return {
        paths: newPaths
      }
    })
  }


  render(){
    console.log(process.env);
    const {paths} = this.state;
    const data = [{sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}, {sourcePosition: [-121.41669, 37.7853], targetPosition: [-122.41559, 37.781]}];
    const layers = [
      new LineLayer({id: 'line-layer', data}),
      new PathLayer({
        id: 'path-layer', 
        data: paths,
        getWidth: d => 5,
        getColor: d => {
          return hexToRgb(d.color);
        },
      })
      //add new layer here with experimental data
    ];
    const initialViewState = {
      longitude: -122.41669,
      latitude: 37.7853,
      zoom: 13,
      pitch: 0,
      bearing: 0
    };

const {viewport} = this.state;
    return (
      <ReactMapGL 
        mapboxApiAccessToken={'pk.eyJ1Ijoic3Rldmllc2giLCJhIjoiY2p0aXVuMzR5MnRlZDN5bDZ0bGw0cmp2NSJ9.OXiTpVYZZN90VS7nv5cwWg'}
        onViewportChange={this._onViewportChange}
        width="100vw"
        height="100vh"
        {...viewport}
      >
        <div className="fullscreen">
          <FullscreenControl/>
        </div>
        <DeckGL 
          initialViewState={initialViewState}
          layers={layers}
          controller={true}
        />
        <SideNav/>
    </ReactMapGL>
    )
  }
}

export default Map;
