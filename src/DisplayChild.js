import React from "react";

function DisplayChild(props) {
  let theSpan = (
    <span
      key={props.index}
      className={props.theClassName}
      id={props.childName}
      onClick={props.handleClick}
    >
      {props.childName}
    </span>
  );
  return theSpan;
}

export default DisplayChild;
