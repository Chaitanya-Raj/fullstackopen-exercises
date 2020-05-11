import React from "react";
import Country from "./country";

const Countries = ({ buttonPressed, filtered, showCountry }) => {
  let list = filtered.map((filter) => (
    <Country key={filter.name} country={filter} />
  ));
  if (buttonPressed) return list;
  else {
    if (list.length > 10)
      return <p>Too many matches, specify another filter</p>;
    else if (list.length === 1) return list;
    else if (list.length <= 10)
      return filtered.map((filter) => (
        <li key={filter.name}>
          {filter.name}{" "}
          <button data={filter} onClick={showCountry}>
            Show
          </button>
        </li>
      ));
  }
};

export default Countries;
