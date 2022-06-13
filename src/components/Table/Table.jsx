import React, { useContext } from 'react';
import { PlanetContext } from '../../contexts/PlanetContext';
import './Table.css';

function Table() {
  const {
    planets: { loading, headers },
    filteredPlanets,
  } = useContext(PlanetContext);

  const renderPlanets = () => {
    return filteredPlanets.map((planet) => (
      <tr key={planet.name}>
        <td>{planet.name}</td>
        <td>{planet.rotation_period}</td>
        <td>{planet.orbital_period}</td>
        <td>{planet.diameter}</td>
        <td>{planet.climate}</td>
        <td>{planet.terrain}</td>
        <td>{planet.surface_water}</td>
        <td>{planet.population}</td>
      </tr>
    ));
  };

  const renderHeaders = () => {
    return headers.map((header) => <th key={header}>{header.replace('_', ' ')}</th>);
  };

  return (
    <div className='table_container'>
      {loading && <p>loading</p>}
      {!loading && (
        <table>
          <thead>
            <tr>{renderHeaders()}</tr>
          </thead>
          <tbody>{renderPlanets()}</tbody>
        </table>
      )}
    </div>
  );
}

export default Table;
