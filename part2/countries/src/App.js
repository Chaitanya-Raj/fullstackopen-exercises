import React, { useState, useEffect } from "react";
import Axios from "axios";
import Countries from "./components/countries";

const App = () => {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    Axios.get("https://restcountries.eu/rest/v2/all")
      .then((response) => setCountries(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setFiltered(
      countries.filter((country) =>
        country.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [countries, search]);

  return (
    <div>
      <p>
        find countries{" "}
        <input
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </p>
      <p>debug: {search}</p>
      <Countries filtered={filtered} />
    </div>
  );
};

export default App;
