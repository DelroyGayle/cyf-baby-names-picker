import React from "react";

import DisplayChild from "./DisplayChild.js";
/*
    Source: https://github.com/CodeYourFuture/cyf-react-challenges/blob/master/challenge-baby-name-picker/babyNamesData.json
    Samples:

    New Nomenclature
  {
    "id": 0,
    "name": "Zahra",
    "gender": "f"
  },
  {
    "id": 1,
    "name": "Parsa",
    "gender": "m"
  },
]

  Note: ChildrenNames is a 'const' variable containing the relevant names data
*/
const FetchChildren = (props) => {
  let listOfChildren = props.theChildren.sort(nameCompare);
  return (
    <div className="flex-container">
      {listOfChildren.map((child, index) => {
        let theClassName = child.gender === "m" ? "malename" : "femalename";

        return (
          <DisplayChild
            key={index}
            childName={child.name}
            childGender={child.gender}
            theClassName={theClassName}
            theIndex={index}
            handleClick={props.handleClick}
          />
        );
      })}
    </div>
  );
};


function nameCompare(a, b) {
  return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
}

export default FetchChildren;
