import React from "react";
import Person from "./person";

const Persons = ({ persons }) => {
  return persons.map((person) => <Person key={person.name} person={person} />);
};

export default Persons;
