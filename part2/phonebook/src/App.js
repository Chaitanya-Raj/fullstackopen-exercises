import React, { useState, useEffect } from "react";
import Filter from "./components/filter";
import PersonForm from "./components/personform";
import Persons from "./components/persons";
import personService from "./services/personService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const syncPersons = () => {
    personService.getAll().then((response) => {
      setPersons(response.data);
      setFilteredPersons(response.data);
    });
  };

  useEffect(() => {
    syncPersons();
  }, []);

  const deletePerson = (id) => {
    if (
      window.confirm(
        `Delete ${persons.find((person) => person.id === id).name}?`
      )
    ) {
      personService.deletePerson(id).then((response) => {
        syncPersons();
      });
    }
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
    setFilteredPersons(
      persons.filter((person) =>
        person.name.toLowerCase().startsWith(event.target.value.toLowerCase())
      )
    );
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let newPerson = { name: newName, number: newNumber };
    if (persons.some((person) => person.name === newName)) {
      let existingPerson = persons.find((person) => person.name === newName);
      if (
        window.confirm(
          `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService.updatePerson(existingPerson.id, newPerson).then(() => {
          syncPersons();
        });
      }
    } else {
      personService.createNew(newPerson).then(() => {
        syncPersons();
      });
    }
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilter={handleFilter} />

      <h3>add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />

      <h3>Numbers</h3>

      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
