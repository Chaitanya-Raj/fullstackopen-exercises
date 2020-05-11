import Axios from "axios";

const baseURL = "http://localhost:3001/persons";

const getAll = () => {
  return Axios.get(baseURL);
};

const createNew = (newPerson) => {
  return Axios.post(baseURL, newPerson);
};

const updatePerson = (id, newPerson) => {
  return Axios.put(`${baseURL}/${id}`, newPerson);
};

const deletePerson = (id) => {
  return Axios.delete(`${baseURL}/${id}`);
};

export default { getAll, createNew, updatePerson, deletePerson };
