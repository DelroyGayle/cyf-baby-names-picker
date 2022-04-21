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
  return (
    <div className="flex-container">
      {props.theChildren.map((child, index) => {
        let theClassName = child.gender === "m" ? "malename" : "femalename";

        return (
          <DisplayChild
            key={index}
            childName={child.name}
            childGender={child.gender}
            theClassName={theClassName}
            theIndex={index}
          />
        );
      })}
    </div>
  );
};

export default FetchChildren;
