import React, { useContext } from 'react';
import { PlanetContext } from '../../contexts/PlanetContext';
import { OPTIONS } from '../../helpers';

function Order() {
  const { order, setOrder } = useContext(PlanetContext);

  const handleChange = ({ target }) => {
    setOrder({ ...order, [target.name]: target.value });
  };

  const renderOptions = () => {
    return Object.keys(OPTIONS).map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ));
  };

  return (
    <form>
      <label className="order__label">
        Ordernar por:
        <select onChange={handleChange} name="column" value={order.column}>
          {renderOptions()}
        </select>
      </label>
      <label htmlFor="ASC">
        ASC
        <input
          type="radio"
          name="type"
          value="ASC"
          checked={order.type === 'ASC'}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="DESC">
        DESC
        <input
          type="radio"
          name="type"
          value="DESC"
          checked={order.type === 'DESC'}
          onChange={handleChange}
        />
      </label>
    </form>
  );
}

export default Order;
