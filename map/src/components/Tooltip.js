import React from 'react';

const Tooltip = ({pointerX, pointerY, hoveredObject}) => (
  <div style={{left: pointerX, top: pointerY}} className="tooltip">
    Ride: { hoveredObject.name }
  </div>
)

export default Tooltip;
