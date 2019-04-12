import React from 'react';

function Tooltip(props) {
  return (
    <span className="tooltip-container">
      <span className="tooltip-text">{props.children}</span>
      <span className="tooltip-popup">{props.tip}</span>
    </span>
  );
}

export default Tooltip;
