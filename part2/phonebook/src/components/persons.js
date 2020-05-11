import React from "react";
import Person from "./person";

const Persons = ({ persons, deletePerson }) =>
  persons.map((person) => (
    <Person key={person.name} person={person} deletePerson={deletePerson} />
  ));

export default Persons;
