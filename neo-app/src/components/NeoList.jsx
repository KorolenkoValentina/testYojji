
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

  // Function to retrieve data from API
  const fetchData = async () => {
    try {
      const startDate = getCurrentStartDate();
      const endDate = getEndDate(startDate);
      const url = API_URL.replace('START_DATE', startDate);

      // Making a GET request to the API using the axios library
      const response = await axios.get(url);
      const data = response.data;

      const neoList = parseData(data, startDate, endDate);

      neoList.forEach((neo) => {
        addNeoToList(neo);
      });

      // Restart the data request after 5 seconds
      setTimeout(fetchData, 5000);
    } catch (error) {
      console.error('Error fetching NEO data:', error);
    }
  };

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

