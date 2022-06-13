import React from 'react';
import { Planets } from './contexts/PlanetContext';
import PlanetSearch from './PlanetSearch';
import Title from './components/Title/Title';
import './App.css';

function App() {
  return (
    <Planets>
      <Title />
      <PlanetSearch />
    </Planets>
  );
}

export default App;
