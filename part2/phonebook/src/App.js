import React, { useState, useEffect } from "react";
import Filter from "./components/filter";
import PersonForm from "./components/personform";
import Persons from "./components/persons";
import contactService from "./services/contactService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    contactService.getAll().then((response) => {
      setPersons(response.data);
      setFilteredPersons(response.data);
    });
  }, []);

  const deleteContact = (id) => {
    if (
      window.confirm(
        `Delete ${persons.find((person) => person.id === id).name}?`
      )
    ) {
      contactService.deleteContact(id).then((response) => {
        let tempPersons = persons.filter((person) => person.id !== id);
        setPersons(tempPersons);
        setFilteredPersons(tempPersons);
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
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      let newContact = { name: newName, number: newNumber };
      contactService.createNew(newContact).then((response) => {
        setNewName("");
        setNewNumber("");
        let tempPersons = persons.concat(response.data);
        setPersons(tempPersons);
        setFilteredPersons(tempPersons);
      });
    }
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

      <Persons persons={filteredPersons} deleteContact={deleteContact} />
    </div>
  );
};

export default App;
