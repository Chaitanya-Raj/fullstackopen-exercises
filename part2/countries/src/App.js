import React, { useState, useEffect } from "react";
import Axios from "axios";
import Countries from "./components/countries";

const App = () => {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [countries, setCountries] = useState([]);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [selected, setSelected] = useState([]);

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
    setButtonPressed(false);
  }, [countries, search]);

  const showCountry = (country) => {
    setButtonPressed(true);
    setSelected(country);
  };

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
      <Countries
        filtered={buttonPressed ? [selected] : filtered}
        showCountry={showCountry}
      />
    </div>
  );
};

export default App;
