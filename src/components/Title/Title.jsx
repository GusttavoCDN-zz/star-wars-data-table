import React from 'react';
import './Title.css';

function Title() {
  return (
    <header>
      <h1 className="starwars-demo">
        <img
          src="//cssanimation.rocks/demo/starwars/images/star.svg"
          alt="Star"
          className="star"
        />
        <img
          src="//cssanimation.rocks/demo/starwars/images/wars.svg"
          alt="Wars"
          className="wars"
        />
        <span className='planets-database'>Planets Database</span>
      </h1>
    </header>
  );
}

export default Title;
