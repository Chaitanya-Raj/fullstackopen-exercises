import React from "react";

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital : {country.capital}</p>
      <p>Population : {country.population}</p>
      <h3>Languages</h3>
      {country.languages.map((language) => (
        <li>{language.name}</li>
      ))}
      <img src={country.flag} alt="Flag" width="100px" />
    </div>
  );
};

export default Country;
