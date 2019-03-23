import React, {Component} from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL, {FullscreenControl} from 'react-map-gl'
import DeckGL, {LineLayer, PathLayer} from 'deck.gl';
import SideNav from './SideNav';
import {clone} from 'ramda';
import sampleData from './sample.json';
import singleRide from '../single-ride.json'
import manifest from '../manifest.json';
import {preprocess, hexToRgb} from '../utils';

const {REACT_APP_MAPBOX_TOKEN} = process.env;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      },
      paths : [],
      idx: 0,
      hoveredObject: null,
      pointerX: Number.MIN_SAFE_INTEGER,
      pointerY: Number.MIN_SAFE_INTEGER,
      averageSpeed : Number.MIN_SAFE_INTEGER,
    }
  }

  onViewportChange = (viewport) => {
    if (viewport.longitude > 0) {
      viewport.longitude = 0;
    }
    this.setState({viewport})
  }

  componentDidMount() {
    this.setState({paths: sampleData})
    this.timedCursor = setInterval(this.addPath, 2000)
  }

  addPath = () => {
    this.setState(({paths, idx}) => {
      const newRide = preprocess(manifest[idx]);
      const newPaths = paths.concat(newRide);
      return {
        idx: idx + 1,
        paths: newPaths
      }
    })
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

  renderTooltip = () => {
    const {hoveredObject, pointerX, pointerY} = this.state || {};
    return hoveredObject && (
          <div style={{left: pointerX, top: pointerY}} className="tooltip">
            Ride: { hoveredObject.name }
          </div>
    )
  }


  componentWillUnmount = () => {
    clearInterval(this.timedCursor);
  }

  render(){
    const {paths} = this.state;
    const layers = [
      new PathLayer({
        id: 'path-layer', 
        data: paths,
        getWidth: d => 100,
        getColor: d => {
          return hexToRgb(d.color);
        },
        onHover: ({object,x: pointerX,y: pointerY}) => {
          this.setState({
            hoveredObject: object,
            pointerX: pointerX,
            pointerY: pointerY
          })
        },
        pickable: true
      })
      //add new layer here with experimental data
    ];

    const {viewport} = this.state;
    return (
      <ReactMapGL 
        mapboxApiAccessToken={'pk.eyJ1Ijoic3Rldmllc2giLCJhIjoiY2p0aXVuMzR5MnRlZDN5bDZ0bGw0cmp2NSJ9.OXiTpVYZZN90VS7nv5cwWg'}
        onViewportChange={this.onViewportChange}
        width="100vw"
        height="100vh"
        {...viewport}
      >
        <DeckGL 
          initialViewState={viewport}
          layers={layers}
          controller={true}
        />
        {this.renderTooltip()}
        {/* Note that these controls MUST come after DeckGL in order to be accessible */}
        <div className="fullscreen">
          <FullscreenControl/>
        </div>
        <SideNav/>
    </ReactMapGL>
    )
  }
}

export default Map;
