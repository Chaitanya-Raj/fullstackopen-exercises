import Axios from "axios";

const baseURL = "http://localhost:3001/persons";

const getAll = () => {
  return Axios.get(baseURL);
};

const createNew = (newContact) => {
  return Axios.post(baseURL, newContact);
};

export default { getAll, createNew };
