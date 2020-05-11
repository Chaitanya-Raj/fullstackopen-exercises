import React from "react";
// import Country from "./country";

const Countries = ({ filtered }) => {
  let list = filtered.map((filter) => <li>{filter.name}</li>);
  if (list.length > 10) return <p>Too many matches, specify another filter</p>;
  else return list;
};

export default Countries;
