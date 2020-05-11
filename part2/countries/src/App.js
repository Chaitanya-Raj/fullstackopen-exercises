import React, { useState, useEffect } from "react";
import Axios from "axios";
import Countries from "./components/countries";

const App = () => {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selected, setSelected] = useState({});
  const [buttonPressed, setButtonPressed] = useState(false);

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

  const showCountry = (event) => {
    console.log(event.target.getAttribute("data"));
    setSelected(event.target.getAttribute("data"));
    setButtonPressed(true);
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
      {true ? (
        <Countries
          buttonPressed={true}
          filtered={[selected]}
          showCountry={showCountry}
        />
      ) : (
        <Countries
          buttonPressed={false}
          filtered={filtered}
          showCountry={showCountry}
        />
      )}
    </div>
  );
};

export default App;
