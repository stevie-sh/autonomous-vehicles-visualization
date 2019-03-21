import React, {Component} from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL from 'react-map-gl'
const {REACT_APP_MAPBOX_TOKEN} = process.env;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: 1800,
        height: 1000,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      }
    }
  }

  _onViewportChange = (viewport) => {
    if (viewport.longitude > 0) {
      viewport.longitude = 0;
    }
    this.setState({viewport})
  }


  render(){
    console.log(process.env);
    return (
      <>
        <ReactMapGL 
          mapboxApiAccessToken={'pk.eyJ1Ijoic3Rldmllc2giLCJhIjoiY2p0aXVuMzR5MnRlZDN5bDZ0bGw0cmp2NSJ9.OXiTpVYZZN90VS7nv5cwWg'}
          onViewportChange={this._onViewportChange}
          {...this.state.viewport}
        />
      </>
    )
  }
}

export default Map;
