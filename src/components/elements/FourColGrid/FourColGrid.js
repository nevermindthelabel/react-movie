import React from 'react';
import './FourColGrid.css';

const FourColGrid = props => {
  const renderElements = () => {
    console.log(props.children)
    const gridElements = props.children.map((child, i) => {
      return (
        <div key={i} className="rmdb-grid-element">
          {child}
        </div>
      );
    });
    return gridElements;
  };
  return (
    <div className="rmdb-grid">
      {props.header && !props.loading ? <h1>{props.header}</h1> : null}
      <div className="rmdb-grid-content">{renderElements()}</div>
    </div>
  );
};

export default FourColGrid;
