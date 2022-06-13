import { useState, useEffect } from 'react';
import { EXLUDED_HEADERS } from '../helpers';

function useFetch() {
  const [planets, setPlanets] = useState({loading: true, planetsData: []});

  useEffect(() => {
    const getPlanets = async () => {
      const [api01, api02, api03, api04, api05] = await Promise.all([
        fetch("https://swapi-trybe.herokuapp.com/api/planets/"),
        fetch("https://swapi-trybe.herokuapp.com/api/planets/?page=2"),
        fetch("https://swapi-trybe.herokuapp.com/api/planets/?page=3"),
        fetch("https://swapi-trybe.herokuapp.com/api/planets/?page=4"),
        fetch("https://swapi-trybe.herokuapp.com/api/planets/?page=5"),
      ]);

      const [planet01, planet02, planet03, planet04, planet05] = await Promise
        .all([api01.json(), api02.json(), api03.json(), api04.json(), api05.json()]);
    
      const allPlanets = [
        ...planet01.results,
        ...planet02.results, 
        ...planet03.results,
        ...planet04.results,
        ...planet05.results,
      ]

      const headers = Object.keys(planet01.results[0]).filter((planet) => !EXLUDED_HEADERS.includes(planet));
      setPlanets({
        loading: false,
        planetsData: allPlanets,
        headers,
      });
    };
    getPlanets();
  }, []);

  return planets;
}

export default useFetch;