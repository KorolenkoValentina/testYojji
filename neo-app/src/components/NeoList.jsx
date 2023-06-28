
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NeoListItem from './NeoListItem ';

const API_KEY = '6sNjGOfATiWxAKPySg07YfFbxWfLaVlAZrKXbiox';
const API_URL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=START_DATE&api_key=${API_KEY}`;


const NeoList = () => {
  const [neos, setNeos] = useState([]);

  useEffect(() => {
    const interval = setInterval(fetchData, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  

  return (
    <div>
      <h1>Near-Earth Objects</h1>
      <ul>
        {neos.map((neo, index) => (
          <NeoListItem key={index} neo={neo} index={index} />
        ))}
      </ul>
    </div>
  );
};

export default NeoList;

