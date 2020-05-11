import React from "react";
import Person from "./person";

const Persons = ({ persons, deleteContact }) =>
  persons.map((person) => (
    <Person key={person.name} person={person} deleteContact={deleteContact} />
  ));

export default Persons;
