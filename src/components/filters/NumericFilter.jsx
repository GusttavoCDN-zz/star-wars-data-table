import React, { useContext, useState } from 'react';
import { PlanetContext } from '../../contexts/PlanetContext';
import { COMPARISONS, OPTIONS } from '../../helpers';

const INITIAL_OPTIONS = [
  ...Object.keys(OPTIONS).filter((option) => option !== 'name'),
];
const INITIAL_COMPARISON = COMPARISONS.greaterThan;
const INITIAL_COLUMN = OPTIONS.rotation_period;

function NumericFilter() {
  const { numericFilter, setNumericFilter } = useContext(PlanetContext);
  const [column, setColumn] = useState(INITIAL_COLUMN);
  const [comparison, setComparison] = useState(INITIAL_COMPARISON);
  const [value, setValue] = useState(0);
  const [options, setOptions] = useState(INITIAL_OPTIONS);

  function addFilter() {
    const newFilter = { column, comparison, value: Number(value) };
    setNumericFilter((prevState) => [...prevState, newFilter]);
  }

  function resetForm() {
    const newOptions = options.filter((option) => option !== column);
    setOptions(newOptions);
    setColumn(newOptions[0]);
    setComparison(INITIAL_COMPARISON);
    setValue(0);
  }

  function handleFilter() {
    addFilter();
    resetForm();
  }

  function renderOptions() {
    return options.map((option) => (
      <option key={option} value={option}>
        {option.replace('_', ' ')}
      </option>
    ));
  }

  function deleteFilter(columnName) {
    const newFilters = numericFilter.filter(
      ({ column }) => column !== columnName
    );
    setNumericFilter([...newFilters]);
    setOptions((prevState) => [...prevState, columnName]);
  }

  function deleteAllFilters() {
    setNumericFilter([]);
    setOptions(INITIAL_OPTIONS);
  }

  function renderActiveFilters() {
    return numericFilter.map(({ column, comparison, value }) => (
      <div key={column} className="exclude-div">
        <span>{`${column.replace('_', ' ')} ${comparison} ${value}`}</span>
        <button
          type="button"
          onClick={() => deleteFilter(column)}
          className="exclude-button">
          X
        </button>
      </div>
    ));
  }

  return (
    <div>
      <form>
        <select
          onChange={(e) => setColumn(e.target.value)}
          name="column"
          value={column}>
          {renderOptions()}
        </select>
        <select
          onChange={(e) => setComparison(e.target.value)}
          name="comparison"
          value={comparison}>
          <option value={COMPARISONS.greaterThan}>greater than</option>
          <option value={COMPARISONS.lessThan}>less than</option>
          <option value={COMPARISONS.equalTo}>equal to</option>
        </select>
        <input
          placeholder="value"
          type="number"
          name="value"
          onChange={(e) => setValue(Number(e.target.value))}
          value={value}
        />
        <button type="button" onClick={handleFilter} className="button">
          Filter
        </button>
        <button type="button" onClick={deleteAllFilters} className="button">
          Remove Filters
        </button>
      </form>
      {renderActiveFilters()}
    </div>
  );
}

export default NumericFilter;
