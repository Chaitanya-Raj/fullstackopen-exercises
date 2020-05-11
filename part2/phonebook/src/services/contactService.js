import Axios from "axios";

const baseURL = "http://localhost:3001/persons";

const getAll = () => {
  return Axios.get(baseURL);
};

const createNew = (newContact) => {
  return Axios.post(baseURL, newContact);
};

const deleteContact = (id) => {
  return Axios.delete(`${baseURL}/${id}`);
};

export default { getAll, createNew, deleteContact };
