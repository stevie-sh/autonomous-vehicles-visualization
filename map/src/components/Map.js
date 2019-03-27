import React, {Component} from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL from 'react-map-gl'
import DeckGL, {LineLayer, PathLayer} from 'deck.gl';
import SideNav from './SideNav';
import Tooltip from './Tooltip';
import {clone} from 'ramda';
import FullScreen from './FullScreen';
import Modal from 'react-modal';
import DistributionBarChart from './DistributionBarChart';
import {preprocess, hexToRgb, getIndexById, getRide, getRideFilenames, throttle, debounce} from '../utils';

const {REACT_APP_MAPBOX_TOKEN} = process.env;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* SF view */
      viewport: {
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      },
      paths : [],
      hoveredObject: null,
      clickedPathId: null,
      pointerX: Number.MIN_SAFE_INTEGER,
      pointerY: Number.MIN_SAFE_INTEGER,
      throttleMs : 1300,
      rideIndex : 0,
      isLoading: false,
    }
  }

  componentWillMount = () => {
    this.updateDimensions();
  }

  componentDidMount = async () => {
    const {rideIndex, throttleMs} = this.state;

    window.addEventListener("resize", debounce(this.updateDimensions, 200));
    this.setState({isLoading: true})

    const rideFilenames = await getRideFilenames();
    for (let i = rideIndex; i < rideFilenames.length; i++) {
      const filename = rideFilenames[i];
      const renderAndFetch = async () => {
        const ride = await getRide(filename);
        this.addPath(ride);
      }
      await throttle(renderAndFetch, throttleMs);
      this.setState({rideIndex: i});
    }

    this.setState({isLoading: false})
  }

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
     const w = window,
         d = document,
         documentElement = d.documentElement,
         body = d.getElementsByTagName('body')[0],
         width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
         height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;
    const {viewport} = this.state;
    viewport.width = width;
    viewport.height = height;
    this.setState({viewport});
  }

  addPath = (ride) => {
    const newPath = preprocess(ride);
    this.setState(({paths}) => {
      const newPaths = paths.concat(newPath);
      return {
        paths: newPaths
      }
    })
  }

  renderTooltip = () => {
    const {hoveredObject, pointerX, pointerY} = this.state || {};
    return hoveredObject && (
      <Tooltip pointerX={pointerX} pointerY={pointerY} hoveredObject={hoveredObject}/>
    )
  }

  onViewportChange = (viewport) => {
    if (viewport.longitude > 0) {
      viewport.longitude = 0;
    }
    this.setState({viewport})
  }

  toggleThrottle = () => {
    //TODO:
  }

  handleClick = (id) => {
    this.setState({
      clickedPathId: id
    })
  }

  handleHover = ({object, x: pointerX, y: pointerY}) => {
    this.setState({
      hoveredObject: object,
      pointerX,
      pointerY
    })
  }

  handleToggle = () => {
    this.setState(({isModalOpen}) => ({
      isModalOpen: !isModalOpen
    }))
  }

  render(){
    const {viewport, paths, clickedPathId, isLoading, isModalOpen, throttleMs} = this.state;

    const layers = [
      new PathLayer({
        id: 'path-layer', 
        data: paths,
        rounded: true,
        autoHighlight: true,
        getWidth: d => {
          return d.id === clickedPathId ? 30 : 25
        },
        getColor: d => {
          return hexToRgb(d.color);
        },
        onClick: ({object: {id}}, event) => this.handleClick(id),
        onHover: this.handleHover,
        highlightedObjectIndex: getIndexById(clickedPathId, paths),
        pickable: true
      })
    ];

    return (
      <>
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
          {/* Note that these controls should come after DeckGL in order to be accessible */}
          <FullScreen/>
      </ReactMapGL>
      <SideNav 
        paths={paths}
        clickedPathId={clickedPathId} 
        handleClick={this.handleClick} 
        handleToggle={this.handleToggle}
        isLoading={isLoading}
        throttleMs={throttleMs}
        toggleThrottle={this.toggleThrottle}
      />
    </>
    )
  }
}

export default Map;
