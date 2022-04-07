import React from "react";

function DisplayChild(props) {
  return (
    <span key={props.index} className={props.theClassName}>
      {props.childName}
    </span>
  );
}

export default DisplayChild;
