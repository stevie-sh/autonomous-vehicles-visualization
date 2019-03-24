import React, {PureComponent, Component} from 'react';
import {calculateAverageSpeed} from '../utils';

const defaultContainer = ({children}) => <div className="control-panel">{children}</div>;

class SideNav extends Component {
  render() {
    const Container = this.props.containerComponent || defaultContainer;
    const {paths, clickedObject, handleClick} = this.props;
    //const paths = [0]
    return (
      <Container>
        <div className="speedometer">
          Total Avg Speed: 30mph
        </div>
        <h3>Rides</h3>
          <ul className="unstyle-list">
            {paths.map(({name, id, speed}) => {
              const isClicked = clickedObject === id;
              return (
                <li 
                  key={id} 
                  style={isClicked ? {backgroundColor: 'pink'} : {backgroundColor: 'initial'}} 
                  className="unstyle-list-item"
                  onClick={() => handleClick(id)}
                  >
                  <span>{name}</span>
                  <span> {speed || -1}</span>
                </li>
              )
            })}
          </ul>
      </Container>
    );
  }
}

export default SideNav;
