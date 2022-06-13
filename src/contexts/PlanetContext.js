import React, { createContext, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import { COMPARISONS } from '../helpers';

export const PlanetContext = createContext();

const INITIAL_ORDER = {
  column: 'name',
  type: 'ASC',
};
export function Planets({ children }) {
  const planets = useFetch();
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [numericFilter, setNumericFilter] = useState([]);
  const [order, setOrder] = useState(INITIAL_ORDER);

  const sortPLanets = useCallback(
    (unsortedPlanets) => {
      if (order.type === 'ASC' && order.column === 'name') {
        return unsortedPlanets.sort((a, b) => a.name.localeCompare(b.name));
      }
      if (order.type === 'DESC' && order.column === 'name') {
        return unsortedPlanets.sort((a, b) => b.name.localeCompare(a.name));
      }
      if (order.type === 'ASC') {
        return unsortedPlanets.sort(
          (a, b) => a[order.column] - b[order.column]
        );
      }
      if (order.type === 'DESC') {
        return unsortedPlanets.sort(
          (a, b) => b[order.column] - a[order.column]
        );
      }
    },
    [order.column, order.type]
  );

  useEffect(() => {
    const { planetsData } = planets;
    const planetsFilteredByName = planetsData.filter((planet) => {
      const name = planet.name.toLowerCase();
      return name.includes(nameFilter.toLowerCase());
    });

    const planetsFilteredByNumeric = numericFilter.reduce(
      (planets, { column, comparison, value }) =>
        planets.filter((planet) => {
          const planetValue = Number(planet[column]);
          switch (comparison) {
            case COMPARISONS.greaterThan:
              return planetValue > value;
            case COMPARISONS.lessThan:
              return planetValue < value;
            case COMPARISONS.equalTo:
              return planetValue === value;
            default:
              return true;
          }
        }),
      planetsFilteredByName
    );

    const planetsSorted = sortPLanets(planetsFilteredByNumeric);
    setFilteredPlanets(planetsSorted);
  }, [nameFilter, numericFilter, planets, sortPLanets]);

  const context = {
    planets,
    filteredPlanets,
    nameFilter,
    setNameFilter,
    numericFilter,
    setNumericFilter,
    order,
    setOrder,
  };

  return (
    <PlanetContext.Provider value={context}>{children}</PlanetContext.Provider>
  );
}

Planets.propTypes = {
  children: PropTypes.node.isRequired,
};
