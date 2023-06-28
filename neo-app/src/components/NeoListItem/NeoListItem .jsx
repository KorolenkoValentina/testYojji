import React from 'react';

const NeoListItem = ({ neo, index }) => {
  return (
    <li
      key={index}
      style={{
        backgroundColor: index < 2 ? 'red' : 'white',
      }}
    >
      <strong>Max Diameter:</strong> {neo.maxDiameter.kilometers} km
      <br />
      <strong>Hazardous Count:</strong> {neo.hazardousCount}
      <br />
      <strong>Closest:</strong> {neo.closest.kilometers} km
      <br />
      <strong>Fastest:</strong> {neo.fastest.kilometers_per_hour} km/h
    </li>
  );
};

export default NeoListItem;

