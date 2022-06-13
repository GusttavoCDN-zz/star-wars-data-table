import React from 'react';
import NameFilter from './components/filters/NameFilter';
import NumericFilter from './components/filters/NumericFilter';
import Order from './components/filters/Order';
import Table from './components/Table/Table';
import './components/filters/Filters.css';

function PlanetSearch() {
  return (
    <main>
      <Order />
      <NumericFilter />
      <NameFilter />
      <Table />
    </main> 
  );
}

export default PlanetSearch;
