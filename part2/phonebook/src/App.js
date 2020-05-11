import React, { useState, useEffect } from "react";
import Filter from "./components/filter";
import PersonForm from "./components/personform";
import Persons from "./components/persons";
import personService from "./services/personService";
import Notification from "./components/notification";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState({
    msg: null,
    className: null,
  });

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
        setNotification({
          msg: `Deleted ${
            persons.find((person) => person.id === id).name
          } from phonebook`,
          className: "error",
        });
        setTimeout(() => {
          setNotification({
            msg: null,
            className: null,
          });
        }, 5000);
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
          setNotification({
            msg: `Updated ${newPerson.name} in phonebook`,
            className: "notification",
          });
          setTimeout(() => {
            setNotification({
              msg: null,
              className: null,
            });
          }, 5000);
          syncPersons();
        });
      }
    } else {
      personService.createNew(newPerson).then(() => {
        setNotification({
          msg: `Added ${newPerson.name} to phonebook`,
          className: "notification",
        });
        setTimeout(() => {
          setNotification({
            msg: null,
            className: null,
          });
        }, 5000);
        syncPersons();
      });
    }
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <Notification
        message={notification.msg}
        className={notification.className}
      />
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
