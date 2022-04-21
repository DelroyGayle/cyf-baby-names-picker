import React from "react";
import { useState } from "react";
import "./App.css";
import ChildrenNames from "./data/babyNamesData.json";
import FetchChildren from "./FetchChildren.js";
/*
    Source: https://github.com/CodeYourFuture/cyf-react-challenges/blob/master/challenge-baby-name-picker/babyNamesData.json

    171 names

    Samples:

  {
    "id": 0,
    "name": "Zahra",
    "sex": "f"
  },
  {
    "id": 1,
    "name": "Parsa",
    "sex": "m"
  },

  Note: ChildrenNames is a 'const' variable containing the relevant names data
*/

let filteredList = [];

const App = () => {
  let sortedList = sortoutTheChildren(ChildrenNames);

  const [textEntered, setTextEntered] = useState("");

  function handleChange(event) {
    let enteredString = event.target.value;
    setTextEntered(enteredString);
    if (enteredString !== "") {
      filteredList = sortedList.filter((element) =>
        element.name.toLowerCase().includes(enteredString.toLowerCase())
      );
    }
  }

  return (
    <div className="App">
      <div className="rightflex searchbar">
        <input
          className="searchbar"
          type="text"
          autoComplete="off"
          id="children-query"
          name="q"
          placeholder="Children Names Search"
          value={textEntered}
          onChange={handleChange}
        />
      </div>
      <br></br>
      <FetchChildren
        theChildren={textEntered === "" ? sortedList : filteredList}
      />
    </div>
  );
};

function sortoutTheChildren(childrenNames) {
  // Change the nomenclature
  return childrenNames
    .map(({ id, name, sex }) => ({
      id: id,
      name: name,
      gender: sex,
    }))
    .sort(nameCompare);
}

function nameCompare(a, b) {
  return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
}

export default App;
