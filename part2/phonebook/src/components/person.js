import React from "react";

const Person = ({ person, deleteContact }) => {
  return (
    <p>
      {person.name} {person.number}{" "}
      <button onClick={() => deleteContact(person.id)}>Delete</button>
    </p>
  );
};

export default Person;
