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
let searchGender = "all";

const App = () => {
  let sortedList = sortoutTheChildren(ChildrenNames); // 171 names
  /*
  let maleList = sortedList.filter((element) => element.gender === "m"); // 85 names
  let femaleList = sortedList.filter((element) => element.gender === "f"); // 86 names
*/

  // The state has 5 elements: nameList displayedList favourites textEntered gender
  let tempObject = {
    nameList: sortedList,
    displayedList: sortedList,
    favourites: [],
    textEntered: "",
    gender: "all",
  };

  const [stateObject, setStateObject] = useState({ ...tempObject }); // shallow copy

  function handleChange(event) {
    let enteredString = event.target.value;

    // console.log(stateObject.textEntered);

    applyFilter(stateObject.nameList, enteredString);

    // update State
    setStateObject({
      ...stateObject,
      textEntered: enteredString,
      displayedList: filteredList,
    });
  }

  function applyFilter(theNameList, enteredString = stateObject.textEntered) {
    if (enteredString !== "") {
      if (searchGender === "all") {
        filteredList = theNameList.filter((element) =>
          element.name.toLowerCase().includes(enteredString.toLowerCase())
        );
      } else {
        filteredList = theNameList.filter(
          (element) =>
            element.gender === searchGender &&
            element.name.toLowerCase().includes(enteredString.toLowerCase())
        );
      }
    } else {
      // enteredString === ""
      filteredList =
        searchGender === "all"
          ? theNameList
          : theNameList.filter((element) => element.gender === searchGender);
    }
  }

  function handleClick(event) {
    //alert(event.target.id);

    let theName = event.target.id; // Child's name
    let newFavourites, newNameList, position;

    // Does the child exist on the Favourites list?
    position = stateObject.favourites.findIndex(
      (aName) => aName.name === theName
    );

    if (position >= 0) {
      // remove name from Favourites and place in namesList
      newFavourites = stateObject.favourites
        .slice(0, position)
        .concat(
          stateObject.favourites.slice(
            position + 1,
            stateObject.favourites.length
          )
        );
      newNameList = [...stateObject.nameList, stateObject.favourites[position]];
    } else {
      // remove name from namesList and place in Favourites
      position = stateObject.nameList.findIndex(
        (aName) => aName.name === theName
      );

      newNameList = stateObject.nameList
        .slice(0, position)
        .concat(
          stateObject.nameList.slice(position + 1, stateObject.nameList.length)
        );

      newFavourites = [
        ...stateObject.favourites,
        stateObject.nameList[position],
      ];
    }

    applyFilter(newNameList);

    // Update the State with the new lists
    setStateObject({
      ...stateObject,
      nameList: newNameList,
      favourites: newFavourites,
      displayedList: filteredList,
    });
  }

  function handleGenderButtonClick(event) {
    let theId = event.target.id;
    let genderChangeFlag = false;

    if (theId === "allbutton" && searchGender !== "all") {
      genderChangeFlag = true;
      searchGender = "all";
    } else if (theId === "malebutton" && searchGender !== "m") {
      genderChangeFlag = true;
      searchGender = "m";
    } else if (theId === "femalebutton" && searchGender !== "f") {
      genderChangeFlag = true;
      searchGender = "f";
    }

    if (genderChangeFlag) {
      applyFilter(stateObject.nameList);

      // update State
      setStateObject({
        ...stateObject,
        displayedList: filteredList,
        gender: searchGender,
      });
    }
  }

  let message =
    searchGender === "all"
      ? "All Names"
      : searchGender === "m"
      ? "All Male Names"
      : "All Female Names";
  return (
    <div className="App">
      <div className="flexdisplay">
        <button
          className="genderbutton rectangle"
          id="allbutton"
          onClick={handleGenderButtonClick}
        >
          All Names
        </button>
        <button
          className="genderbutton rectangle malename"
          id="malebutton"
          onClick={handleGenderButtonClick}
        ></button>
        <button
          className="genderbutton rectangle femalename"
          id="femalebutton"
          onClick={handleGenderButtonClick}
        ></button>
        <input
          className="searchbar"
          type="text"
          autoComplete="off"
          id="children-query"
          name="q"
          placeholder="Children Names Search"
          value={stateObject.textEntered}
          onChange={handleChange}
        />
      </div>
      <div></div>
      <h3 className="bluetext">{message}</h3>
      <br></br>
      <h2>Favourites:</h2>
      <br></br>
      <div className="aborder">
        <FetchChildren
          theChildren={[...stateObject.favourites]}
          handleClick={handleClick}
        />
      </div>
      <hr></hr>

      <FetchChildren
        //theChildren={stateObject.textEntered === "" ? sortedList : filteredList}
        theChildren={[...stateObject.displayedList]}
        handleClick={handleClick}
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
